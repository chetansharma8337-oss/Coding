import { ArrowUpRight, ArrowsCounterClockwise, CalendarX, Copy, HardDrives, Package, Seal, UserCircle } from "@phosphor-icons/react/dist/ssr";
import { InkParagraph } from "@/components/InkParagraph";
import { RiseOnView } from "@/components/RiseOnView";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { WordReveal } from "@/components/WordReveal";
import { moduleBySlug } from "@/lib/modules";
import { ModuleHero } from "../ModuleHero";
import { ModuleRelations } from "../ModuleRelations";
import { RingTrack } from "../patch/RingTrack";
import { RoutingCard } from "../patch/RoutingCard";

const mod = moduleBySlug("vulnerability-patch-management")!;

const handoffs = [
  { stage: "Assignment", usually: "A list of CVEs is sent to IT, and identifying the owner of each host requires manual investigation.", ashv: "The asset owner is taken from the asset record, so each finding is assigned on arrival." },
  { stage: "Deployment", usually: "Patches are deployed to all systems at once, and a failure in a business application halts patching.", ashv: "Deployment starts with a pilot ring, and a failed health check pauses the next ring automatically." },
  { stage: "Closure", usually: "Remediation tasks are closed when marked complete, and the next scan reports the same vulnerability.", ashv: "A finding is closed only after a verification scan or agent check confirms the fix." },
];

const policy = [
  { when: "CISA KEV, internet-facing asset", due: "7 days" },
  { when: "CISA KEV", due: "14 days" },
  { when: "Critical severity, high-criticality asset", due: "30 days" },
  { when: "All other findings", due: "90 days" },
];

const stillVulnerable = [
  { icon: ArrowsCounterClockwise, title: "Pending Restart", body: "The update is installed, but the vulnerable code remains loaded until the system restarts." },
  { icon: Copy, title: "Duplicate Library Version", body: "Another application bundles an earlier version of the patched library." },
  { icon: HardDrives, title: "Outdated System Image", body: "The server was rebuilt from an image that predates the patch." },
  { icon: Package, title: "Incorrect Package Edition", body: "The update applies to a different edition of the product than the one installed." },
];

const faq = [
  {
    q: "What happens when a patch causes a failure?",
    a: "Deployment begins with a pilot ring. When a health check fails, the next ring is paused automatically and the asset owner is notified; the due date continues to count down.",
  },
  {
    q: "When is a finding closed?",
    a: "Only after a verification scan or agent check confirms the fix. A successful installation is recorded but does not close the finding.",
  },
  {
    q: "How is the due date determined?",
    a: "By the remediation policy, based on CISA KEV listing, reachability and the asset criticality of the affected asset.",
  },
  {
    q: "Can a patch be deferred?",
    a: "Yes, through a risk exception with an approver, a justification, any compensating control and an expiry date. The finding is reopened when the exception expires.",
  },
  {
    q: "Are maintenance windows supported?",
    a: "Deployment rings are scheduled within the maintenance windows defined for each asset group.",
  },
  {
    q: "How are remediation activities presented to auditors?",
    a: "Each verified closure, with its dates and the confirming verification scan, is attached to the vulnerability management control in GRC. Risk exceptions are attached with their approver and expiry date.",
  },
];

