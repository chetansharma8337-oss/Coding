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
  { stage: "Finding to owner", usually: "A spreadsheet of CVEs goes to IT, and someone spends a day working out who runs each host.", ashv: "The owner comes from the asset record, so the finding arrives already assigned." },
  { stage: "Patch to production", usually: "The patch goes everywhere at once, breaks a line of business application, and patching stops for a month.", ashv: "Rings start with a pilot group, and a failed health check holds the next ring automatically." },
  { stage: "Done to fixed", usually: "The ticket closes when someone marks it done. The next scan finds the same vulnerability.", ashv: "The finding closes only when a rescan or agent check confirms the vulnerability is gone." },
];

const policy = [
  { when: "On CISA KEV and internet facing", due: "7 days" },
  { when: "On CISA KEV", due: "14 days" },
  { when: "Critical, on a high criticality asset", due: "30 days" },
  { when: "Everything else", due: "90 days" },
];

const stillVulnerable = [
  { icon: ArrowsCounterClockwise, title: "Reboot pending", body: "The update installed, but the vulnerable code is still loaded until the machine restarts." },
  { icon: Copy, title: "A second copy", body: "The patched version sits beside an old copy of the same library that another application bundles." },
  { icon: HardDrives, title: "Rebuilt from an old image", body: "A server was reimaged from a template that predates the patch." },
  { icon: Package, title: "The wrong package", body: "The update covered one edition of the product, and this host runs another." },
];

const faq = [
  {
    q: "What happens if a patch breaks something?",
    a: "Rollouts start with a pilot ring. When a health check fails, the next ring is held automatically and the owning team is told, while the due date keeps counting so the delay stays visible.",
  },
  {
    q: "When does a finding close?",
    a: "Only when a rescan or agent check confirms the vulnerability is gone. A successful install is recorded, but it does not close the finding on its own.",
  },
  {
    q: "Who decides the due date?",
    a: "Your remediation policy, applied to the facts on the record: whether the vulnerability is on the CISA KEV list, whether the asset is internet facing, and how critical the asset is.",
  },
  {
    q: "Can we defer a patch?",
    a: "Yes, with an exception that names an approver, a reason, any compensating control and an end date. When it expires, the finding comes back for review.",
  },
  {
    q: "Do patches respect maintenance windows?",
    a: "Rings are scheduled into the maintenance windows you set for each group of assets, so installs and restarts happen when the owning team expects them.",
  },
  {
    q: "How does this show up in an audit?",
    a: "Every verified closure, with its dates and the scan that confirmed it, attaches to your vulnerability management control in GRC. Exceptions attach too, with their approver and expiry.",
  },
];

