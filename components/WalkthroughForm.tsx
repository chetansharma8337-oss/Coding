"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { modules } from "@/lib/modules";
import { teamSizes, validateWalkthrough, type FieldErrors } from "@/lib/walkthrough";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent"; email: string } | { kind: "failed"; message: string };

const inputClass =
  "mt-2 block w-full rounded-[12px] border border-slate bg-bone px-4 py-3 text-[16px] text-ink placeholder:text-slate transition-colors hover:border-ink aria-invalid:border-2 aria-invalid:border-ink";

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-[14px] font-semibold">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-[14px] font-semibold text-ink">
          <span aria-hidden="true">! </span>
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-[13px] text-slate">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function WalkthroughForm() {
  const uid = useId();
  const params = useSearchParams();
  const [interests, setInterests] = useState<string[]>([]);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Module pages link here with ?interest=<slug> so the visitor's context carries over.
  useEffect(() => {
    const pre = params.get("interest");
    if (pre && modules.some((m) => m.slug === pre)) setInterests((cur) => (cur.includes(pre) ? cur : [...cur, pre]));
  }, [params]);

  useEffect(() => {
    if (status.kind === "sent" || status.kind === "failed") resultRef.current?.focus();
  }, [status.kind]);

  const id = (name: string) => `${uid}-${name}`;
  const describedBy = (name: keyof FieldErrors, hasHint = false) =>
    errors[name] ? `${id(name)}-error` : hasHint ? `${id(name)}-hint` : undefined;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      company: fd.get("company"),
      teamSize: fd.get("teamSize"),
      interests,
      notes: fd.get("notes"),
    };
    const { data, errors: found } = validateWalkthrough(payload);
    setErrors(found);
    if (!data) {
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/walkthrough", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (res.status === 422 && json.errors) {
        setErrors(json.errors);
        setStatus({ kind: "idle" });
        return;
      }
      if (!res.ok) throw new Error(json.error ?? "The server did not accept the request.");
      setStatus({ kind: "sent", email: data.email });
    } catch (err) {
      setStatus({
        kind: "failed",
        message: err instanceof Error && err.message !== "Failed to fetch" ? err.message : "We could not reach the server.",
      });
    }
  }

  if (status.kind === "sent") {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="rounded-[20px] bg-mist p-6 sm:p-8">
        <p className="heading-sm">Request received.</p>
        <p className="mt-3 text-[16px] leading-[1.55] text-graphite">
          We will reply to <span className="font-semibold text-ink">{status.email}</span> to agree a time. Bring a list of
          the tools you run today and we will show where each one fits.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus({ kind: "idle" });
            setInterests([]);
          }}
          className="pill pill-light mt-6"
        >
          Send another request
        </button>
      </div>
    );
  }

  const sending = status.kind === "sending";

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-busy={sending} className="space-y-5">
      {status.kind === "failed" ? (
        <div ref={resultRef} tabIndex={-1} role="alert" className="rounded-[12px] border-2 border-ink p-4">
          <p className="text-[15px] font-semibold">Your request was not sent.</p>
          <p className="mt-1 text-[14px] text-graphite">
            {status.message} Your answers are still here, so you can send it again.
          </p>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id("name")} label="Name" error={errors.name}>
          <input
            id={id("name")}
            name="name"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
            className={inputClass}
          />
        </Field>
        <Field id={id("email")} label="Work email" error={errors.email}>
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="name@company.com"
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            className={inputClass}
          />
        </Field>
        <Field id={id("company")} label="Company" error={errors.company}>
          <input
            id={id("company")}
            name="company"
            autoComplete="organization"
            placeholder="Company name"
            aria-invalid={!!errors.company}
            aria-describedby={describedBy("company")}
            className={inputClass}
          />
        </Field>
        <Field id={id("teamSize")} label="Security team size" error={errors.teamSize}>
          <select
            id={id("teamSize")}
            name="teamSize"
            defaultValue=""
            aria-invalid={!!errors.teamSize}
            aria-describedby={describedBy("teamSize")}
            className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 12 12%22><path d=%22M2.5 4.5L6 8l3.5-3.5%22 fill=%22none%22 stroke=%22%231f1f1f%22 stroke-width=%221.5%22/></svg>')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat pr-10`}
          >
            <option value="" disabled>
              Choose one
            </option>
            {teamSizes.map((s) => (
              <option key={s} value={s}>
                {s} people
              </option>
            ))}
          </select>
        </Field>
      </div>

      <fieldset aria-describedby={errors.interests ? `${id("interests")}-error` : `${id("interests")}-hint`}>
        <legend className="text-[14px] font-semibold">What should we focus on?</legend>
        <p id={`${id("interests")}-hint`} className="mt-1 text-[13px] text-slate">
          Optional. Pick any that apply.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {modules.map((m) => {
            const on = interests.includes(m.slug);
            return (
              <label
                key={m.slug}
                className={`inline-flex min-h-11 cursor-pointer select-none items-center rounded-full border px-4 text-[14px] font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink ${
                  on ? "border-ink bg-ink text-bone" : "border-slate bg-bone text-ink hover:border-ink"
                }`}
              >
                <input
                  type="checkbox"
                  name="interests"
                  value={m.slug}
                  checked={on}
                  onChange={() => setInterests((cur) => (on ? cur.filter((x) => x !== m.slug) : [...cur, m.slug]))}
                  className="sr-only"
                />
                {on ? <span aria-hidden="true" className="mr-1.5">✓</span> : null}
                {m.short}
              </label>
            );
          })}
        </div>
        {errors.interests ? (
          <p id={`${id("interests")}-error`} className="mt-1.5 text-[14px] font-semibold">
            {errors.interests}
          </p>
        ) : null}
      </fieldset>

      <Field id={id("notes")} label="Anything we should know" error={errors.notes} hint="Optional. Tools you run today, audits coming up, what is not working.">
        <textarea
          id={id("notes")}
          name="notes"
          rows={4}
          placeholder="Drop your notes here..."
          aria-invalid={!!errors.notes}
          aria-describedby={describedBy("notes", true)}
          className={`${inputClass} resize-y`}
        />
      </Field>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-slate">
          We use these details only to arrange the walkthrough. See the{" "}
          <a href="/privacy" className="font-semibold text-graphite underline underline-offset-2">
            privacy notice
          </a>
          .
        </p>
        <button type="submit" disabled={sending} className="pill pill-dark shrink-0 disabled:opacity-70">
          {sending ? "Sending request…" : "Request a walkthrough"}
        </button>
      </div>
    </form>
  );
}
