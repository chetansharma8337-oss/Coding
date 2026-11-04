import type { ModuleSlug } from "@/lib/modules";

// Coded stand-ins for product screenshots. Hostnames, teams and vendors are sample values;
// the CVE IDs are real, public entries in the CISA Known Exploited Vulnerabilities catalog.
// State is shown with text and border weight, never hue, per DESIGN.md.

function Tag({ children, strong = false }: { children: React.ReactNode; strong?: boolean }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2 py-0.5 caption-6 ${
        strong ? "bg-ink text-bone" : "border border-slate text-graphite"
      }`}
    >
      {children}
    </span>
  );
}

function Head({ cols, className }: { cols: string[]; className: string }) {
  return (
    <div className={`caption-3 hidden border-b border-ash-grey pb-2 text-slate sm:grid ${className}`} aria-hidden="true">
      {cols.map((c) => (
        <span key={c}>{c}</span>
      ))}
    </div>
  );
}

export function ExposurePreview({ compact = false }: { compact?: boolean }) {
  const rows = [
    { cve: "CVE-2024-3400", product: "PAN-OS GlobalProtect", asset: "vpn-gw-01", reach: "Internet", owner: "Network" },
    { cve: "CVE-2024-21762", product: "FortiOS SSL VPN", asset: "edge-fw-02", reach: "Internet", owner: "Network" },
    { cve: "CVE-2023-4966", product: "NetScaler Gateway", asset: "citrix-ext-01", reach: "Internet", owner: "End user" },
    { cve: "CVE-2023-34362", product: "MOVEit Transfer", asset: "mft-prod-01", reach: "Partner VPN", owner: "Integration" },
    { cve: "CVE-2021-44228", product: "Apache Log4j", asset: "billing-api-04", reach: "Internal", owner: "Payments" },
  ];
  const grid = "sm:grid-cols-[28px_1.3fr_1fr_0.8fr_0.7fr] gap-x-4";
  return (
    <div>
      <Head cols={["Rank", "Finding", "Asset", "Reachability", "Asset Owner"]} className={grid} />
      <ol>
        {rows.map((r, i) => (
          <li
            key={r.cve}
            className={`grid grid-cols-[28px_1fr] items-center gap-y-1 border-b border-ash-grey/70 py-3 last:border-0 ${grid} ${
              compact && i >= 3 ? "max-sm:hidden" : ""
            }`}
          >
            <span className="caption-6 text-slate">{i + 1}</span>
            <span className="min-w-0">
              <span className="block body-4">{r.cve}</span>
              <span className="block truncate caption-5 text-graphite">
                {r.product} <span className="ml-1 caption-6 text-ink">KEV</span>
              </span>
            </span>
            <span className="col-start-2 font-mono caption-5 text-graphite sm:col-start-auto">{r.asset}</span>
            <span className="col-start-2 sm:col-start-auto">
              <Tag strong={r.reach === "Internet"}>{r.reach}</Tag>
            </span>
            <span className="col-start-2 caption-5 text-graphite sm:col-start-auto">{r.owner}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function AssetPreview() {
  const rows = [
    { host: "billing-api-04", kind: "Container workload", sources: ["Cloud", "Scanner", "EDR"], owner: "Payments" },
    { host: "fin-db-02", kind: "Database server", sources: ["CMDB", "Scanner"], owner: "Finance IT" },
    { host: "mft-prod-01", kind: "Virtual machine", sources: ["Cloud", "Scanner", "EDR", "CMDB"], owner: "Integration" },
    { host: "laptop-ops-118", kind: "Endpoint", sources: ["EDR", "Directory"], owner: "Operations" },
    { host: "legacy-ftp-01", kind: "Virtual machine", sources: ["Network scan"], owner: "No owner" },
  ];
  const grid = "sm:grid-cols-[1.1fr_1fr_1.4fr_0.8fr] gap-x-4";
  return (
    <div>
      <Head cols={["Asset", "Asset Type", "Data Sources", "Asset Owner"]} className={grid} />
      <ul>
        {rows.map((r) => (
          <li key={r.host} className={`grid items-center gap-y-2 border-b border-ash-grey/70 py-3 last:border-0 ${grid}`}>
            <span className="font-mono caption-6">{r.host}</span>
            <span className="caption-5 text-graphite">{r.kind}</span>
            <span className="flex flex-wrap gap-1">
              {r.sources.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </span>
            <span className={`caption-5 ${r.owner === "No owner" ? "font-semibold text-ink" : "text-graphite"}`}>
              {r.owner === "No owner" ? "Unassigned: Pending Triage" : r.owner}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PatchPreview() {
  const rings = [
    { name: "Ring 0: IT Pilot", state: "Completed", detail: "Verification scan passed on all pilot devices", done: 1 },
    { name: "Ring 1: Early Adopters", state: "Completed", detail: "Verification scan passed", done: 1 },
    { name: "Ring 2: Workstations", state: "In Progress", detail: "Deploying in the 22:00 maintenance window", done: 0.55 },
    { name: "Ring 3: Servers", state: "Scheduled", detail: "Pending change approval from the Payments asset owner", done: 0 },
  ];
  return (
    <div>
      <p className="body-6 text-graphite">
        Patch deployment for <span className="font-semibold text-ink">CVE-2021-44228</span> · Asset Owner: Payments
      </p>
      <ol className="mt-4 space-y-3">
        {rings.map((r) => (
          <li key={r.name} className="rounded-xl border border-ash-grey p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="body-4">{r.name}</span>
              <Tag strong={r.state === "In Progress"}>{r.state}</Tag>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-mist" aria-hidden="true">
              <div className="h-full rounded-full bg-ink" style={{ width: `${r.done * 100}%` }} />
            </div>
            <p className="mt-2 caption-5 text-graphite">{r.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function PentestPreview() {
  const steps = [
    { where: "Internet", how: "Entry point" },
    { where: "edge-fw-02", how: "CVE-2024-21762 on the SSL VPN" },
    { where: "jump-host-03", how: "Local admin password reused from the firewall host" },
    { where: "fin-db-02", how: "Read access to the finance schema" },
  ];
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="body-4">Validated Attack Path to fin-db-02</p>
        <Tag strong>Validated</Tag>
      </div>
      <ol className="relative mt-4 space-y-0">
        {steps.map((s, i) => (
          <li key={s.where} className="relative flex gap-4 pb-4 last:pb-0">
            <span className="flex flex-col items-center" aria-hidden="true">
              <span
                className={`flex size-7 items-center justify-center rounded-full caption-6 ${
                  i === steps.length - 1 ? "bg-ink text-bone" : "border-2 border-ink bg-bone"
                }`}
              >
                {i + 1}
              </span>
              {i < steps.length - 1 ? <span className="mt-1 w-px flex-1 bg-ash-grey" /> : null}
            </span>
            <span className="pt-0.5">
              <span className="block font-mono caption-6">{s.where}</span>
              <span className="block caption-5 text-graphite">{s.how}</span>
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-4 border-t border-ash-grey pt-3 caption-5 text-graphite">
        Step 2 finding raised to priority rank 2 in the Exposure Queue. Retest scheduled after remediation.
      </p>
    </div>
  );
}

export function VendorPreview() {
  const rows = [
    { vendor: "Payroll Provider", access: "Employee PII", tier: "Tier 1", status: "Expiring" },
    { vendor: "Managed SOC Provider", access: "Administrator access to EDR console", tier: "Tier 1", status: "Current" },
    { vendor: "Marketing Analytics Provider", access: "Website visitor data", tier: "Tier 2", status: "Requested" },
    { vendor: "Facilities Services Provider", access: "Read-only access to badge system", tier: "Tier 3", status: "Current" },
  ];
  const grid = "sm:grid-cols-[1.1fr_1.2fr_0.5fr_1.1fr] gap-x-4";
  return (
    <div>
      <Head cols={["Vendor", "Access", "Vendor Tier", "Vendor Evidence"]} className={grid} />
      <ul>
        {rows.map((r) => (
          <li key={r.vendor} className={`grid items-center gap-y-1 border-b border-ash-grey/70 py-3 last:border-0 ${grid}`}>
            <span className="body-4">{r.vendor}</span>
            <span className="caption-5 text-graphite">{r.access}</span>
            <span>
              <Tag strong={r.tier === "Tier 1"}>{r.tier}</Tag>
            </span>
            <span
              className={`caption-5 ${r.status === "Current" ? "text-graphite" : "font-semibold text-ink"}`}
            >
              {r.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function GrcPreview() {
  const maps = [
    { fw: "ISO/IEC 27001:2022", ref: "A.8.8 Management of technical vulnerabilities" },
    { fw: "NIST CSF 2.0", ref: "ID.RA-01 Vulnerabilities in assets are identified, validated, and recorded" },
    { fw: "CIS Controls v8.1", ref: "Control 7 Continuous Vulnerability Management" },
  ];
  const evidence = [
    { item: "Verified closures, last 90 days", from: "Vulnerability & Patch Management" },
    { item: "Attack path retest results", from: "Automated Penetration Testing" },
    { item: "Asset scope snapshot", from: "Asset Intelligence" },
  ];
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="body-4">VM-01 Remediate Known Exploited Vulnerabilities</p>
        <Tag>Control Owner: Security Operations</Tag>
      </div>
      <p className="caption-3 mt-4 text-slate">Mapped Requirements</p>
      <ul className="mt-2 space-y-2">
        {maps.map((m) => (
          <li key={m.fw} className="caption-5 text-graphite">
            <span className="font-semibold text-ink">{m.fw}</span> {m.ref}
          </li>
        ))}
      </ul>
      <p className="caption-3 mt-4 text-slate">Evidence Records</p>
      <ul className="mt-2 divide-y divide-ash-grey/70 rounded-xl bg-mist px-3">
        {evidence.map((e) => (
          <li key={e.item} className="flex flex-col gap-0.5 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <span className="caption-6">{e.item}</span>
            <span className="caption-5 text-graphite">Source: {e.from}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const previewFor: Record<ModuleSlug, { label: string; Component: (props: { compact?: boolean }) => React.JSX.Element }> = {
  "asset-intelligence": { label: "Asset Inventory", Component: AssetPreview },
  "threat-exposure-management": { label: "Exposure Queue", Component: ExposurePreview },
  "vulnerability-patch-management": { label: "Patch Deployment", Component: PatchPreview },
  "automated-penetration-testing": { label: "Validated Attack Path", Component: PentestPreview },
  "third-party-risk-management": { label: "Vendor Register", Component: VendorPreview },
  grc: { label: "Control Evidence", Component: GrcPreview },
};
