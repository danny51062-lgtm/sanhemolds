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
    <section id="contact" className="section-light relative py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Contact"
          title={<>Let's build something <span className="text-accent">extraordinary together</span>.</>}
          description="Whether you need custom molds or large-scale manufacturing solutions, our engineering team is ready to help."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <form
              onSubmit={onSubmit}
              className="relative overflow-hidden rounded-2xl border border-border bg-white p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_50px_-30px_rgba(15,23,42,0.2)] sm:p-10"
            >
              {sent && (
                <div className="absolute inset-0 z-10 grid place-items-center bg-white/95 backdrop-blur-sm">
                  <div className="text-center">
                    <CheckCircle2 size={44} className="mx-auto text-primary" />
                    <h3 className="mt-4 font-display text-2xl font-semibold text-navy">Message received</h3>
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
                  className="mb-2 block text-[11px] font-medium uppercase tracking-[0.2em] text-steel"
                >
                  Project Details
                </label>
                <textarea
                  id="contact-details"
                  name="details"
                  rows={5}
                  required
                  className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-navy placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Tell us about your part, expected volumes, material and timeline…"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
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

              <div className="mt-auto rounded-2xl border border-border bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Hours</div>
                <div className="mt-2 font-display text-lg text-navy">Mon – Sat · 8:30 – 18:00 CST</div>
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
        className="mb-2 block text-[11px] font-medium uppercase tracking-[0.2em] text-steel"
      >
        {label}
        {required && <span className="text-primary">*</span>}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        required={required}
        className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-navy placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
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
      className="group flex items-center gap-5 rounded-2xl border border-border bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_30px_-15px_rgba(15,23,42,0.2)]"
    >
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-surface text-steel ring-1 ring-border transition-colors group-hover:bg-primary/5 group-hover:text-primary">
        <Icon size={20} strokeWidth={1.75} />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</div>
        <div className="mt-1 truncate font-display text-base text-navy">{value}</div>
      </div>
    </Wrap>
  );
}
