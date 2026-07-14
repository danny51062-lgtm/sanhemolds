import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  type OrbitControlsProps,
} from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

type Phase = "intro" | "interactive";

interface SceneProps {
  scrollProgress: number;
  onFirstInteract: () => void;
}

/** Two-half injection mold made from primitive geometry, brushed steel look. */
function Mold({
  openAmount,
  showPart,
  scrollRot,
  idleActive,
}: {
  openAmount: number; // 0 closed → 1 open
  showPart: number; // 0 hidden → 1 visible
  scrollRot: number;
  idleActive: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const yFloat = useRef(0);

  useFrame((state, delta) => {
    if (!group.current) return;
    // subtle idle spin + float only when idle animation is allowed
    if (idleActive) {
      group.current.rotation.y += delta * 0.12;
      yFloat.current += delta;
      group.current.position.y = Math.sin(yFloat.current * 0.8) * 0.05;
    }
    // apply scroll-driven rotation offset on top
    group.current.rotation.x = THREE.MathUtils.degToRad(scrollRot * 15);
  });

  const steel = {
    color: "#c9ccd1",
    metalness: 1,
    roughness: 0.28,
  } as const;

  const steelDark = {
    color: "#8a8f96",
    metalness: 1,
    roughness: 0.45,
  } as const;

  const open = openAmount * 0.9; // world units

  return (
    <group ref={group}>
      {/* Base plate */}
      <mesh position={[0, -1.15, 0]} receiveShadow castShadow>
        <boxGeometry args={[3.6, 0.15, 2.6]} />
        <meshStandardMaterial {...steelDark} />
      </mesh>

      {/* Bottom mold half */}
      <group position={[0, -0.45 - open * 0.15, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3, 0.7, 2]} />
          <meshStandardMaterial {...steel} />
        </mesh>
        {/* Cavity (negative-ish look via inset dark box) */}
        <mesh position={[0, 0.36, 0]}>
          <boxGeometry args={[1.9, 0.08, 1.1]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.6} />
        </mesh>
        {/* Guide pins */}
        {[
          [-1.3, 0, 0.8],
          [1.3, 0, 0.8],
          [-1.3, 0, -0.8],
          [1.3, 0, -0.8],
        ].map(([x, y, z], i) => (
          <mesh key={i} position={[x, 0.55, z]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.9, 24]} />
            <meshStandardMaterial color="#e6e8ec" metalness={1} roughness={0.15} />
          </mesh>
        ))}
      </group>

      {/* Molded part (appears when closed) */}
      <mesh position={[0, -0.05, 0]} scale={showPart} castShadow>
        <boxGeometry args={[1.85, 0.14, 1.05]} />
        <meshStandardMaterial
          color="#d40017"
          metalness={0.2}
          roughness={0.35}
          emissive="#3a0006"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Top mold half */}
      <group position={[0, 0.45 + open * 0.85, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3, 0.7, 2]} />
          <meshStandardMaterial {...steel} />
        </mesh>
        <mesh position={[0, -0.36, 0]}>
          <boxGeometry args={[1.9, 0.08, 1.1]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.6} />
        </mesh>
        {/* Sprue bushing */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.22, 0.35, 32]} />
          <meshStandardMaterial color="#e6e8ec" metalness={1} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

function CameraRig({ zoom }: { zoom: number }) {
  const { camera } = useThree();
  useFrame(() => {
    // Interpolate camera z between 6.5 (far) and 4.8 (close)
    const targetZ = THREE.MathUtils.lerp(6.5, 4.8, zoom);
    camera.position.z += (targetZ - camera.position.z) * 0.08;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export function MoldScene({ scrollProgress, onFirstInteract }: SceneProps) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [openAmount, setOpenAmount] = useState(0.7);
  const [showPart, setShowPart] = useState(0);
  const [zoom, setZoom] = useState(0);
  const [idleActive, setIdleActive] = useState(false);
  const lastInteract = useRef<number>(0);
  const controlsRef = useRef<OrbitControlsProps & { reset?: () => void }>(null);

  // Intro cinematic timeline
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = () => {
      const t = (performance.now() - start) / 1000;
      // 0-1.5: hold slightly open
      // 1.5-3.5: camera in + close
      // 3.5-4.5: reveal part
      // 4.5-6: open + hide part
      // 6-7: camera back
      if (t < 1.5) {
        setOpenAmount(0.7);
        setShowPart(0);
        setZoom(0);
      } else if (t < 3.5) {
        const k = (t - 1.5) / 2;
        setOpenAmount(0.7 * (1 - k));
        setZoom(k);
      } else if (t < 4.5) {
        setOpenAmount(0);
        setShowPart(Math.min(1, (t - 3.5) / 0.5));
        setZoom(1);
      } else if (t < 6) {
        const k = (t - 4.5) / 1.5;
        setOpenAmount(0.7 * k);
        setShowPart(Math.max(0, 1 - k * 1.2));
        setZoom(1);
      } else if (t < 7) {
        const k = (t - 6) / 1;
        setOpenAmount(0.7);
        setShowPart(0);
        setZoom(1 - k);
      } else {
        setPhase("interactive");
        setIdleActive(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Idle re-engagement timer
  useEffect(() => {
    if (phase !== "interactive") return;
    const id = setInterval(() => {
      if (performance.now() - lastInteract.current > 3000) {
        setIdleActive(true);
      }
    }, 500);
    return () => clearInterval(id);
  }, [phase]);

  const handleStart = () => {
    lastInteract.current = performance.now();
    setIdleActive(false);
    onFirstInteract();
  };
  const handleEnd = () => {
    lastInteract.current = performance.now();
  };

  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.6, 6.5], fov: 38 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#0a0a0a"]} />
      <fog attach="fog" args={["#0a0a0a", 8, 18]} />

      <Suspense fallback={null}>
        <Environment preset="studio" environmentIntensity={0.6} />
        <ambientLight intensity={0.15} />
        <directionalLight
          position={[5, 6, 4]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0002}
        />
        <directionalLight position={[-4, 3, -2]} intensity={0.4} color="#d40017" />

        <Mold
          openAmount={openAmount}
          showPart={showPart}
          scrollRot={scrollProgress}
          idleActive={idleActive && phase === "interactive"}
        />

        <ContactShadows
          position={[0, -1.28, 0]}
          opacity={0.55}
          scale={9}
          blur={2.4}
          far={4}
        />
        <CameraRig zoom={zoom} />
      </Suspense>

      <OrbitControls
        ref={controlsRef as never}
        enabled={phase === "interactive"}
        enablePan={false}
        enableZoom
        minDistance={4.2}
        maxDistance={7.5}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 1.8}
        rotateSpeed={0.7}
        zoomSpeed={0.5}
        onStart={handleStart}
        onEnd={handleEnd}
      />
    </Canvas>
  );
}

export default MoldScene;
