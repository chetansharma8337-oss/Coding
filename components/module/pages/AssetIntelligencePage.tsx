import { ClockCounterClockwise, Cloud, Database, Desktop, FolderUser, Gauge, IdentificationBadge, MagnifyingGlass, Question, ShieldCheck, Table, UserCircle, WifiHigh } from "@phosphor-icons/react/dist/ssr";
import { InkParagraph } from "@/components/InkParagraph";
import { RiseOnView } from "@/components/RiseOnView";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { WordReveal } from "@/components/WordReveal";
import { moduleBySlug } from "@/lib/modules";
import { AssetCounts } from "../asset/AssetCounts";
import { AssetMerge } from "../asset/AssetMerge";
import { CoverageMatrix } from "../asset/CoverageMatrix";
import { CapabilityTabs } from "../CapabilityTabs";
import { ModuleHero } from "../ModuleHero";
import { ModuleRelations } from "../ModuleRelations";

const mod = moduleBySlug("asset-intelligence")!;

const reasons = [
  {
    title: "Each tool counts something different",
    body: "The scanner counts IP addresses it reached. The directory counts computer objects, including ones nobody has logged into for a year. The cloud console counts instances. Agents only count the devices they are installed on.",
  },
  {
    title: "The same asset goes by three names",
    body: "FIN-DB-02, fin-db-02 and fin-db-02.corp.local are one server. Without matching on stable identifiers, each spelling becomes its own row.",
  },
  {
    title: "Nobody owns the gaps",
    body: "A device that only a network scan has seen has no agent, no owner and no criticality. It is exactly the asset an attacker finds first.",
  },
];

const keys = ["Cloud instance ID", "Endpoint agent ID", "MAC address", "Serial number", "IP address within a time window", "Normalized hostname"];

const precedence = [
  { field: "Hostname", first: "Endpoint agent", then: "CMDB, then scanner", why: "The agent reads the name from the machine itself." },
  { field: "Operating system", first: "Endpoint agent", then: "Scanner", why: "Agents report the exact build; scanners infer the version." },
  { field: "Owner", first: "CMDB", then: "Cloud tag, then directory OU", why: "Ownership is a business decision, recorded where the business records it." },
  { field: "Criticality", first: "Manual override", then: "CMDB", why: "A person who knows the service can always overrule the default." },
  { field: "IP address", first: "Cloud account", then: "Scanner, then agent", why: "The cloud API is authoritative for cloud network interfaces." },
];

const sources = [
  { icon: MagnifyingGlass, name: "Vulnerability scanners", gives: "Hosts reached, open ports, detected software" },
  { icon: Cloud, name: "Cloud accounts", gives: "Instances, containers, tags, network interfaces" },
  { icon: Desktop, name: "Endpoint agents", gives: "Exact OS build, installed software, last check in" },
  { icon: FolderUser, name: "Directory and identity", gives: "Computer objects, organizational units, users" },
  { icon: Table, name: "CMDB and ITSM", gives: "Service names, owners, criticality, environments" },
  { icon: IdentificationBadge, name: "SaaS applications", gives: "Business apps in use and who administers them" },
  { icon: WifiHigh, name: "Network discovery", gives: "Devices nothing else knows about" },
];

const tabs = [
  {
    icon: <UserCircle weight="light" />,
    title: "Ownership",
    summary: "A named team on every record.",
    points: [
      "Owners come from the CMDB, cloud tags or directory, in the order you choose.",
      "Assets without an owner land in a triage queue instead of disappearing.",
      "Every finding downstream inherits the owner, so remediation starts with an assignment.",
    ],
  },
  {
    icon: <Gauge weight="light" />,
    title: "Business context",
    summary: "Criticality and environment that drive ranking.",
    points: [
      "Record criticality, environment and the service an asset supports.",
      "Threat Exposure Management weights every exposure by this criticality.",
      "Override any value by hand; the override is recorded with who made it.",
    ],
  },
  {
    icon: <Question weight="light" />,
    title: "Unknown assets",
    summary: "Devices only a network scan has seen.",
    points: [
      "Assets seen by discovery but by no agent, CMDB or cloud account are flagged.",
      "Each one is shown with the sources that did and did not see it.",
      "Assign an owner, or mark it retired, so the list goes down rather than up.",
    ],
  },
  {
    icon: <ClockCounterClockwise weight="light" />,
    title: "Record history",
    summary: "Which sources saw an asset, and when.",
    points: [
      "Every field shows the source it came from.",
      "See when each source last saw the asset, so stale records are obvious.",
      "Changes to owner and criticality are kept with a timestamp.",
    ],
  },
];

