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
    body: "Known CVEs reported by scanners and endpoint agents, with the exploitation status of each.",
    examples: ["CVE-2024-21762 on edge-fw-02", "CVE-2021-44228 on billing-api-04"],
  },
  {
    icon: GearSix,
    title: "Misconfigurations",
    body: "Configuration weaknesses without a CVE identifier, such as exposed management ports and unsigned SMB traffic.",
    examples: ["RDP exposed to the internet", "SMB signing not required"],
  },
  {
    icon: Fingerprint,
    title: "Identity Exposures",
    body: "Accounts and credentials that increase the impact of other findings, such as excessive privileges and reused passwords.",
    examples: ["Local administrator password reused", "Service account with domain administrator rights"],
  },
];

const signalSteps = [
  { meta: "Signal 1", title: "Asset Criticality", body: "Asset criticality from the asset record. A finding on a payment system ranks above the same finding on a test system." },
  { meta: "Signal 2", title: "Reachability", body: "Whether the asset is internet-facing, reachable internally or protected by a compensating control. Unreachable findings are deprioritized regardless of CVSS score." },
  { meta: "Signal 3", title: "Known Exploitation", body: "Listing in the CISA Known Exploited Vulnerabilities (KEV) catalog or in connected threat intelligence feeds." },
  { meta: "Signal 4", title: "Validated Attack Path", body: "Findings that Automated Penetration Testing confirms as part of a validated attack path move to the top of the Exposure Queue." },
];

const raises = ["Included in a validated attack path", "Asset is internet-facing", "CVE added to the CISA KEV catalog", "Asset criticality increased"];
const lowers = ["Compensating control blocks the attack path", "Asset not reachable from an attacker entry point", "Asset retired in the asset inventory", "Approved risk exception with an expiry date"];

const flow = [
  { icon: ListNumbers, title: "Prioritized", body: "Ranked against the affected asset in the Exposure Queue." },
  { icon: UserCircle, title: "Assigned", body: "Assigned to the asset owner as a remediation task." },
  { icon: Wrench, title: "Remediated", body: "Patched in deployment rings by the asset owner." },
  { icon: CheckCircle, title: "Verified", body: "Removed from the Exposure Queue after a verification scan confirms the fix." },
];

const faq = [
  {
    q: "How is a priority rank explained?",
    a: "Each finding shows a score breakdown: the base severity and the points added or removed by each prioritization signal.",
  },
  {
    q: "Are findings from multiple scanners duplicated?",
    a: "No. Findings are attached to a single asset record, so the same CVE reported by two data sources on one asset appears once in the Exposure Queue.",
  },
  {
    q: "Where does asset criticality come from?",
    a: "From Asset Intelligence, where it is imported from the CMDB or set manually. A change to asset criticality recalculates the priority rank of every finding on that asset.",
  },
  {
    q: "Which finding types are prioritized?",
    a: "Vulnerabilities, misconfigurations such as exposed management ports, and identity exposures such as excessive privileges, all on the same scale.",
  },
  {
    q: "How are findings that cannot be patched handled?",
    a: "A compensating control that blocks the attack path, or a risk exception with a named approver and an expiry date, is recorded on the finding and reflected in its priority rank.",
  },
  {
    q: "How are prioritized findings assigned for remediation?",
    a: "Vulnerability & Patch Management assigns each finding to the asset owner as a remediation task, with a due date from the remediation policy. A finding is removed from the Exposure Queue after verified closure.",
  },
  {
    q: "Which threat intelligence sources are used?",
    a: "The CISA Known Exploited Vulnerabilities (KEV) catalog and any connected threat intelligence feeds.",
  },
];

export function ThreatExposurePage() {
  return (
    <>
      <ModuleHero
        mod={mod}
        layout="stacked"
        lines={["Risk-Based Exposure", "Prioritization"]}
        intro="Threat Exposure Management ranks each finding by asset criticality, reachability, known exploitation and validated attack paths, and records the basis for every priority rank."
        visual={<ExposureFunnel />}
        secondary={{ href: "#rerank", label: "View Prioritization Model" }}
      />

      <StatBand
        heading="Vulnerability Exploitation as an Initial Access Vector"
        stats={[
          { value: 20, suffix: "%", label: "of breaches involved vulnerability exploitation as the initial access vector.", source: dbir },
          { value: 22, suffix: "%", label: "of vulnerability exploitation targeted edge devices and VPNs, up from 3% the previous year.", source: dbir },
          { value: 54, suffix: "%", label: "of edge device and VPN vulnerabilities were fully remediated, with a median remediation time of 32 days.", source: dbir },
        ]}
      />

      <section id="rerank" data-nav-tone="dark" className="on-dark bg-ink py-20 text-bone sm:py-24">
        <div className="page-x">
          <WordReveal parts="Exposure Queue Prioritization" className="heading-4 sm:heading-3 lg:heading-2 max-w-[22ch]" />
          <p className="body-7 mt-6 max-w-[60ch] text-ash-grey">
            Eight findings are initially sorted by CVSS score. Each prioritization signal recalculates the priority rank;
            select a finding to view its score breakdown.
          </p>
          <div className="mt-12">
            <ReRank />
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="page-x">
          <SectionIntro eyebrow="Finding Types" heading="Vulnerabilities, Misconfigurations and Identity Exposures" lead="All finding types are scored on the same scale and prioritized in a single Exposure Queue." />
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
                eyebrow="Prioritization Model"
                heading="Prioritization Signals"
                lead="Each priority rank is calculated from verifiable inputs: the asset record, the CISA KEV catalog, connected threat intelligence and penetration test results."
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
          <SectionIntro eyebrow="Rank Adjustments" heading="Priority Rank Adjustments" lead="A priority rank is recalculated when the underlying data changes, and each change is recorded on the finding." />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <RiseOnView navTone="dark" className="on-dark rounded-3xl bg-ink p-6 text-bone sm:p-8">
              <p className="heading-6 flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-bone text-ink">
                  <ArrowUp weight="bold" className="size-5" aria-hidden="true" />
                </span>
                Increases Priority
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
                Decreases Priority
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
          <SectionIntro eyebrow="Remediation Workflow" heading="From Prioritization to Verified Closure" />
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
            Steps 2 to 4 are performed in Vulnerability &amp; Patch Management on the same asset record.
          </p>
        </div>
      </section>

      <section aria-label="Module summary" className="page-x border-t border-ash-grey py-24">
        <InkParagraph as="h2" className="heading-3 sm:heading-2 lg:heading-1" text="Every priority rank is traceable to its inputs: asset criticality, reachability, known exploitation and validated attack paths." />
      </section>

      <ModuleRelations mod={mod} />
      <Faq items={faq} />
      <CtaBand href="/walkthrough?interest=threat-exposure-management" secondary={{ href: "/platform/vulnerability-patch-management", label: "View Vulnerability & Patch Management" }} />
    </>
  );
}
