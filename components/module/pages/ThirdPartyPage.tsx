import { ArrowUpRight, Buildings, ClipboardText, FileText, UserCircle } from "@phosphor-icons/react/dist/ssr";
import { InkParagraph } from "@/components/InkParagraph";
import { RiseOnView } from "@/components/RiseOnView";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { WordReveal } from "@/components/WordReveal";
import { moduleBySlug } from "@/lib/modules";
import { CountUp } from "../CountUp";
import { ModuleHero } from "../ModuleHero";
import { ModuleRelations } from "../ModuleRelations";
import { AccessMatrix } from "../vendor/AccessMatrix";
import { ExpiryTimeline } from "../vendor/ExpiryTimeline";
import { VendorRecord } from "../vendor/VendorRecord";

const mod = moduleBySlug("third-party-risk-management")!;

const depth = [
  { tier: "Tier 1", who: "Privileged access or access to regulated data", asks: ["Full security questionnaire", "SOC 2 Type II report or ISO/IEC 27001 certificate", "Annual review with the relationship owner", "Vendor findings tracked to closure"] },
  { tier: "Tier 2", who: "SaaS or API access to internal data", asks: ["Standard security questionnaire", "Current certificate or report, where available", "Biennial review"] },
  { tier: "Tier 3", who: "No access to systems or data", asks: ["Security attestation at onboarding", "Review at contract renewal"] },
];

const regs = [
  {
    name: "DORA",
    full: "Regulation (EU) 2022/2554, Article 28",
    body: "Financial entities must keep a register of information covering all contractual arrangements with ICT third party service providers.",
    href: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj",
  },
  {
    name: "NIS2",
    full: "Directive (EU) 2022/2555, Article 21",
    body: "Cybersecurity risk management measures must include supply chain security, covering the relationship with each direct supplier.",
    href: "https://eur-lex.europa.eu/eli/dir/2022/2555/oj",
  },
];

const faq = [
  {
    q: "How is a vendor tier determined?",
    a: "By the systems the vendor can access, linked to assets in the asset inventory, and the classification of the data involved. The mapping from access and data classification to vendor tier is configurable.",
  },
  {
    q: "What happens when a vendor's access changes?",
    a: "The vendor tier is recalculated from the new access. When the tier increases, an assessment appropriate to the new tier is requested.",
  },
  {
    q: "Are security questionnaires still required?",
    a: "Yes. Questionnaire depth follows the vendor tier: vendors with privileged access or regulated data receive a full questionnaire, and vendors with no access complete an attestation.",
  },
  {
    q: "Can vendors provide an existing SOC 2 report or certificate?",
    a: "Yes. Reports and certificates are recorded as vendor evidence on the vendor record, with expiry dates tracked.",
  },
  {
    q: "Does this replace a security ratings service?",
    a: "No. Security ratings assess a vendor from an external perspective. ASH-V assigns vendor tiers based on internal system and data access. The two approaches are complementary.",
  },
  {
    q: "How are vendor findings managed?",
    a: "Each vendor finding is assigned to the relationship owner and tracked to closure in the same way as any other finding.",
  },
  {
    q: "How are vendor-managed assets handled?",
    a: "Vendor-managed assets are recorded in the asset inventory with the responsible vendor, and their findings are prioritized and assigned with all other findings.",
  },
];