const faq = [
  {
    q: "Does Asset Intelligence replace our CMDB?",
    a: "No. It reads from your CMDB alongside your other sources, and shows where the CMDB disagrees with what scanners, agents and cloud accounts actually see. Many teams keep the CMDB as the place ownership is decided.",
  },
  {
    q: "Do we need to deploy new agents or scanners?",
    a: "No. Asset Intelligence reads from the scanners, cloud accounts, endpoint agents, directory and CMDB you already run.",
  },
  {
    q: "How does it decide two records are the same asset?",
    a: "Sightings are matched on stable identifiers such as cloud instance ID, agent ID, MAC address and serial number, with normalized hostnames and IP addresses as supporting evidence. When sources disagree on a field, field precedence decides, and the record shows which source won.",
  },
  {
    q: "How are owner and criticality assigned, and can we change them?",
    a: "They come from the sources you rank first for each field, usually the CMDB and cloud tags. Anyone with permission can override them by hand, and the override is kept with who made it and when.",
  },
  {
    q: "Will it find assets no tool knows about?",
    a: "Assets that only network discovery or a scanner has seen are flagged as unknown, with no owner and no agent. They are listed so someone can claim or retire them.",
  },
  {
    q: "What happens after an asset is in the inventory?",
    a: "Every other module reads the same record: exposures are ranked by its criticality, patches route to its owner, tests are scoped by it, vendors are linked to it and controls are tested against it.",
  },
  {
    q: "How long until we have a first inventory?",
    a: "It depends on how many sources you connect. The walkthrough starts by mapping the sources you run today, so you know before a pilot what the first inventory will cover.",
  },
];

