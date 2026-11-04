"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { modules } from "@/lib/modules";
import { fade, spring } from "@/lib/springs";
import { teamSizes, validateWalkthrough, type FieldErrors } from "@/lib/walkthrough";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent"; email: string } | { kind: "failed"; message: string };

const inputClass =
  "mt-2 block w-full rounded-xl border border-slate bg-bone px-3 py-3 body-3 text-ink placeholder:text-slate transition-colors hover:border-ink aria-invalid:border-2 aria-invalid:border-ink";

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
  const reduce = useReducedMotion();
  return (
    <div>
      <label htmlFor={id} className="body-4">
        {label}
      </label>
      {children}
      {error ? (
        <motion.p
          key={error}
          id={`${id}-error`}
          initial={{ opacity: 0, y: reduce ? 0 : -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? fade : spring.ui}
          className="mt-2 body-4 text-ink"
        >
          <span aria-hidden="true">! </span>
          {error}
        </motion.p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-2 caption-5 text-slate">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function fieldName(t: EventTarget) {
  return t instanceof HTMLInputElement || t instanceof HTMLSelectElement || t instanceof HTMLTextAreaElement ? t.name : "";
}

export function WalkthroughForm() {
  const uid = useId();
  const params = useSearchParams();
  const [interests, setInterests] = useState<string[]>([]);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const touched = useRef(new Set<string>());
  const reduce = useReducedMotion();
  // The confirmation mounts after the form has left, so it takes focus itself when it arrives.
  const focusOnMount = useCallback((el: HTMLDivElement | null) => el?.focus(), []);

  // Module pages link here with ?interest=<slug> so the visitor's context carries over.
  useEffect(() => {
    const pre = params.get("interest");
    if (pre && modules.some((m) => m.slug === pre)) setInterests((cur) => (cur.includes(pre) ? cur : [...cur, pre]));
  }, [params]);

  useEffect(() => {
    if (status.kind === "failed") resultRef.current?.focus();
  }, [status.kind]);

  // Inline validation: a field is checked when the visitor leaves it, not on submit. While they type,
  // an error can only clear, never appear, so nobody is scolded mid-word.
  function readForm() {
    const fd = new FormData(formRef.current!);
    return {
      name: fd.get("name"),
      email: fd.get("email"),
      company: fd.get("company"),
      teamSize: fd.get("teamSize"),
      interests,
      notes: fd.get("notes"),
    };
  }
  function recheck(field: string, mode: "leave" | "type") {
    if (!formRef.current || !(field in readForm())) return;
    const key = field as keyof FieldErrors;
    const found = validateWalkthrough(readForm()).errors[key];
    setErrors((cur) => {
      if (mode === "type" && !cur[key]) return cur;
      if (cur[key] === found) return cur;
      const next = { ...cur };
      if (found && mode === "leave") next[key] = found;
      else if (!found) delete next[key];
      return next;
    });
  }

  const id = (name: string) => `${uid}-${name}`;
  const describedBy = (name: keyof FieldErrors, hasHint = false) =>
    errors[name] ? `${id(name)}-error` : hasHint ? `${id(name)}-hint` : undefined;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { data, errors: found } = validateWalkthrough(readForm());
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
      if (!res.ok) throw new Error(json.error ?? "The request was rejected by the server.");
      setStatus({ kind: "sent", email: data.email });
    } catch (err) {
      setStatus({
        kind: "failed",
        message: err instanceof Error && err.message !== "Failed to fetch" ? err.message : "The server could not be reached.",
      });
    }
  }

  const sending = status.kind === "sending";

  // Form and confirmation trade places: the form settles back and fades, the confirmation rises into its spot.
  const swap = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: fade }
    : {
        initial: { opacity: 0, y: 16, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -8, scale: 0.98 },
        transition: spring.ui,
      };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status.kind === "sent" ? (
        <motion.div key="sent" {...swap} ref={focusOnMount} tabIndex={-1} role="status" className="rounded-2xl bg-mist p-6 sm:p-8">
          <p className="heading-5">Walkthrough Request Submitted</p>
          <p className="mt-3 body-3 text-graphite">
            A member of the ASH-V team will contact <span className="font-semibold text-ink">{status.email}</span> to schedule
            the session. A list of current security tools will allow each one to be mapped to ASH-V modules.
          </p>
          <button
            type="button"
            onClick={() => {
              setStatus({ kind: "idle" });
              setInterests([]);
              setErrors({});
              touched.current.clear();
            }}
            className="btn btn-outline mt-6"
          >
            Submit Another Request
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          {...swap}
          ref={formRef}
          noValidate
          onSubmit={onSubmit}
          onBlur={(e) => {
            const name = fieldName(e.target);
            if (!name || name === "interests") return;
            touched.current.add(name);
            recheck(name, "leave");
          }}
          onChange={(e) => {
            const name = fieldName(e.target);
            if (!name || name === "interests") return;
            // A choice from a list is complete the moment it is made, so it is checked straight away.
            if (name === "teamSize") {
              touched.current.add(name);
              recheck(name, "leave");
            } else if (touched.current.has(name)) recheck(name, "type");
          }}
          aria-busy={sending}
          className="space-y-6"
        >
          {status.kind === "failed" ? (
            <div ref={resultRef} tabIndex={-1} role="alert" className="rounded-xl border-2 border-ink p-4">
              <p className="body-4">Request Not Submitted</p>
              <p className="mt-1 body-6 text-graphite">
                {status.message} Your entries have been retained. Submit the request again.
              </p>
            </div>
          ) : null}
    
          <div className="grid gap-6 sm:grid-cols-2">
            <Field id={id("name")} label="Full Name" error={errors.name}>
              <input
                id={id("name")}
                name="name"
                autoComplete="name"
                placeholder="Full name"
                aria-invalid={!!errors.name}
                aria-describedby={describedBy("name")}
                className={inputClass}
              />
            </Field>
            <Field id={id("email")} label="Work Email" error={errors.email}>
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
            <Field id={id("company")} label="Organization" error={errors.company}>
              <input
                id={id("company")}
                name="company"
                autoComplete="organization"
                placeholder="Organization name"
                aria-invalid={!!errors.company}
                aria-describedby={describedBy("company")}
                className={inputClass}
              />
            </Field>
            <Field id={id("teamSize")} label="Security Team Size" error={errors.teamSize}>
              <select
                id={id("teamSize")}
                name="teamSize"
                defaultValue=""
                aria-invalid={!!errors.teamSize}
                aria-describedby={describedBy("teamSize")}
                className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 12 12%22><path d=%22M2.5 4.5L6 8l3.5-3.5%22 fill=%22none%22 stroke=%22%231f1f1f%22 stroke-width=%221.5%22/></svg>')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat pr-10`}
              >
                <option value="" disabled>
                  Select team size
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
            <legend className="body-4">Modules of Interest</legend>
            <p id={`${id("interests")}-hint`} className="mt-1 caption-5 text-slate">
              Optional. Select all that apply.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {modules.map((m) => {
                const on = interests.includes(m.slug);
                return (
                  <label
                    key={m.slug}
                    className={`press inline-flex min-h-11 cursor-pointer select-none items-center rounded-full border px-4 body-4 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink ${
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
                    <AnimatePresence initial={false}>
                      {on ? (
                        <motion.span
                          aria-hidden="true"
                          className="inline-block overflow-hidden whitespace-nowrap"
                          initial={reduce ? { opacity: 0 } : { width: 0, opacity: 0, scale: 0.4 }}
                          animate={reduce ? { opacity: 1 } : { width: "auto", opacity: 1, scale: 1 }}
                          exit={reduce ? { opacity: 0 } : { width: 0, opacity: 0, scale: 0.4 }}
                          transition={reduce ? fade : spring.ui}
                        >
                          <Check weight="bold" className="mr-1 inline size-3.5" />
                        </motion.span>
                      ) : null}
                    </AnimatePresence>
                    {m.short}
                  </label>
                );
              })}
            </div>
            {errors.interests ? (
              <p id={`${id("interests")}-error`} className="mt-2 body-4">
                {errors.interests}
              </p>
            ) : null}
          </fieldset>
    
          <Field id={id("notes")} label="Additional Context" error={errors.notes} hint="Optional. Current tooling, upcoming audits or specific requirements.">
            <textarea
              id={id("notes")}
              name="notes"
              rows={4}
              placeholder="For example: current vulnerability scanner, ITSM platform and the next ISO/IEC 27001 audit date"
              aria-invalid={!!errors.notes}
              aria-describedby={describedBy("notes", true)}
              className={`${inputClass} resize-y`}
            />
          </Field>
    
          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
            <p className="caption-5 text-slate">
              These details are used only to schedule the walkthrough. See the{" "}
              <a href="/privacy" className="font-semibold text-graphite underline underline-offset-2">
                Privacy Notice
              </a>
              .
            </p>
            <button type="submit" disabled={sending} className="btn btn-dark shrink-0 disabled:opacity-70">
              {sending ? "Submitting…" : "Submit Request"}
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
