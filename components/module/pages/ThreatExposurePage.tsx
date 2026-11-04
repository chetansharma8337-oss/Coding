import { ArrowDown, ArrowRight, ArrowUp, Bug, CheckCircle, Fingerprint, GearSix, ListNumbers, UserCircle, Wrench } from "@phosphor-icons/react/dist/ssr";
import { InkParagraph } from "@/components/InkParagraph";
import { ModuleIcon } from "@/components/ModuleIcon";
import { RiseOnView } from "@/components/RiseOnView";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { WordReveal } from "@/components/WordReveal";
import { moduleBySlug } from "@/lib/modules";
import { ExposureFunnel } from "../exposure/ExposureFunnel";
import { ReRank } from "../exposure/ReRank";
import { ModuleHero } from "../ModuleHero";
import { ModuleRelations } from "../ModuleRelations";
import { ScrollSteps } from "../ScrollSteps";
import { StatBand } from "../StatBand";

const mod = moduleBySlug("threat-exposure-management")!;
const dbir = { label: "Verizon DBIR 2025", href: "https://www.verizon.com/business/resources/reports/2025-dbir-data-breach-investigations-report.pdf" };

const kinds = [
  {
    icon: Bug,
    title: "Vulnerabilities",
    body: "Known CVEs from your scanners and agents, with the exploitation status of each.",
    examples: ["CVE-2024-21762 on edge-fw-02", "CVE-2021-44228 on billing-api-04"],
  },
  {
    icon: GearSix,
    title: "Misconfigurations",
    body: "Exposures that are not CVEs: open management ports, unsigned SMB, services listening where they should not.",
    examples: ["RDP open to the internet", "SMB signing not required"],
  },
  {
    icon: Fingerprint,
    title: "Identity exposures",
    body: "Accounts and credentials that make other exposures worse: too much privilege, reused passwords.",
    examples: ["Local admin password reused", "Service account with domain admin"],
  },
];

const signalSteps = [
  { meta: "Signal 1", title: "Asset criticality", body: "Comes from the asset record. A finding on the payment database outranks the same finding on a test box, without anyone retyping criticality into a spreadsheet." },
  { meta: "Signal 2", title: "Reachability", body: "Is the asset internet facing, reachable from inside, or behind a control that blocks the path? Unreachable findings sink, however high their CVSS." },
  { meta: "Signal 3", title: "Known exploitation", body: "Entries in the CISA Known Exploited Vulnerabilities catalog, plus any threat intelligence you connect. Exploited somewhere is a strong reason to look here first." },
  { meta: "Signal 4", title: "Validated attack path", body: "When Automated Penetration Testing proves a finding is part of a working path to something valuable, it moves to the top. Proof outranks severity." },
];

const raises = ["A test proves it is on a working attack path", "The asset is internet facing", "The CVE is added to the KEV catalog", "The asset's criticality is raised"];
const lowers = ["A compensating control blocks the path", "The asset is not reachable from where attackers start", "The asset is retired in the inventory", "An approved exception with an expiry date"];

const flow = [
  { icon: ListNumbers, title: "Ranked", body: "Scored against the asset it sits on." },
  { icon: UserCircle, title: "Owned", body: "Assigned to the owner from the asset record." },
  { icon: Wrench, title: "Fixed", body: "Patched in rings by the owning team." },
  { icon: CheckCircle, title: "Verified", body: "Leaves the queue only when a rescan confirms it." },
];

const faq = [
  {
    q: "Can we see why a finding ranks first?",
    a: "Yes. Every position shows its arithmetic: the severity it started from and the points each signal added or removed. There is no score you have to take on trust.",
  },
  {
    q: "Will it duplicate the findings our scanners already report?",
    a: "It reads those findings and attaches each one to a single asset record, so the same CVE reported by two tools on the same server is one item in the queue.",
  },
  {
    q: "Where does asset criticality come from?",
    a: "From Asset Intelligence, where it is set from your CMDB or by hand. Change it once and every finding on that asset is re-scored.",
  },
  {
    q: "Does it only cover CVEs?",
    a: "No. Misconfigurations such as open management ports, and identity exposures such as accounts with too much privilege, sit in the same queue on the same scale.",
  },
  {
    q: "What if we cannot patch something?",
    a: "Record the compensating control that blocks the path, or raise an exception with a named approver and an end date. The finding's rank reflects it, and the exception comes back for review when it expires.",
  },
  {
    q: "How does the queue reach the teams who fix things?",
    a: "Findings route to the owner on the asset record, with due dates from your remediation policy, through Vulnerability & Patch Management. A finding leaves the queue only when a rescan confirms the fix.",
  },
  {
    q: "Which threat intelligence does it use?",
    a: "The CISA KEV catalog, plus any threat intelligence feeds you connect.",
  },
];