export function AssetIntelligencePage() {
  return (
    <>
      <ModuleHero
        mod={mod}
        lines={["Every asset, once,", "with an owner."]}
        intro="Five tools give you five different asset counts. Asset Intelligence merges what they see into one record per asset, names the source of every field, and puts an owner on each one."
        visual={<AssetCounts />}
        secondary={{ href: "#merge", label: "See how records merge" }}
      />

      <section className="py-20 sm:py-24">
        <div className="page-x grid grid-cols-1 gap-12 lg:grid-cols-12">
          <SectionIntro className="lg:col-span-4" muted="The problem." heading="Why five tools give five answers" />
          <ol className="lg:col-span-8">
            {reasons.map((r, i) => (
              <RiseOnView as="li" key={r.title} delay={i * 0.08} className="grid gap-4 border-t border-ash-grey py-8 sm:grid-cols-[96px_1fr]">
                <span className="heading-3 text-ash-grey">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="heading-5">{r.title}</h3>
                  <p className="body-3 mt-2 max-w-[60ch] text-graphite">{r.body}</p>
                </div>
              </RiseOnView>
            ))}
          </ol>
        </div>
      </section>

      <section id="merge" className="border-t border-ash-grey bg-mist py-20 sm:py-24 lg:pb-0">
        <div className="page-x">
          <SectionIntro
            muted="How it works."
            heading="Five sightings become one record"
            lead="Scroll to watch the same server, seen five different ways, collapse into a single record that every module can trust."
          />
        </div>
        <div className="mt-12 lg:mt-0">
          <AssetMerge />
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="page-x">
          <SectionIntro
            muted="No black box."
            heading="Merge rules you can read"
            lead="Competing tools say they deduplicate. ASH-V shows how: the identifiers it matches on, and which source wins each field."
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-12">
            <RiseOnView className="rounded-3xl border border-ash-grey p-6 sm:p-8 lg:col-span-4">
              <h3 className="heading-6">Matched on</h3>
              <ul className="mt-6 flex flex-wrap gap-2">
                {keys.map((k) => (
                  <li key={k} className="body-5 rounded-full bg-mist px-3 py-2">
                    {k}
                  </li>
                ))}
              </ul>
              <p className="body-6 mt-6 text-graphite">Stable identifiers decide a match. Names and addresses support it, because both change.</p>
            </RiseOnView>
            <RiseOnView delay={0.1} className="overflow-x-auto rounded-3xl border border-ash-grey lg:col-span-8">
              <table className="w-full min-w-[620px] border-collapse text-left">
                <caption className="sr-only">Example field precedence</caption>
                <thead className="bg-mist">
                  <tr className="caption-3 text-slate">
                    <th scope="col" className="p-4 font-semibold sm:px-6">Field</th>
                    <th scope="col" className="p-4 font-semibold">Preferred source</th>
                    <th scope="col" className="p-4 font-semibold">Then</th>
                    <th scope="col" className="p-4 font-semibold sm:px-6">Why</th>
                  </tr>
                </thead>
                <tbody>
                  {precedence.map((r) => (
                    <tr key={r.field} className="border-t border-ash-grey align-top">
                      <th scope="row" className="body-4 p-4 sm:px-6">{r.field}</th>
                      <td className="body-6 p-4">{r.first}</td>
                      <td className="body-6 p-4 text-graphite">{r.then}</td>
                      <td className="body-6 p-4 text-graphite sm:px-6">{r.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="caption-2 border-t border-ash-grey p-4 text-slate sm:px-6">Example rules. Precedence is configurable per field.</p>
            </RiseOnView>
          </div>
        </div>
      </section>

      <section className="border-t border-ash-grey py-20 sm:py-24">
        <div className="page-x">
          <SectionIntro muted="Sources." heading="Built from the tools you already run" lead="No new agents. Each kind of source contributes what it knows best." />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sources.map((s, i) => (
              <RiseOnView as="li" key={s.name} delay={(i % 4) * 0.06} className="lift group rounded-3xl border border-ash-grey p-6 hover:border-ink">
                <s.icon weight="light" className="size-8 transition-transform duration-500 ease-[var(--ease-settle)] group-hover:scale-110" aria-hidden="true" />
                <h3 className="title-2 mt-6">{s.name}</h3>
                <p className="body-6 mt-2 text-graphite">{s.gives}</p>
              </RiseOnView>
            ))}
            <RiseOnView as="li" delay={0.18} navTone="dark" className="on-dark flex flex-col justify-between rounded-3xl bg-ink p-6 text-bone">
              <Database weight="light" className="size-8" aria-hidden="true" />
              <p className="title-2 mt-6">One record per asset, with the source of every field.</p>
            </RiseOnView>
          </ul>
        </div>
      </section>

      <section className="border-t border-ash-grey py-20 sm:py-24">
        <div className="page-x">
          <SectionIntro muted="On every record." heading="Context that makes an inventory useful" />
          <div className="mt-12">
            <CapabilityTabs items={tabs} label="Asset Intelligence capabilities" />
          </div>
        </div>
      </section>

      <section data-nav-tone="dark" className="on-dark bg-ink py-20 text-bone sm:py-24">
        <div className="page-x grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <WordReveal parts={[{ text: "Coverage gaps,", className: "text-ash-grey" }, { text: "drawn as gaps." }]} className="heading-4 sm:heading-3" />
            <p className="body-7 mt-6 text-ash-grey">
              Set the controls each type of asset must have. Asset Intelligence shows every asset that is missing one, so a
              server with no backup or a laptop no scanner reaches stands out instead of hiding in a list.
            </p>
            <ul className="mt-8 space-y-3">
              <li className="body-6 flex items-center gap-3">
                <span className="flex size-6 items-center justify-center rounded-full bg-bone text-ink">
                  <ShieldCheck weight="bold" className="size-3.5" aria-hidden="true" />
                </span>
                Covered
              </li>
              <li className="body-6 flex items-center gap-3">
                <span className="size-6 rounded-full border border-dashed border-bone/70" aria-hidden="true" />
                Missing
              </li>
            </ul>
          </div>
          <div className="lg:col-span-8">
            <CoverageMatrix />
          </div>
        </div>
      </section>

      <section aria-label="Why it matters" className="page-x py-24">
        <InkParagraph
          as="h2"
          className="heading-3 sm:heading-2 lg:heading-1"
          text="An inventory is only useful when someone is accountable for every line of it."
        />
      </section>

      <ModuleRelations mod={mod} />
      <Faq items={faq} heading="Questions about Asset Intelligence" />
      <CtaBand heading="Count your estate once." href="/walkthrough?interest=asset-intelligence" secondary={{ href: "/platform/threat-exposure-management", label: "Next: Threat Exposure Management" }} />
    </>
  );
}
