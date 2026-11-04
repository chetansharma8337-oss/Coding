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
  { icon: FileImage, name: "patching_proof_FINAL_v3.png", meta: "Taken by ?, on ?" },
  { icon: FileXls, name: "Q3 vuln export (copy).xlsx", meta: "Edited 4 times since export" },
  { icon: Camera, name: "Screenshot 2026-09-14 at 16.02.png", meta: "Which server is this?" },
  { icon: FileImage, name: "pentest_report_2025.pdf", meta: "Fourteen months old" },
];

const provenance = [
  { icon: Cube, k: "Produced by", v: "Vulnerability & Patch Management" },
  { icon: Clock, k: "When", v: "4 Nov 2026, 02:41" },
  { icon: Gear, k: "How", v: "Rescan of 62 devices after ring rollout" },
  { icon: LinkSimple, k: "Linked to", v: "fin-db-02, billing-api-04 and 60 more" },
  { icon: User, k: "Control owner", v: "Head of Infrastructure" },
];

const faq = [
  {
    q: "Which frameworks can we map to?",
    a: "ISO/IEC 27001, NIST CSF, the CIS Controls and the other frameworks you report against. A control is mapped once and its evidence counts for every framework it satisfies.",
  },
  {
    q: "Does ASH-V replace our auditor?",
    a: "No. Certification still needs an accredited auditor. ASH-V gives them each control with its owner, its evidence, where that evidence came from and when the control was last tested.",
  },
  {
    q: "Where does the evidence come from?",
    a: "Mostly from the work itself: verified closures and exceptions from patching, retests from penetration testing, reviews from vendor risk and the asset inventory. Evidence from outside ASH-V, such as a signed policy, is added to the control by its owner.",
  },
  {
    q: "Can an auditor see where a piece of evidence came from?",
    a: "Yes. Each item records the module that produced it, when, how, and the assets and control it relates to.",
  },
  {
    q: "How does the risk register fit in?",
    a: "Risks are recorded with the assets and controls involved and the treatment decided. Because they link to the same controls, you can see which risks a control with stale evidence affects.",
  },
  {
    q: "Do we have to rebuild our control set?",
    a: "No. Bring the controls you already operate and map them to the frameworks you report against; the walkthrough starts from your current set.",
  },
];

export function GrcPage() {
  return (
    <>
      <ModuleHero
        mod={mod}
        layout="stacked"
        lines={["Evidence that", "collects itself."]}
        intro="Map each control once to every framework you report against. The evidence arrives from the work your teams already do, with where it came from and when, so the audit view is current on any given day."
        visual={<AuditView />}
        secondary={{ href: "#fanout", label: "Watch evidence arrive" }}
      />

      <section className="py-20 sm:py-24">
        <div className="page-x">
          <SectionIntro muted="The problem." heading="An audit built from screenshots proves very little" />
          <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <RiseOnView className="rounded-3xl border border-dashed border-slate p-6 sm:p-8">
              <p className="caption-3 text-slate">The evidence folder, two weeks before the audit</p>
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
              <p className="body-6 mt-6 text-graphite">No author, no timestamp you can trust, no link to the asset or the control.</p>
            </RiseOnView>
            <RiseOnView delay={0.1} navTone="dark" className="on-dark rounded-3xl bg-ink p-6 text-bone sm:p-8">
              <p className="caption-3 text-ash-grey">One evidence record in ASH-V</p>
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
              <p className="caption-5 mt-6 text-ash-grey">Illustrative, sample data</p>
            </RiseOnView>
          </div>
        </div>
      </section>

      <section id="fanout" data-nav-tone="dark" className="on-dark bg-ink py-20 text-bone sm:py-24">
        <div className="page-x">
          <WordReveal parts={[{ text: "One control.", className: "text-ash-grey" }, { text: "Evidence from the work, counted everywhere." }]} className="heading-4 sm:heading-3 lg:heading-2 max-w-[24ch]" />
          <p className="body-7 mt-6 max-w-[60ch] text-ash-grey">
            Watch four pieces of evidence travel from the modules that produced them into control VM-01, and every mapped
            framework reuse them.
          </p>
          <div className="mt-12">
            <ControlFanout />
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="page-x">
          <SectionIntro
            muted="Crosswalk."
            heading="Mapped by requirement, and open to inspection"
            lead="Every mapping names the exact requirement it satisfies, so anyone can check it. Three common controls as an example:"
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
                  <th scope="col" className="p-4 font-semibold sm:px-6">Evidence from</th>
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
            More on each framework on the{" "}
            <Link href="/frameworks" className="font-semibold text-ink underline underline-offset-4">
              frameworks page
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-t border-ash-grey bg-mist py-20 sm:py-24">
        <div className="page-x grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionIntro
              muted="Risk register."
              heading="Risks tied to the controls that treat them"
              lead="Record each risk with the assets and controls involved and the treatment you chose. When a control's evidence goes stale, you can see which risks it leaves exposed."
            />
          </div>
          <RiseOnView delay={0.1} className="lg:col-span-7">
            <div className="rounded-3xl bg-bone p-6 shadow-[0_24px_48px_-32px_rgb(0_0_0/0.35)] sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="caption-6 font-mono">R-07</p>
                <p className="caption-6 rounded-full border border-ink px-3 py-1">Treatment: reduce</p>
              </div>
              <p className="heading-5 mt-3">Ransomware through an internet facing VPN</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="caption-3 text-slate">Assets</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {["edge-fw-02", "vpn-gw-01"].map((a) => (
                      <li key={a} className="caption-6 rounded-full bg-mist px-3 py-1 font-mono">
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="caption-3 text-slate">Controls</p>
                  <ul className="mt-2 space-y-1">
                    <li className="caption-6 flex items-center justify-between gap-2 rounded-xl bg-mist px-3 py-2">
                      <span className="font-mono">VM-01</span>
                      <span>Passing, today</span>
                    </li>
                    <li className="caption-6 flex items-center justify-between gap-2 rounded-xl border border-dashed border-ink px-3 py-2">
                      <span className="font-mono">BK-01</span>
                      <span>Evidence stale, 12 Sep</span>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="caption-5 mt-6 text-slate">Illustrative, sample data</p>
            </div>
          </RiseOnView>
        </div>
      </section>

      <section aria-label="The principle" className="page-x py-24">
        <InkParagraph as="h2" className="heading-3 sm:heading-2 lg:heading-1" text="The best audit evidence is a record the work wrote, not a screenshot someone took." />
      </section>

      <ModuleRelations mod={mod} />
      <Faq items={faq} heading="Questions about GRC" />
      <CtaBand heading="Walk into the next audit ready." href="/walkthrough?interest=grc" secondary={{ href: "/platform", label: "Back to the platform" }} />
    </>
  );
}