export function VulnPatchPage() {
  return (
    <>
      <ModuleHero
        mod={mod}
        lines={["Remediation with", "Verified Closure"]}
        intro="Vulnerability & Patch Management assigns each finding to the asset owner with a due date, deploys patches in rings with health checks, and closes a finding only after a verification scan confirms the fix."
        visual={<RoutingCard />}
        secondary={{ href: "#rings", label: "View Deployment Workflow" }}
      />

      <section className="py-20 sm:py-24">
        <div className="page-x">
          <SectionIntro eyebrow="Challenge" heading="Common Remediation Failure Points" />
          <RiseOnView className="mt-12 overflow-x-auto rounded-3xl border border-ash-grey">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <caption className="sr-only">Remediation failure points compared with the ASH-V approach</caption>
              <thead className="bg-mist">
                <tr className="caption-3 text-slate">
                  <th scope="col" className="w-[20%] p-4 font-semibold sm:px-6">Stage</th>
                  <th scope="col" className="w-[40%] p-4 font-semibold">Common Practice</th>
                  <th scope="col" className="w-[40%] bg-ink p-4 font-semibold text-bone sm:px-6">ASH-V</th>
                </tr>
              </thead>
              <tbody>
                {handoffs.map((h) => (
                  <tr key={h.stage} className="border-t border-ash-grey align-top">
                    <th scope="row" className="body-4 p-4 sm:px-6">{h.stage}</th>
                    <td className="body-6 p-4 text-graphite">{h.usually}</td>
                    <td className="body-5 bg-ink/[0.03] p-4 sm:px-6">{h.ashv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </RiseOnView>
        </div>
      </section>

      <section className="border-t border-ash-grey py-20 sm:py-24">
        <div className="page-x grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionIntro
              eyebrow="Assignment"
              heading="Asset Owner and Due Date Assignment"
              lead="The asset owner is taken from the asset record. The due date is set by the remediation policy based on known exploitation, reachability and asset criticality."
            />
            <p className="body-6 mt-6 flex items-center gap-2 text-graphite">
              <UserCircle weight="light" className="size-5" aria-hidden="true" />
              Findings on assets without an asset owner are routed to a triage queue.
            </p>
          </div>
          <RiseOnView delay={0.1} className="rounded-3xl bg-mist p-6 sm:p-8 lg:col-span-7">
            <p className="caption-3 text-slate">Remediation Policy (Example)</p>
            <ul className="mt-6 space-y-2">
              {policy.map((p, i) => (
                <RiseOnView as="li" key={p.when} delay={0.15 + i * 0.08} className="flex items-center justify-between gap-4 rounded-2xl bg-bone p-4">
                  <span className="body-5">{p.when}</span>
                  <span className={`caption-6 shrink-0 rounded-full px-3 py-1 ${i === 0 ? "bg-ink text-bone" : "border border-ink"}`}>{p.due}</span>
                </RiseOnView>
              ))}
            </ul>
            <p className="caption-2 mt-4 text-slate">Example policy. Conditions and due dates are configurable.</p>
          </RiseOnView>
        </div>
      </section>

      <section id="rings" data-nav-tone="dark" className="on-dark bg-ink py-20 text-bone sm:py-24">
        <div className="page-x">
          <WordReveal parts="Ring-Based Deployment and Verification" className="heading-4 sm:heading-3 lg:heading-2 max-w-[22ch]" />
          <p className="body-7 mt-6 max-w-[60ch] text-ash-grey">
            A single patch deployment across 62 devices in four deployment rings, from scheduling to evidence. Select a stage to view it.
          </p>
          <div className="mt-12">
            <RingTrack />
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="page-x">
          <SectionIntro
            eyebrow="Verification"
            heading="Installation Status vs Verified Closure"
            lead="Deployment tools report that an update was installed; a verification scan or agent check confirms that the vulnerability is no longer present. Common causes of a discrepancy:"
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stillVulnerable.map((v, i) => (
              <RiseOnView as="li" key={v.title} delay={i * 0.08} className="lift group rounded-3xl border border-ash-grey p-6 hover:border-ink">
                <v.icon weight="light" className="size-8 transition-transform duration-500 ease-[var(--ease-settle)] group-hover:scale-110" aria-hidden="true" />
                <h3 className="title-2 mt-6">{v.title}</h3>
                <p className="body-6 mt-2 text-graphite">{v.body}</p>
              </RiseOnView>
            ))}
          </ul>
          <RiseOnView navTone="dark" className="on-dark mt-4 flex flex-col gap-4 rounded-3xl bg-ink p-6 text-bone sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <p className="heading-5 max-w-[36ch]">A Finding Is Closed Only After Verification</p>
            <p className="body-6 max-w-[40ch] text-ash-grey">Devices that remain vulnerable after installation are reopened automatically, with the cause recorded.</p>
          </RiseOnView>
        </div>
      </section>

      <section className="border-t border-ash-grey bg-mist py-20 sm:py-24">
        <div className="page-x grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionIntro
              eyebrow="Risk Exceptions"
              heading="Time-Bound Risk Exceptions"
              lead="When a patch cannot be applied by the due date, a risk exception records the approver, the justification, the compensating control and the expiry date."
            />
          </div>
          <RiseOnView delay={0.1} className="lg:col-span-7">
            <div className="rounded-3xl bg-bone p-6 shadow-[0_24px_48px_-32px_rgb(0_0_0/0.35)] sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="caption-6 font-mono">EX-0193</p>
                <p className="caption-6 rounded-full border border-ink px-3 py-1">Approved</p>
              </div>
              <dl className="mt-6 divide-y divide-ash-grey">
                {[
                  ["Finding", "CVE-2023-34362 on mft-prod-01"],
                  ["Justification", "Vendor upgrade requires a scheduled partner cutover in January"],
                  ["Compensating Control", "Inbound access restricted to two partner IP ranges"],
                  ["Approver", "Head of Integration"],
                  ["Expiry Date", "31 Jan 2027"],
                ].map(([k, v]) => (
                  <div key={k} className="grid gap-1 py-3 sm:grid-cols-[180px_1fr]">
                    <dt className="caption-2 text-slate">{k}</dt>
                    <dd className="body-5">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-mist p-4">
                <CalendarX weight="light" className="size-6 shrink-0" aria-hidden="true" />
                <p className="body-6 text-graphite">On expiry, the finding is reopened and the risk exception is returned to the approver for review.</p>
              </div>
              <p className="caption-5 mt-4 text-slate">Sample data</p>
            </div>
          </RiseOnView>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="page-x grid grid-cols-1 gap-4 md:grid-cols-2">
          <RiseOnView className="flex flex-col rounded-3xl border border-ash-grey p-6 sm:p-8">
            <Seal weight="light" className="size-8" aria-hidden="true" />
            <h2 className="heading-5 mt-6">Verified Closures as Audit Evidence</h2>
            <p className="body-3 mt-2 text-graphite">
              Verified closures are attached to the vulnerability management control in GRC as evidence records, with dates and
              the confirming verification scan. Risk exceptions are attached with their approver and expiry date.
            </p>
          </RiseOnView>
          <RiseOnView delay={0.1} className="flex flex-col rounded-3xl bg-mist p-6 sm:p-8">
            <p className="caption-3 text-slate">Reference Guidance</p>
            <h2 className="heading-5 mt-4">Alignment with NIST SP 800-40 Rev. 4</h2>
            <p className="body-3 mt-2 text-graphite">
              NIST SP 800-40 Rev. 4 describes enterprise patching as preventive maintenance, planned around groups of assets and
              phased rollouts. Deployment rings and maintenance windows follow the same model.
            </p>
            <a
              href="https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-40r4.pdf"
              target="_blank"
              rel="noreferrer"
              className="link-arrow body-4 mt-auto pt-4"
            >
              View NIST SP 800-40 Rev. 4
              <ArrowUpRight weight="bold" className="size-4" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </RiseOnView>
        </div>
      </section>

      <section aria-label="Module summary" className="page-x border-t border-ash-grey py-24">
        <InkParagraph as="h2" className="heading-3 sm:heading-2 lg:heading-1" text="A finding is closed only when a verification scan confirms that the vulnerability is no longer present." />
      </section>

      <ModuleRelations mod={mod} />
      <Faq items={faq} />
      <CtaBand href="/walkthrough?interest=vulnerability-patch-management" secondary={{ href: "/platform/automated-penetration-testing", label: "View Automated Penetration Testing" }} />
    </>
  );
}