export function VulnPatchPage() {
  return (
    <>
      <ModuleHero
        mod={mod}
        lines={["Fixed means", "verified."]}
        intro="Every finding arrives with an owner and a due date, rolls out in rings that pause when something breaks, and closes only when a rescan proves the vulnerability is gone."
        visual={<RoutingCard />}
        secondary={{ href: "#rings", label: "Watch a rollout" }}
      />

      <section className="py-20 sm:py-24">
        <div className="page-x">
          <SectionIntro muted="The problem." heading="Three handoffs where fixes get lost" />
          <RiseOnView className="mt-12 overflow-x-auto rounded-3xl border border-ash-grey">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <caption className="sr-only">Where remediation usually fails, and what ASH-V does instead</caption>
              <thead className="bg-mist">
                <tr className="caption-3 text-slate">
                  <th scope="col" className="w-[20%] p-4 font-semibold sm:px-6">Handoff</th>
                  <th scope="col" className="w-[40%] p-4 font-semibold">What usually happens</th>
                  <th scope="col" className="w-[40%] bg-ink p-4 font-semibold text-bone sm:px-6">In ASH-V</th>
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
              muted="Routing."
              heading="An owner and a deadline on every finding"
              lead="The owner comes from the asset record. The due date comes from your policy, applied to the facts ASH-V already holds: exploitation, exposure and criticality."
            />
            <p className="body-6 mt-6 flex items-center gap-2 text-graphite">
              <UserCircle weight="light" className="size-5" aria-hidden="true" />
              No owner? The finding waits in a triage queue instead of a void.
            </p>
          </div>
          <RiseOnView delay={0.1} className="rounded-3xl bg-mist p-6 sm:p-8 lg:col-span-7">
            <p className="caption-3 text-slate">Example remediation policy</p>
            <ul className="mt-6 space-y-2">
              {policy.map((p, i) => (
                <RiseOnView as="li" key={p.when} delay={0.15 + i * 0.08} className="flex items-center justify-between gap-4 rounded-2xl bg-bone p-4">
                  <span className="body-5">{p.when}</span>
                  <span className={`caption-6 shrink-0 rounded-full px-3 py-1 ${i === 0 ? "bg-ink text-bone" : "border border-ink"}`}>{p.due}</span>
                </RiseOnView>
              ))}
            </ul>
            <p className="caption-2 mt-4 text-slate">Illustrative. You set the conditions and the timelines.</p>
          </RiseOnView>
        </div>
      </section>

      <section id="rings" data-nav-tone="dark" className="on-dark bg-ink py-20 text-bone sm:py-24">
        <div className="page-x">
          <WordReveal parts={[{ text: "Rings, a pause, a rescan.", className: "text-ash-grey" }, { text: "Then it counts as fixed." }]} className="heading-4 sm:heading-3 lg:heading-2 max-w-[22ch]" />
          <p className="body-7 mt-6 max-w-[60ch] text-ash-grey">
            Follow one patch across 62 devices. It plays on its own, or step through it.
          </p>
          <div className="mt-12">
            <RingTrack />
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="page-x">
          <SectionIntro
            muted="Installed is not fixed."
            heading="Why a successful install can leave you exposed"
            lead="Deployment tools report that the update ran. Only a rescan or agent check can say the vulnerability is gone. These are the usual reasons the two disagree."
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
            <p className="heading-5 max-w-[36ch]">So a finding closes only when the vulnerability is confirmed gone.</p>
            <p className="body-6 max-w-[40ch] text-ash-grey">Installed but still vulnerable devices are re-queued automatically, with the reason.</p>
          </RiseOnView>
        </div>
      </section>

      <section className="border-t border-ash-grey bg-mist py-20 sm:py-24">
        <div className="page-x grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionIntro
              muted="Exceptions."
              heading="Accept a risk, with an end date"
              lead="Some patches cannot go out on time. An exception records who accepted the risk, why, what protects the asset meanwhile, and when the decision expires."
            />
          </div>
          <RiseOnView delay={0.1} className="lg:col-span-7">
            <div className="rounded-3xl bg-bone p-6 shadow-[0_24px_48px_-32px_rgb(0_0_0/0.35)] sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="caption-6 font-mono">EX-0193</p>
                <p className="caption-6 rounded-full border border-ink px-3 py-1">Approved, expires 31 Jan 2027</p>
              </div>
              <dl className="mt-6 divide-y divide-ash-grey">
                {[
                  ["Finding", "CVE-2023-34362 on mft-prod-01"],
                  ["Reason", "Vendor upgrade needs a partner cutover in January"],
                  ["Compensating control", "Inbound access limited to two partner IP ranges"],
                  ["Approved by", "Head of Integration"],
                ].map(([k, v]) => (
                  <div key={k} className="grid gap-1 py-3 sm:grid-cols-[180px_1fr]">
                    <dt className="caption-2 text-slate">{k}</dt>
                    <dd className="body-5">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-mist p-4">
                <CalendarX weight="light" className="size-6 shrink-0" aria-hidden="true" />
                <p className="body-6 text-graphite">On 31 January the finding reopens and the approver is asked again.</p>
              </div>
              <p className="caption-5 mt-4 text-slate">Illustrative, sample data</p>
            </div>
          </RiseOnView>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="page-x grid grid-cols-1 gap-4 md:grid-cols-2">
          <RiseOnView className="flex flex-col rounded-3xl border border-ash-grey p-6 sm:p-8">
            <Seal weight="light" className="size-8" aria-hidden="true" />
            <h2 className="heading-5 mt-6">Every closure is audit evidence</h2>
            <p className="body-3 mt-2 text-graphite">
              Verified closures attach to your vulnerability management control in GRC as they happen, with the dates and the
              scan that confirmed each one. Exceptions attach with their approver and expiry.
            </p>
          </RiseOnView>
          <RiseOnView delay={0.1} className="flex flex-col rounded-3xl bg-mist p-6 sm:p-8">
            <p className="caption-3 text-slate">Public guidance</p>
            <h2 className="heading-5 mt-4">Built the way NIST describes patching</h2>
            <p className="body-3 mt-2 text-graphite">
              NIST SP 800-40 Rev. 4 frames patching as preventive maintenance, planned around groups of assets and phased
              rollouts. Rings and maintenance windows follow the same idea.
            </p>
            <a
              href="https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-40r4.pdf"
              target="_blank"
              rel="noreferrer"
              className="link-arrow body-4 mt-auto pt-4"
            >
              Read NIST SP 800-40 Rev. 4
              <ArrowUpRight weight="bold" className="size-4" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </RiseOnView>
        </div>
      </section>

      <section aria-label="The principle" className="page-x border-t border-ash-grey py-24">
        <InkParagraph as="h2" className="heading-3 sm:heading-2 lg:heading-1" text="Patched is a claim. Verified is a fact." />
      </section>

      <ModuleRelations mod={mod} />
      <Faq items={faq} heading="Questions about Vulnerability & Patch Management" />
      <CtaBand heading="Close findings that stay closed." href="/walkthrough?interest=vulnerability-patch-management" secondary={{ href: "/platform/automated-penetration-testing", label: "Next: Automated Penetration Testing" }} />
    </>
  );
}
