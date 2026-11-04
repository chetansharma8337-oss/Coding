import Link from "next/link";
import { Camera, Clock, Cube, FileImage, FileXls, Gear, LinkSimple, User } from "@phosphor-icons/react/dist/ssr";
import { InkParagraph } from "@/components/InkParagraph";
import { RiseOnView } from "@/components/RiseOnView";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { WordReveal } from "@/components/WordReveal";
import { mappingExample } from "@/lib/frameworks";
import { moduleBySlug } from "@/lib/modules";
import { AuditView } from "../grc/AuditView";
import { ControlFanout } from "../grc/ControlFanout";
import { ModuleHero } from "../ModuleHero";
import { ModuleRelations } from "../ModuleRelations";

const mod = moduleBySlug("grc")!;

const folder = [
  { icon: FileImage, name: "patching_proof_FINAL_v3.png", meta: "Author and date unknown" },
  { icon: FileXls, name: "Q3 vuln export (copy).xlsx", meta: "Modified 4 times after export" },
  { icon: Camera, name: "Screenshot 2026-09-14 at 16.02.png", meta: "Asset not identified" },
  { icon: FileImage, name: "pentest_report_2025.pdf", meta: "Created 14 months ago" },
];

const provenance = [
  { icon: Cube, k: "Source Module", v: "Vulnerability & Patch Management" },
  { icon: Clock, k: "Timestamp", v: "4 Nov 2026, 02:41" },
  { icon: Gear, k: "Method", v: "Verification scan of 62 devices after ring deployment" },
  { icon: LinkSimple, k: "Linked Assets", v: "fin-db-02, billing-api-04 and 60 others" },
  { icon: User, k: "Control Owner", v: "Head of Infrastructure" },
];

const faq = [
  {
    q: "Which frameworks are supported for control mapping?",
    a: "ISO/IEC 27001, NIST CSF, the CIS Controls and the other frameworks you report against. Each control is mapped once, and its evidence records apply to every mapped requirement.",
  },
  {
    q: "Does ASH-V replace the external auditor?",
    a: "No. Certification requires an accredited auditor. ASH-V provides the auditor with each control, its control owner, its evidence records with their source, and the last control test date.",
  },
  {
    q: "How are evidence records collected?",
    a: "Verified closures and risk exceptions from Vulnerability & Patch Management, retest results from Automated Penetration Testing, vendor assessments from Third-Party Risk Management and asset scope from Asset Intelligence are attached automatically. Evidence produced outside ASH-V, such as an approved policy, is added by the control owner.",
  },
  {
    q: "Is the source of each evidence record recorded?",
    a: "Yes. Each evidence record identifies the source module, timestamp, method and the linked assets and control.",
  },
  {
    q: "How does the risk register relate to controls?",
    a: "Each risk is linked to its affected assets and mitigating controls. A control with an overdue test identifies the risks it affects.",
  },
  {
    q: "Can an existing control set be used?",
    a: "Yes. Existing controls are mapped to the frameworks you report against. The platform walkthrough starts from your current control set.",
  },
];

