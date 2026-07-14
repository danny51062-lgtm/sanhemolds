import { useId, useState, type FormEvent } from "react";
import { Reveal, SectionHeader } from "./Reveal";
import { Mail, Phone, MessageCircle, ArrowRight, CheckCircle2 } from "lucide-react";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 700);
  }

  return (
    <section id="contact" className="relative py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ background: "radial-gradient(900px circle at 50% 30%, rgba(212,0,23,0.1), transparent 60%)" }}
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Contact"
          title={<>Let's Build Something <span className="text-metallic">Extraordinary Together</span></>}
          description="Whether you need custom molds or large-scale manufacturing solutions, we're ready to help bring your ideas to life."
        />

        <div className="mt-20 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <form
              onSubmit={onSubmit}
              className="glass-strong relative overflow-hidden rounded-3xl p-8 sm:p-10"
            >
              {sent && (
                <div className="absolute inset-0 z-10 grid place-items-center bg-background/80 backdrop-blur-sm">
                  <div className="text-center">
                    <CheckCircle2 size={40} className="mx-auto text-primary" />
                    <h3 className="mt-4 font-display text-2xl font-semibold text-foreground">Message received</h3>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                      Thank you. Our engineering team will get back to you within one business day.
                    </p>
                  </div>
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name" name="name" required />
                <Field label="Company Name" name="company" />
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone Number" name="phone" type="tel" />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-details"
                  className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Project Details
                </label>
                <textarea
                  id="contact-details"
                  name="details"
                  rows={5}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Tell us about your part, expected volumes, material and timeline…"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-medium text-primary-foreground shadow-[0_0_40px_-8px_rgba(212,0,23,0.7)] transition-all hover:shadow-[0_0_60px_-4px_rgba(212,0,23,0.9)] disabled:opacity-60"
              >
                {loading ? "Sending…" : "Request a Quote"}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col gap-5">
              <ContactCard
                icon={Mail}
                label="Email"
                value="wenzhousanhemolds@gmail.com"
                href="mailto:wenzhousanhemolds@gmail.com"
              />
              <ContactCard
                icon={Phone}
                label="Phone"
                value="+86 136 2577 4243"
                href="tel:+8613625774243"
              />
              <ContactCard
                icon={MessageCircle}
                label="WeChat"
                value="wxid_2la3g5ov9c8b22"
              />

              <div className="glass mt-auto rounded-2xl p-6">
                <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Hours</div>
                <div className="mt-2 font-display text-lg text-foreground">Mon – Sat · 8:30 – 18:00 CST</div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Wenzhou, Zhejiang, China · Serving clients across 30+ countries.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  const id = useId();
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
      >
        {label}
        {required && <span className="text-primary">*</span>}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        required={required}
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
    </div>
  );
}

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}) {
  const Wrap = (href ? "a" : "div") as "a";
  return (
    <Wrap
      href={href}
      className="glass group flex items-center gap-5 rounded-2xl p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40"
    >
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-white/[0.12] to-transparent ring-1 ring-white/10">
        <Icon size={20} strokeWidth={1.5} className="text-silver transition-colors group-hover:text-primary" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</div>
        <div className="mt-1 truncate font-display text-base text-foreground">{value}</div>
      </div>
    </Wrap>
  );
}
