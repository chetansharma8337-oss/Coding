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
    title: "Different Counting Methods",
    body: "Scanners count reachable IP addresses, the directory counts computer objects including inactive ones, cloud consoles count instances, and endpoint agents count only managed devices.",
  },
  {
    title: "Inconsistent Asset Naming",
    body: "FIN-DB-02, fin-db-02 and fin-db-02.corp.local refer to one server. Without matching on stable identifiers, each name becomes a separate record.",
  },
  {
    title: "Unmanaged Assets Without Owners",
    body: "An asset detected only by network discovery has no endpoint agent, asset owner or asset criticality, and is frequently the first asset an attacker identifies.",
  },
];

const keys = ["Cloud instance ID", "Endpoint agent ID", "MAC address", "Serial number", "IP address within a time window", "Normalized hostname"];

const precedence = [
  { field: "Hostname", first: "Endpoint agent", then: "CMDB, scanner", why: "The endpoint agent reports the hostname from the operating system." },
  { field: "Operating System", first: "Endpoint agent", then: "Scanner", why: "Endpoint agents report the exact build; scanners infer the version." },
  { field: "Asset Owner", first: "CMDB", then: "Cloud tag, directory OU", why: "Ownership is assigned in the CMDB as the system of record." },
  { field: "Asset Criticality", first: "Manual override", then: "CMDB", why: "An override by an authorized user takes precedence over imported values." },
  { field: "IP Address", first: "Cloud account", then: "Scanner, endpoint agent", why: "The cloud API is authoritative for cloud network interfaces." },
];

const sources = [
  { icon: MagnifyingGlass, name: "Vulnerability Scanners", gives: "Reachable hosts, open ports and detected software" },
  { icon: Cloud, name: "Cloud Accounts", gives: "Instances, containers, tags and network interfaces" },
  { icon: Desktop, name: "Endpoint Agents", gives: "Exact operating system build, installed software and last check-in" },
  { icon: FolderUser, name: "Directory and Identity", gives: "Computer objects, organizational units and users" },
  { icon: Table, name: "CMDB and ITSM", gives: "Business services, asset owners, asset criticality and environments" },
  { icon: IdentificationBadge, name: "SaaS Applications", gives: "Business applications in use and their administrators" },
  { icon: WifiHigh, name: "Network Discovery", gives: "Devices not reported by any other data source" },
];

const tabs = [
  {
    icon: <UserCircle weight="light" />,
    title: "Asset Ownership",
    summary: "An accountable asset owner on every asset record.",
    points: [
      "Asset owners are imported from the CMDB, cloud tags or the directory, in a configurable order of precedence.",
      "Assets without an asset owner are routed to a triage queue.",
      "Every finding inherits the asset owner, so remediation begins with an assignment.",
    ],
  },
  {
    icon: <Gauge weight="light" />,
    title: "Asset Criticality",
    summary: "Business context used for prioritization.",
    points: [
      "Asset criticality, environment and the supported business service are recorded on each asset record.",
      "Threat Exposure Management weights every finding by asset criticality.",
      "Manual overrides are recorded with the user and timestamp.",
    ],
  },
  {
    icon: <Question weight="light" />,
    title: "Unmanaged Assets",
    summary: "Assets reported only by network discovery.",
    points: [
      "Assets reported by network discovery but not by an endpoint agent, the CMDB or a cloud account are flagged as unmanaged.",
      "Each unmanaged asset lists the data sources that did and did not report it.",
      "Each unmanaged asset is assigned an asset owner or marked as retired.",
    ],
  },
  {
    icon: <ClockCounterClockwise weight="light" />,
    title: "Record History",
    summary: "Data sources and last-seen dates for each asset.",
    points: [
      "Every field identifies the data source that provided it.",
      "The last-seen date from each data source identifies outdated records.",
      "Changes to asset owner and asset criticality are retained with a timestamp.",
    ],
  },
];

const faq = [
  {
    q: "Does Asset Intelligence replace the CMDB?",
    a: "No. The CMDB is one of the data sources consolidated into the asset inventory. Discrepancies between the CMDB and other data sources are identified on each asset record.",
  },
  {
    q: "Are additional agents or scanners required?",
    a: "No. Asset Intelligence uses the scanners, cloud accounts, endpoint agents, directory and CMDB already in use.",
  },
  {
    q: "How are records for the same asset matched?",
    a: "Records are matched on stable identifiers such as cloud instance ID, endpoint agent ID, MAC address and serial number, with normalized hostnames and IP addresses as supporting attributes. Conflicting values are resolved by field precedence, and the asset record shows the data source of each value.",
  },
  {
    q: "How are asset owner and asset criticality assigned?",
    a: "Both are imported from the data sources ranked first for each field, typically the CMDB and cloud tags. Authorized users can override either value, and each override is recorded with the user and timestamp.",
  },
  {
    q: "How are unmanaged assets identified?",
    a: "Assets reported only by network discovery or a scanner, with no endpoint agent or asset owner, are flagged as unmanaged and routed for triage.",
  },
  {
    q: "How do other modules use the asset inventory?",
    a: "Findings are prioritized by asset criticality, remediation tasks are assigned to the asset owner, test scope is defined against the inventory, vendors are linked to the assets they access, and controls are tested against the asset scope.",
  },
  {
    q: "How long does the initial inventory take to build?",
    a: "This depends on the number of data sources connected. The platform walkthrough identifies the data sources in use and the expected coverage of the initial inventory.",
  },
];