export function GrcPage() {
  return (
    <>
      <ModuleHero
        mod={mod}
        layout="stacked"
        lines={["Control Mapping and", "Evidence Collection"]}
        intro="GRC maps each control once to every framework you report against. Evidence records are produced by the modules that perform remediation, testing and vendor assessment, each with its source and timestamp."
        visual={<AuditView />}
        secondary={{ href: "#fanout", label: "View Evidence Collection" }}
      />

      <section className="py-20 sm:py-24">
        <div className="page-x">
          <SectionIntro eyebrow="Challenge" heading="Limitations of Screenshot-Based Evidence" />
          <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <RiseOnView className="rounded-3xl border border-dashed border-slate p-6 sm:p-8">
              <p className="caption-3 text-slate">Manually Collected Evidence</p>
              <ul className="mt-6 space-y-2">
                {folder.map((f, i) => (
                  <RiseOnView as="li" key={f.name} delay={0.1 + i * 0.08} className="flex items-center gap-3 rounded-2xl bg-mist p-3">
                    <f.icon weight="light" className="size-6 shrink-0 text-graphite" aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="caption-6 block truncate font-mono">{f.name}</span>
                      <span className="caption-5 block text-slate">{f.meta}</span>
                    </span>
                  </RiseOnView>
                ))}
              </ul>
              <p className="body-6 mt-6 text-graphite">No verifiable author, timestamp, asset or control reference.</p>
            </RiseOnView>
            <RiseOnView delay={0.1} navTone="dark" className="on-dark rounded-3xl bg-ink p-6 text-bone sm:p-8">
              <p className="caption-3 text-ash-grey">ASH-V Evidence Record</p>
              <p className="heading-6 mt-4">61 verified closures for CVE-2021-44228</p>
              <dl className="mt-6 space-y-2">
                {provenance.map((p, i) => (
                  <RiseOnView key={p.k} delay={0.2 + i * 0.08} className="grid grid-cols-[24px_110px_1fr] items-start gap-3 rounded-2xl bg-raised p-3">
                    <p.icon weight="light" className="size-5" aria-hidden="true" />
                    <dt className="caption-2 text-ash-grey">{p.k}</dt>
                    <dd className="body-5">{p.v}</dd>
                  </RiseOnView>
                ))}
              </dl>
              <p className="caption-5 mt-6 text-ash-grey">Sample data</p>
            </RiseOnView>
          </div>
        </div>
      </section>

      <section id="fanout" data-nav-tone="dark" className="on-dark bg-ink py-20 text-bone sm:py-24">
        <div className="page-x">
          <WordReveal parts="Evidence Collection and Requirement Mapping" className="heading-4 sm:heading-3 lg:heading-2 max-w-[24ch]" />
          <p className="body-7 mt-6 max-w-[60ch] text-ash-grey">
            Evidence records from three modules are attached to control VM-01 and applied to each mapped framework
            requirement.
          </p>
          <div className="mt-12">
            <ControlFanout />
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="page-x">
          <SectionIntro
            eyebrow="Control Mapping"
            heading="Cross-Framework Control Mapping"
            lead="Each control mapping references the specific framework requirement it satisfies. Three example controls are shown below."
          />
          <RiseOnView className="mt-12 overflow-x-auto rounded-3xl border border-ash-grey">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <caption className="sr-only">Example crosswalk across ISO/IEC 27001:2022, NIST CSF 2.0 and CIS Controls v8.1</caption>
              <thead className="bg-mist">
                <tr className="caption-3 text-slate">
                  <th scope="col" className="p-4 font-semibold sm:px-6">Control</th>
                  <th scope="col" className="p-4 font-semibold">ISO/IEC 27001:2022</th>
                  <th scope="col" className="p-4 font-semibold">NIST CSF 2.0</th>
                  <th scope="col" className="p-4 font-semibold">CIS v8.1</th>
                  <th scope="col" className="p-4 font-semibold sm:px-6">Evidence Source</th>
                </tr>
              </thead>
              <tbody>
                {mappingExample.map((r) => (
                  <tr key={r.control} className="border-t border-ash-grey align-top">
                    <th scope="row" className="body-5 p-4 sm:px-6">{r.control}</th>
                    <td className="caption-6 p-4 font-mono">{r.iso}</td>
                    <td className="caption-6 p-4 font-mono">{r.csf}</td>
                    <td className="caption-6 p-4 font-mono">{r.cis}</td>
                    <td className="body-6 p-4 text-graphite sm:px-6">{r.evidence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </RiseOnView>
          <p className="body-6 mt-6 text-graphite">
            Framework details are available on the{" "}
            <Link href="/frameworks" className="font-semibold text-ink underline underline-offset-4">
              Frameworks page
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-t border-ash-grey bg-mist py-20 sm:py-24">
        <div className="page-x grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionIntro
              eyebrow="Risk Register"
              heading="Risk Register with Linked Controls"
              lead="Each risk is recorded with its affected assets, mitigating controls and treatment decision. Controls with an overdue test identify the risks they affect."
            />
          </div>
          <RiseOnView delay={0.1} className="lg:col-span-7">
            <div className="rounded-3xl bg-bone p-6 shadow-[0_24px_48px_-32px_rgb(0_0_0/0.35)] sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="caption-6 font-mono">R-07</p>
                <p className="caption-6 rounded-full border border-ink px-3 py-1">Treatment: Mitigate</p>
              </div>
              <p className="heading-5 mt-3">Ransomware via Internet-Facing VPN</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="caption-3 text-slate">Affected Assets</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {["edge-fw-02", "vpn-gw-01"].map((a) => (
                      <li key={a} className="caption-6 rounded-full bg-mist px-3 py-1 font-mono">
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="caption-3 text-slate">Mitigating Controls</p>
                  <ul className="mt-2 space-y-1">
                    <li className="caption-6 flex items-center justify-between gap-2 rounded-xl bg-mist px-3 py-2">
                      <span className="font-mono">VM-01</span>
                      <span>Effective · 4 Nov 2026</span>
                    </li>
                    <li className="caption-6 flex items-center justify-between gap-2 rounded-xl border border-dashed border-ink px-3 py-2">
                      <span className="font-mono">BK-01</span>
                      <span>Test Overdue · 12 Sep 2026</span>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="caption-5 mt-6 text-slate">Sample data</p>
            </div>
          </RiseOnView>
        </div>
      </section>

      <section aria-label="Module summary" className="page-x py-24">
        <InkParagraph as="h2" className="heading-3 sm:heading-2 lg:heading-1" text="Evidence records are produced by the systems that perform the work, each with a verifiable source, timestamp and linked control." />
      </section>

      <ModuleRelations mod={mod} />
      <Faq items={faq} />
      <CtaBand href="/walkthrough?interest=grc" secondary={{ href: "/platform", label: "View Platform Overview" }} />
    </>
  );
}
