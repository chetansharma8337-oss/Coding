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
  { tier: "Tier 1", who: "Privileged access, or access to regulated data", asks: ["Full security questionnaire", "SOC 2 Type II report or ISO/IEC 27001 certificate", "Annual review with the internal owner", "Findings tracked to resolution"] },
  { tier: "Tier 2", who: "SaaS or API access to internal data", asks: ["Standard security questionnaire", "A current certificate or report, if one exists", "Review every two years"] },
  { tier: "Tier 3", who: "No access to your systems or data", asks: ["Short attestation at onboarding", "Review when the contract renews"] },
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
    q: "How is a vendor's tier decided?",
    a: "By what the vendor can reach in your estate, linked to the assets in your inventory, and the sensitivity of the data behind it. You decide which combinations map to which tier.",
  },
  {
    q: "What happens when a vendor's access changes?",
    a: "Its tier is worked out again from the new access, and if it moves up, a deeper review is requested. A vendor given an API key does not stay in the tier it had at onboarding.",
  },
  {
    q: "Do we still send questionnaires?",
    a: "Yes, but the depth follows the tier. Vendors with privileged access or regulated data get the full set; vendors with no access get a short attestation.",
  },
  {
    q: "Can a vendor send an existing SOC 2 report or certificate instead?",
    a: "Yes. Reports and certificates are collected as evidence on the vendor record, with their expiry dates tracked.",
  },
  {
    q: "Does this replace a security ratings service?",
    a: "No. Ratings score a vendor from the outside. ASH-V tiers a vendor by what it can reach on the inside. Many teams use both.",
  },
  {
    q: "Who deals with a vendor's findings?",
    a: "Each finding is assigned to an internal owner, usually whoever owns the relationship, and tracked to resolution like any other finding.",
  },
  {
    q: "Where do vendor managed assets show up?",
    a: "In the asset inventory, marked with the vendor that manages them, so exposures on those assets are ranked and routed like any other.",
  },
];

export function ThirdPartyPage() {
  return (
    <>
      <ModuleHero
        mod={mod}
        lines={["Know what your", "vendors can reach."]}
        intro="Third-Party Risk Management tiers each vendor by the systems and data it can actually reach in your estate, sets the depth of review by that tier, and keeps the evidence current."
        visual={<VendorRecord />}
        secondary={{ href: "#matrix", label: "See tiering by access" }}
      />

      <section className="py-20 sm:py-24">
        <div className="page-x grid grid-cols-1 items-end gap-12 lg:grid-cols-12">
          <RiseOnView className="lg:col-span-6">
            <p className="numeral-1">
              <CountUp value={30} suffix="%" />
            </p>
            <p className="body-8 mt-6 max-w-[34ch]">of breaches involved a third party in 2025, double the share a year earlier.</p>
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
              muted="The problem."
              heading="Tiers set from guesses go stale"
              lead="Most programs tier vendors from an intake form or an outside score. Neither says what the vendor can reach today, and nobody revisits the tier when a vendor is quietly given more access."
            />
          </div>
        </div>
      </section>

      <section id="matrix" data-nav-tone="dark" className="on-dark bg-ink py-20 text-bone sm:py-24">
        <div className="page-x">
          <WordReveal parts={[{ text: "Tier by access,", className: "text-ash-grey" }, { text: "not by questionnaire." }]} className="heading-4 sm:heading-3 lg:heading-2 max-w-[22ch]" />
          <p className="body-7 mt-6 max-w-[60ch] text-ash-grey">
            Each vendor sits where its real access and the sensitivity of its data meet. Watch what happens when one of them
            is given an API key.
          </p>
          <div className="mt-12">
            <AccessMatrix />
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="page-x">
          <SectionIntro
            muted="Review depth."
            heading="Ask for what the tier needs, not everything from everyone"
            lead="Vendors with little access stop receiving three hundred question questionnaires, and the ones that matter get a proper review."
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
          <p className="caption-2 mt-4 text-slate">Illustrative review requirements. You set what each tier asks for.</p>
        </div>
      </section>

      <section className="border-t border-ash-grey py-20 sm:py-24">
        <div className="page-x grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionIntro
              muted="Evidence."
              heading="Know before a certificate lapses"
              lead="Reports, certificates and questionnaires are kept on the vendor record with their expiry dates. Renewals are requested ahead of time, not discovered when a customer asks."
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
            { icon: UserCircle, t: "Findings with an internal owner", b: "A vendor issue is assigned to whoever owns the relationship and tracked to resolution, not left in a spreadsheet tab." },
            { icon: Buildings, t: "Vendor managed assets in the inventory", b: "Servers and services a vendor runs for you appear in the asset inventory, so their exposures are ranked like any other." },
            { icon: ClipboardText, t: "Evidence for supplier controls", b: "Reviews, reports and findings attach to your supplier controls in GRC as they are collected." },
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
            muted="Regulation."
            heading="What European regulators now ask for"
            lead="Both laws expect you to know your suppliers and what they can reach. A register that starts from access holds exactly that information."
          />
          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {regs.map((r, i) => (
              <RiseOnView as="li" key={r.name} delay={i * 0.08} className="flex flex-col rounded-3xl border border-ash-grey p-6 sm:p-8">
                <FileText weight="light" className="size-8" aria-hidden="true" />
                <p className="heading-4 mt-6">{r.name}</p>
                <p className="caption-1 mt-1 text-slate">{r.full}</p>
                <p className="body-3 mt-4 text-graphite">{r.body}</p>
                <a href={r.href} target="_blank" rel="noreferrer" className="link-arrow body-4 mt-auto pt-6">
                  Read the text on EUR-Lex
                  <ArrowUpRight weight="bold" className="size-4" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </RiseOnView>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="The principle" className="page-x border-t border-ash-grey py-24">
        <InkParagraph as="h2" className="heading-3 sm:heading-2 lg:heading-1" text="A vendor's risk is what it can reach, so start the review there." />
      </section>

      <ModuleRelations mod={mod} />
      <Faq items={faq} heading="Questions about Third-Party Risk Management" />
      <CtaBand heading="Tier your vendors by what they can reach." href="/walkthrough?interest=third-party-risk-management" secondary={{ href: "/platform/grc", label: "Next: GRC" }} />
    </>
  );
}