export function AssetIntelligencePage() {
  return (
    <>
      <ModuleHero
        mod={mod}
        lines={["Consolidated Asset Inventory", "with Ownership"]}
        intro="Asset Intelligence consolidates scanners, cloud accounts, endpoint agents, the directory and the CMDB into one asset record per asset. Each record identifies the data source of every field and an accountable asset owner."
        visual={<AssetCounts />}
        secondary={{ href: "#merge", label: "View Record Consolidation" }}
      />

      <section className="py-20 sm:py-24">
        <div className="page-x grid grid-cols-1 gap-12 lg:grid-cols-12">
          <SectionIntro className="lg:col-span-4" eyebrow="Challenge" heading="Inconsistent Asset Data Across Data Sources" />
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
            eyebrow="Record Consolidation"
            heading="Asset Record Consolidation"
            lead="Records for the same server from five data sources are matched on stable identifiers and consolidated into a single asset record used by every module."
          />
        </div>
        <div className="mt-12 lg:mt-0">
          <AssetMerge />
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="page-x">
          <SectionIntro
            eyebrow="Matching and Precedence"
            heading="Record Matching and Field Precedence"
            lead="Records are matched on stable identifiers, and conflicting field values are resolved by a configurable precedence order for each field."
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-12">
            <RiseOnView className="rounded-3xl border border-ash-grey p-6 sm:p-8 lg:col-span-4">
              <h3 className="heading-6">Matching Identifiers</h3>
              <ul className="mt-6 flex flex-wrap gap-2">
                {keys.map((k) => (
                  <li key={k} className="body-5 rounded-full bg-mist px-3 py-2">
                    {k}
                  </li>
                ))}
              </ul>
              <p className="body-6 mt-6 text-graphite">Stable identifiers determine a match. Hostnames and IP addresses are supporting attributes because both can change.</p>
            </RiseOnView>
            <RiseOnView delay={0.1} className="overflow-x-auto rounded-3xl border border-ash-grey lg:col-span-8">
              <table className="w-full min-w-[620px] border-collapse text-left">
                <caption className="sr-only">Example field precedence configuration</caption>
                <thead className="bg-mist">
                  <tr className="caption-3 text-slate">
                    <th scope="col" className="p-4 font-semibold sm:px-6">Field</th>
                    <th scope="col" className="p-4 font-semibold">Primary Data Source</th>
                    <th scope="col" className="p-4 font-semibold">Fallback Order</th>
                    <th scope="col" className="p-4 font-semibold sm:px-6">Rationale</th>
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
              <p className="caption-2 border-t border-ash-grey p-4 text-slate sm:px-6">Example configuration. Precedence is configurable for each field.</p>
            </RiseOnView>
          </div>
        </div>
      </section>

      <section className="border-t border-ash-grey py-20 sm:py-24">
        <div className="page-x">
          <SectionIntro eyebrow="Data Sources" heading="Supported Data Source Types" lead="Asset Intelligence uses existing data sources. No additional agents are required." />
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
              <p className="title-2 mt-6">One asset record per asset, with the data source of every field.</p>
            </RiseOnView>
          </ul>
        </div>
      </section>

      <section className="border-t border-ash-grey py-20 sm:py-24">
        <div className="page-x">
          <SectionIntro eyebrow="Asset Context" heading="Ownership, Criticality and Record History" />
          <div className="mt-12">
            <CapabilityTabs items={tabs} label="Asset Intelligence capabilities" />
          </div>
        </div>
      </section>

      <section data-nav-tone="dark" className="on-dark bg-ink py-20 text-bone sm:py-24">
        <div className="page-x grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <WordReveal parts="Coverage Gap Analysis" className="heading-4 sm:heading-3" />
            <p className="body-7 mt-6 text-ash-grey">
              Required controls are defined for each asset type. Assets missing a required control are identified as coverage
              gaps.
            </p>
            <ul className="mt-8 space-y-3">
              <li className="body-6 flex items-center gap-3">
                <span className="flex size-6 items-center justify-center rounded-full bg-bone text-ink">
                  <ShieldCheck weight="bold" className="size-3.5" aria-hidden="true" />
                </span>
                Control Present
              </li>
              <li className="body-6 flex items-center gap-3">
                <span className="size-6 rounded-full border border-dashed border-bone/70" aria-hidden="true" />
                Coverage Gap
              </li>
            </ul>
          </div>
          <div className="lg:col-span-8">
            <CoverageMatrix />
          </div>
        </div>
      </section>

      <section aria-label="Module summary" className="page-x py-24">
        <InkParagraph
          as="h2"
          className="heading-3 sm:heading-2 lg:heading-1"
          text="Every asset record carries an accountable asset owner, an asset criticality and the data source of each field."
        />
      </section>

      <ModuleRelations mod={mod} />
      <Faq items={faq} />
      <CtaBand href="/walkthrough?interest=asset-intelligence" secondary={{ href: "/platform/threat-exposure-management", label: "View Threat Exposure Management" }} />
    </>
  );
}
