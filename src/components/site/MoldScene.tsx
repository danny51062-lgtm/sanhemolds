import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface SceneProps {
  scrollProgress: number;
  onFirstInteract: () => void;
}

const steel = { color: "#c9ccd1", metalness: 1, roughness: 0.28 } as const;
const steelDark = { color: "#8a8f96", metalness: 1, roughness: 0.45 } as const;

/** Ref-driven animation state — no React re-renders per frame. */
type AnimState = {
  open: number; // 0 closed → 1 open
  part: number; // 0 hidden → 1 visible
  zoom: number; // 0 far → 1 close
  phase: "intro" | "interactive";
  lastInteract: number;
  idleActive: boolean;
  startedAt: number;
};

function Mold({
  state,
  scrollProgressRef,
}: {
  state: React.MutableRefObject<AnimState>;
  scrollProgressRef: React.MutableRefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const top = useRef<THREE.Group>(null);
  const bottom = useRef<THREE.Group>(null);
  const part = useRef<THREE.Mesh>(null);
  const yFloat = useRef(0);

  useFrame((_, delta) => {
    const s = state.current;

    // Intro timeline
    if (s.phase === "intro") {
      const t = (performance.now() - s.startedAt) / 1000;
      if (t < 1.5) {
        s.open = 0.7; s.part = 0; s.zoom = 0;
      } else if (t < 3.5) {
        const k = (t - 1.5) / 2;
        s.open = 0.7 * (1 - k); s.zoom = k;
      } else if (t < 4.5) {
        s.open = 0; s.part = Math.min(1, (t - 3.5) / 0.5); s.zoom = 1;
      } else if (t < 6) {
        const k = (t - 4.5) / 1.5;
        s.open = 0.7 * k; s.part = Math.max(0, 1 - k * 1.2); s.zoom = 1;
      } else if (t < 7) {
        const k = (t - 6) / 1;
        s.open = 0.7; s.part = 0; s.zoom = 1 - k;
      } else {
        s.phase = "interactive";
        s.idleActive = true;
      }
    } else {
      // Interactive: re-engage idle after 3s of inactivity
      if (!s.idleActive && performance.now() - s.lastInteract > 3000) {
        s.idleActive = true;
      }
    }

    if (group.current) {
      if (s.idleActive && s.phase === "interactive") {
        group.current.rotation.y += delta * 0.15;
        yFloat.current += delta;
        group.current.position.y = Math.sin(yFloat.current * 0.8) * 0.05;
      }
      group.current.rotation.x = THREE.MathUtils.degToRad(scrollProgressRef.current * 15);
    }
    if (top.current) top.current.position.y = 0.45 + s.open * 0.85;
    if (bottom.current) bottom.current.position.y = -0.45 - s.open * 0.15;
    if (part.current) part.current.scale.setScalar(s.part);
  });

  return (
    <group ref={group}>
      {/* Base plate */}
      <mesh position={[0, -1.15, 0]} receiveShadow>
        <boxGeometry args={[3.6, 0.15, 2.6]} />
        <meshStandardMaterial {...steelDark} />
      </mesh>

      {/* Bottom half */}
      <group ref={bottom}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3, 0.7, 2]} />
          <meshStandardMaterial {...steel} />
        </mesh>
        <mesh position={[0, 0.36, 0]}>
          <boxGeometry args={[1.9, 0.08, 1.1]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.6} />
        </mesh>
        {([[-1.3,0.8],[1.3,0.8],[-1.3,-0.8],[1.3,-0.8]] as const).map(([x,z],i)=>(
          <mesh key={i} position={[x, 0.55, z]}>
            <cylinderGeometry args={[0.08, 0.08, 0.9, 16]} />
            <meshStandardMaterial color="#e6e8ec" metalness={1} roughness={0.15} />
          </mesh>
        ))}
      </group>

      {/* Molded part */}
      <mesh ref={part} position={[0, -0.05, 0]} scale={0}>
        <boxGeometry args={[1.85, 0.14, 1.05]} />
        <meshStandardMaterial
          color="#d40017"
          metalness={0.2}
          roughness={0.35}
          emissive="#3a0006"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Top half */}
      <group ref={top}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3, 0.7, 2]} />
          <meshStandardMaterial {...steel} />
        </mesh>
        <mesh position={[0, -0.36, 0]}>
          <boxGeometry args={[1.9, 0.08, 1.1]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.18, 0.22, 0.35, 24]} />
          <meshStandardMaterial color="#e6e8ec" metalness={1} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

function CameraRig({ state }: { state: React.MutableRefObject<AnimState> }) {
  const { camera } = useThree();
  useFrame(() => {
    const targetZ = THREE.MathUtils.lerp(6.5, 4.8, state.current.zoom);
    camera.position.z += (targetZ - camera.position.z) * 0.08;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export function MoldScene({ scrollProgress, onFirstInteract }: SceneProps) {
  const state = useRef<AnimState>({
    open: 0.7, part: 0, zoom: 0,
    phase: "intro", lastInteract: 0, idleActive: false,
    startedAt: performance.now(),
  });
  const scrollRef = useRef(scrollProgress);
  const [controlsEnabled, setControlsEnabled] = useState(false);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  // Enable controls when intro completes
  useEffect(() => {
    const id = setInterval(() => {
      if (state.current.phase === "interactive") {
        setControlsEnabled(true);
        clearInterval(id);
      }
    }, 250);
    return () => clearInterval(id);
  }, []);

  const handleStart = () => {
    state.current.lastInteract = performance.now();
    state.current.idleActive = false;
    onFirstInteract();
  };
  const handleEnd = () => {
    state.current.lastInteract = performance.now();
  };

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.6, 6.5], fov: 38 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#0a0a0a"]} />
      <fog attach="fog" args={["#0a0a0a", 8, 18]} />

      <Suspense fallback={null}>
        <ambientLight intensity={0.55} />
        <hemisphereLight args={["#ffffff", "#0a0a0a", 0.35]} />
        <directionalLight position={[5, 6, 4]} intensity={1.4} />
        <directionalLight position={[-5, 3, -2]} intensity={0.6} color="#d40017" />
        <directionalLight position={[0, 4, -6]} intensity={0.4} color="#8fb3ff" />

        <Mold state={state} scrollProgressRef={scrollRef} />

        <ContactShadows
          position={[0, -1.28, 0]}
          opacity={0.55}
          scale={9}
          blur={2.4}
          far={4}
        />
        <CameraRig state={state} />
      </Suspense>

      <OrbitControls
        enabled={controlsEnabled}
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