export function ThreatExposurePage() {
  return (
    <>
      <ModuleHero
        mod={mod}
        layout="stacked"
        lines={["Fix the exposures", "that can actually hurt you."]}
        intro="Severity scores call almost everything critical. Threat Exposure Management ranks each exposure against the asset it sits on, whether it can be reached, whether it is exploited, and whether a test has proven it, and shows its reasons."
        visual={<ExposureFunnel />}
        secondary={{ href: "#rerank", label: "Watch a queue re-rank" }}
      />

      <StatBand
        heading="Attackers are getting in through the exposures teams have not reached yet."
        stats={[
          { value: 20, suffix: "%", label: "of breaches began with the exploitation of a vulnerability.", source: dbir },
          { value: 22, suffix: "%", label: "of exploitation targeted edge devices and VPNs, up from 3% a year earlier.", source: dbir },
          { value: 54, suffix: "%", label: "of those edge device vulnerabilities were fully remediated, with a median of 32 days.", source: dbir },
        ]}
      />

      <section id="rerank" data-nav-tone="dark" className="on-dark bg-ink py-20 text-bone sm:py-24">
        <div className="page-x">
          <WordReveal parts={[{ text: "The re-rank.", className: "text-ash-grey" }, { text: "Same findings, real order." }]} className="heading-4 sm:heading-3 lg:heading-2 max-w-[22ch]" />
          <p className="body-7 mt-6 max-w-[60ch] text-ash-grey">
            Eight findings arrive sorted by CVSS. Switch on each signal and watch them reorder. The 9.8 on a lab machine no
            one can reach sinks to the bottom; a medium misconfiguration on a proven path climbs. Select any finding to see
            its arithmetic.
          </p>
          <div className="mt-12">
            <ReRank />
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="page-x">
          <SectionIntro muted="One scale." heading="Every kind of exposure in one queue" lead="Attackers do not care whether a weakness has a CVE number. The queue does not either." />
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {kinds.map((k, i) => (
              <RiseOnView as="li" key={k.title} delay={i * 0.08} className="lift group flex flex-col rounded-3xl border border-ash-grey p-6 hover:border-ink sm:p-8">
                <k.icon weight="light" className="size-10 transition-transform duration-500 ease-[var(--ease-settle)] group-hover:scale-110" aria-hidden="true" />
                <h3 className="heading-5 mt-8">{k.title}</h3>
                <p className="body-6 mt-2 text-graphite">{k.body}</p>
                <ul className="mt-6 space-y-2 border-t border-ash-grey pt-4">
                  {k.examples.map((e) => (
                    <li key={e} className="caption-6 font-mono text-graphite">
                      {e}
                    </li>
                  ))}
                </ul>
              </RiseOnView>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-ash-grey py-20 sm:py-24">
        <div className="page-x grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+48px)]">
              <SectionIntro
                muted="No mystery score."
                heading="Four signals, each one you can check"
                lead="The inputs are your own asset record, a public catalog, your threat intelligence and your own test results. Nothing proprietary to take on faith."
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <ScrollSteps steps={signalSteps} />
          </div>
        </div>
      </section>

      <section className="border-t border-ash-grey bg-mist py-20 sm:py-24">
        <div className="page-x">
          <SectionIntro heading="What moves a finding" lead="A rank changes when the facts behind it change, and the finding records why." />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <RiseOnView navTone="dark" className="on-dark rounded-3xl bg-ink p-6 text-bone sm:p-8">
              <p className="heading-6 flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-bone text-ink">
                  <ArrowUp weight="bold" className="size-5" aria-hidden="true" />
                </span>
                Raises a rank
              </p>
              <ul className="mt-6 space-y-3">
                {raises.map((r) => (
                  <li key={r} className="body-3 border-t border-bone/15 pt-3">
                    {r}
                  </li>
                ))}
              </ul>
            </RiseOnView>
            <RiseOnView delay={0.1} className="rounded-3xl border border-ash-grey bg-bone p-6 sm:p-8">
              <p className="heading-6 flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl border border-ink">
                  <ArrowDown weight="bold" className="size-5" aria-hidden="true" />
                </span>
                Lowers a rank
              </p>
              <ul className="mt-6 space-y-3">
                {lowers.map((r) => (
                  <li key={r} className="body-3 border-t border-ash-grey pt-3 text-graphite">
                    {r}
                  </li>
                ))}
              </ul>
            </RiseOnView>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="page-x">
          <SectionIntro muted="Mobilize." heading="From the top of the queue to closed" />
          <ol className="mt-12 grid gap-4 md:grid-cols-4">
            {flow.map((f, i) => (
              <RiseOnView as="li" key={f.title} delay={i * 0.1} className="relative rounded-3xl border border-ash-grey p-6">
                <span className="caption-3 text-slate">Step {i + 1}</span>
                <f.icon weight="light" className="mt-4 size-8" aria-hidden="true" />
                <h3 className="heading-6 mt-4">{f.title}</h3>
                <p className="body-6 mt-2 text-graphite">{f.body}</p>
                {i < flow.length - 1 ? (
                  <ArrowRight weight="bold" className="absolute -right-3 top-1/2 z-10 hidden size-6 -translate-y-1/2 rounded-full bg-bone p-1 md:block" aria-hidden="true" />
                ) : null}
              </RiseOnView>
            ))}
          </ol>
          <p className="body-6 mt-6 flex items-center gap-2 text-graphite">
            <ModuleIcon slug="vulnerability-patch-management" className="size-5" />
            Steps 2 to 4 run in Vulnerability &amp; Patch Management, on the same record.
          </p>
        </div>
      </section>

      <section aria-label="The principle" className="page-x border-t border-ash-grey py-24">
        <InkParagraph as="h2" className="heading-3 sm:heading-2 lg:heading-1" text="A queue you can explain beats a score you have to trust." />
      </section>

      <ModuleRelations mod={mod} />
      <Faq items={faq} heading="Questions about Threat Exposure Management" />
      <CtaBand heading="See your own top ten." href="/walkthrough?interest=threat-exposure-management" secondary={{ href: "/platform/vulnerability-patch-management", label: "Next: Vulnerability & Patch" }} />
    </>
  );
}