export function ThirdPartyPage() {
  return (
    <>
      <ModuleHero
        mod={mod}
        lines={["Access-Based", "Vendor Risk Tiering"]}
        intro="Third-Party Risk Management assigns each vendor a tier based on the systems and data it can access, sets assessment depth by vendor tier, and tracks vendor evidence to its expiry date."
        visual={<VendorRecord />}
        secondary={{ href: "#matrix", label: "View Vendor Tiering Model" }}
      />

      <section className="py-20 sm:py-24">
        <div className="page-x grid grid-cols-1 items-end gap-12 lg:grid-cols-12">
          <RiseOnView className="lg:col-span-6">
            <p className="numeral-1">
              <CountUp value={30} suffix="%" />
            </p>
            <p className="body-8 mt-6 max-w-[34ch]">of breaches involved a third party, double the share reported the previous year.</p>
            <a
              href="https://www.verizon.com/about/news/2025-data-breach-investigations-report"
              target="_blank"
              rel="noreferrer"
              className="caption-1 mt-4 inline-flex min-h-10 items-center gap-1 text-graphite underline decoration-ash-grey underline-offset-4"
            >
              Verizon 2025 Data Breach Investigations Report
              <ArrowUpRight weight="bold" className="size-3" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </RiseOnView>
          <div className="lg:col-span-6">
            <SectionIntro
              eyebrow="Challenge"
              heading="Static Vendor Tiering"
              lead="Vendor tiers are typically set from intake questionnaires or external security ratings. Neither reflects current system and data access, and tiers are rarely reassessed when access changes."
            />
          </div>
        </div>
      </section>

      <section id="matrix" data-nav-tone="dark" className="on-dark bg-ink py-20 text-bone sm:py-24">
        <div className="page-x">
          <WordReveal parts="Vendor Tiering Model" className="heading-4 sm:heading-3 lg:heading-2 max-w-[22ch]" />
          <p className="body-7 mt-6 max-w-[60ch] text-ash-grey">
            Each vendor is placed by its level of system access and the sensitivity of the data it can reach. The example
            shows the tier change when a vendor is issued an API key.
          </p>
          <div className="mt-12">
            <AccessMatrix />
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="page-x">
          <SectionIntro
            eyebrow="Assessment Depth"
            heading="Tier-Based Assessment Requirements"
            lead="Assessment requirements scale with vendor tier: low-access vendors receive a proportionate assessment and high-access vendors receive a full review."
          />
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {depth.map((d, i) => (
              <RiseOnView
                as="li"
                key={d.tier}
                delay={i * 0.08}
                navTone={i === 0 ? "dark" : undefined}
                className={`flex flex-col rounded-3xl p-6 sm:p-8 ${i === 0 ? "on-dark bg-ink text-bone" : i === 1 ? "bg-mist" : "border border-ash-grey"}`}
              >
                <p className="heading-4">{d.tier}</p>
                <p className={`body-6 mt-2 ${i === 0 ? "text-ash-grey" : "text-graphite"}`}>{d.who}</p>
                <ul className={`mt-6 space-y-2 border-t pt-4 ${i === 0 ? "border-bone/15" : "border-ash-grey"}`}>
                  {d.asks.map((a) => (
                    <li key={a} className="body-5 flex gap-3">
                      <span aria-hidden="true" className={`mt-2 size-1.5 shrink-0 rounded-full ${i === 0 ? "bg-bone" : "bg-ink"}`} />
                      {a}
                    </li>
                  ))}
                </ul>
              </RiseOnView>
            ))}
          </ul>
          <p className="caption-2 mt-4 text-slate">Example requirements. Assessment requirements are configurable for each vendor tier.</p>
        </div>
      </section>

      <section className="border-t border-ash-grey py-20 sm:py-24">
        <div className="page-x grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionIntro
              eyebrow="Vendor Evidence"
              heading="Vendor Evidence Expiry Tracking"
              lead="Reports, certificates and questionnaires are recorded on the vendor record with expiry dates, and renewals are requested before expiry."
            />
          </div>
          <div className="lg:col-span-7">
            <ExpiryTimeline />
          </div>
        </div>
      </section>

      <section className="border-t border-ash-grey bg-mist py-20 sm:py-24">
        <div className="page-x grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { icon: UserCircle, t: "Vendor Findings with Assigned Owners", b: "Each vendor finding is assigned to the relationship owner and tracked to closure." },
            { icon: Buildings, t: "Vendor-Managed Assets", b: "Systems and services operated by a vendor are recorded in the asset inventory, and their findings are prioritized with all other findings." },
            { icon: ClipboardText, t: "Supplier Control Evidence", b: "Vendor assessments, reports and findings are attached to supplier controls in GRC as evidence records." },
          ].map((x, i) => (
            <RiseOnView key={x.t} delay={i * 0.08} className="lift rounded-3xl bg-bone p-6 sm:p-8">
              <x.icon weight="light" className="size-8" aria-hidden="true" />
              <h3 className="heading-6 mt-6">{x.t}</h3>
              <p className="body-6 mt-2 text-graphite">{x.b}</p>
            </RiseOnView>
          ))}
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="page-x">
          <SectionIntro
            eyebrow="Regulatory Requirements"
            heading="DORA and NIS2 Third-Party Requirements"
            lead="Both regulations require information on ICT third-party service providers and supply chain security. An access-based vendor register records the relationships and access these requirements reference."
          />
          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {regs.map((r, i) => (
              <RiseOnView as="li" key={r.name} delay={i * 0.08} className="flex flex-col rounded-3xl border border-ash-grey p-6 sm:p-8">
                <FileText weight="light" className="size-8" aria-hidden="true" />
                <p className="heading-4 mt-6">{r.name}</p>
                <p className="caption-1 mt-1 text-slate">{r.full}</p>
                <p className="body-3 mt-4 text-graphite">{r.body}</p>
                <a href={r.href} target="_blank" rel="noreferrer" className="link-arrow body-4 mt-auto pt-6">
                  View Regulation on EUR-Lex
                  <ArrowUpRight weight="bold" className="size-4" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </RiseOnView>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Module summary" className="page-x border-t border-ash-grey py-24">
        <InkParagraph as="h2" className="heading-3 sm:heading-2 lg:heading-1" text="Vendor tiers reflect current system and data access, and are reassessed whenever that access changes." />
      </section>

      <ModuleRelations mod={mod} />
      <Faq items={faq} />
      <CtaBand href="/walkthrough?interest=third-party-risk-management" secondary={{ href: "/platform/grc", label: "View Governance, Risk & Compliance" }} />
    </>
  );
}
