import type { ModuleSlug } from "@/lib/modules";

// Coded stand-ins for product screenshots. Hostnames, teams and vendors are sample values;
// the CVE IDs are real, public entries in the CISA Known Exploited Vulnerabilities catalog.
// State is shown with text and border weight, never hue, per DESIGN.md.

function Tag({ children, strong = false }: { children: React.ReactNode; strong?: boolean }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${
        strong ? "bg-ink text-bone" : "border border-slate text-graphite"
      }`}
    >
      {children}
    </span>
  );
}

function Head({ cols, className }: { cols: string[]; className: string }) {
  return (
    <div className={`micro-label hidden border-b border-ash-grey pb-2 text-slate sm:grid ${className}`} aria-hidden="true">
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
    { cve: "CVE-2023-4966", product: "NetScaler Gateway", asset: "citrix-ext-01", reach: "Internet", owner: "End-user" },
    { cve: "CVE-2023-34362", product: "MOVEit Transfer", asset: "mft-prod-01", reach: "Partner VPN", owner: "Integration" },
    { cve: "CVE-2021-44228", product: "Apache Log4j", asset: "billing-api-04", reach: "Internal", owner: "Payments" },
  ];
  const grid = "sm:grid-cols-[28px_1.3fr_1fr_0.8fr_0.7fr] gap-x-4";
  return (
    <div>
      <Head cols={["#", "Exposure", "Asset", "Reachable from", "Owner"]} className={grid} />
      <ol>
        {rows.map((r, i) => (
          <li
            key={r.cve}
            className={`grid grid-cols-[28px_1fr] items-center gap-y-1 border-b border-ash-grey/70 py-3 last:border-0 ${grid} ${
              compact && i >= 3 ? "max-sm:hidden" : ""
            }`}
          >
            <span className="text-[13px] font-semibold text-slate">{i + 1}</span>
            <span className="min-w-0">
              <span className="block text-[14px] font-semibold">{r.cve}</span>
              <span className="block truncate text-[13px] text-graphite">
                {r.product} <span className="ml-1 text-[12px] font-semibold text-ink">KEV</span>
              </span>
            </span>
            <span className="col-start-2 font-mono text-[13px] text-graphite sm:col-start-auto">{r.asset}</span>
            <span className="col-start-2 sm:col-start-auto">
              <Tag strong={r.reach === "Internet"}>{r.reach}</Tag>
            </span>
            <span className="col-start-2 text-[13px] text-graphite sm:col-start-auto">{r.owner}</span>
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
      <Head cols={["Asset", "Type", "Seen by", "Owner"]} className={grid} />
      <ul>
        {rows.map((r) => (
          <li key={r.host} className={`grid items-center gap-y-1.5 border-b border-ash-grey/70 py-3 last:border-0 ${grid}`}>
            <span className="font-mono text-[13px] font-semibold">{r.host}</span>
            <span className="text-[13px] text-graphite">{r.kind}</span>
            <span className="flex flex-wrap gap-1">
              {r.sources.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </span>
            <span className={`text-[13px] ${r.owner === "No owner" ? "font-semibold text-ink" : "text-graphite"}`}>
              {r.owner === "No owner" ? "No owner, needs triage" : r.owner}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PatchPreview() {
  const rings = [
    { name: "Ring 0, IT pilot", state: "Complete", detail: "Rescan confirmed on all pilot devices", done: 1 },
    { name: "Ring 1, early adopters", state: "Complete", detail: "Rescan confirmed", done: 1 },
    { name: "Ring 2, broad workstations", state: "Rolling out", detail: "Deploying in the 22:00 maintenance window", done: 0.55 },
    { name: "Ring 3, servers", state: "Held", detail: "Waiting on change approval from Payments", done: 0 },
  ];
  return (
    <div>
      <p className="text-[14px] text-graphite">
        Patch bundle for <span className="font-semibold text-ink">CVE-2021-44228</span>, owner Payments
      </p>
      <ol className="mt-4 space-y-3">
        {rings.map((r) => (
          <li key={r.name} className="rounded-[12px] border border-ash-grey p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[14px] font-semibold">{r.name}</span>
              <Tag strong={r.state === "Rolling out"}>{r.state}</Tag>
            </div>
            <div className="mt-2.5 h-1.5 rounded-full bg-mist" aria-hidden="true">
              <div className="h-full rounded-full bg-ink" style={{ width: `${r.done * 100}%` }} />
            </div>
            <p className="mt-2 text-[13px] text-graphite">{r.detail}</p>
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
        <p className="text-[14px] font-semibold">Validated path to fin-db-02</p>
        <Tag strong>Path works</Tag>
      </div>
      <ol className="relative mt-4 space-y-0">
        {steps.map((s, i) => (
          <li key={s.where} className="relative flex gap-4 pb-4 last:pb-0">
            <span className="flex flex-col items-center" aria-hidden="true">
              <span
                className={`flex size-7 items-center justify-center rounded-full text-[12px] font-semibold ${
                  i === steps.length - 1 ? "bg-ink text-bone" : "border-2 border-ink bg-bone"
                }`}
              >
                {i + 1}
              </span>
              {i < steps.length - 1 ? <span className="mt-1 w-px flex-1 bg-ash-grey" /> : null}
            </span>
            <span className="pt-0.5">
              <span className="block font-mono text-[13px] font-semibold">{s.where}</span>
              <span className="block text-[13px] text-graphite">{s.how}</span>
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-4 border-t border-ash-grey pt-3 text-[13px] text-graphite">
        Step 2 sent to the exposure queue as rank 2. Retest scheduled after the fix.
      </p>
    </div>
  );
}

export function VendorPreview() {
  const rows = [
    { vendor: "Payroll provider", access: "Employee PII", tier: "Tier 1", status: "Report expires in 3 weeks" },
    { vendor: "Managed SOC partner", access: "Admin to EDR console", tier: "Tier 1", status: "Assessment current" },
    { vendor: "Marketing analytics", access: "Website visitor data", tier: "Tier 2", status: "Questionnaire overdue" },
    { vendor: "Facilities services", access: "Badge system, read only", tier: "Tier 3", status: "Assessment current" },
  ];
  const grid = "sm:grid-cols-[1.1fr_1.2fr_0.5fr_1.1fr] gap-x-4";
  return (
    <div>
      <Head cols={["Vendor", "Can reach", "Tier", "Evidence"]} className={grid} />
      <ul>
        {rows.map((r) => (
          <li key={r.vendor} className={`grid items-center gap-y-1 border-b border-ash-grey/70 py-3 last:border-0 ${grid}`}>
            <span className="text-[14px] font-semibold">{r.vendor}</span>
            <span className="text-[13px] text-graphite">{r.access}</span>
            <span>
              <Tag strong={r.tier === "Tier 1"}>{r.tier}</Tag>
            </span>
            <span
              className={`text-[13px] ${r.status === "Assessment current" ? "text-graphite" : "font-semibold text-ink"}`}
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
    { fw: "NIST CSF 2.0", ref: "ID.RA-01 Vulnerabilities in assets are identified" },
    { fw: "CIS Controls v8", ref: "Control 7, Continuous Vulnerability Management" },
  ];
  const evidence = [
    { item: "Remediation records, last 90 days", from: "Vulnerability & Patch Management" },
    { item: "Attack path retest results", from: "Automated Penetration Testing" },
    { item: "Asset scope snapshot", from: "Asset Intelligence" },
  ];
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[14px] font-semibold">Control VM-01: Remediate known exploited vulnerabilities</p>
        <Tag>Owner: Security Ops</Tag>
      </div>
      <p className="micro-label mt-4 text-slate">Mapped to</p>
      <ul className="mt-2 space-y-1.5">
        {maps.map((m) => (
          <li key={m.fw} className="text-[13px] text-graphite">
            <span className="font-semibold text-ink">{m.fw}</span> {m.ref}
          </li>
        ))}
      </ul>
      <p className="micro-label mt-4 text-slate">Evidence attached</p>
      <ul className="mt-2 divide-y divide-ash-grey/70 rounded-[12px] bg-mist px-3">
        {evidence.map((e) => (
          <li key={e.item} className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <span className="text-[13px] font-semibold">{e.item}</span>
            <span className="text-[12px] text-graphite">from {e.from}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const previewFor: Record<ModuleSlug, { label: string; Component: (props: { compact?: boolean }) => React.JSX.Element }> = {
  "asset-intelligence": { label: "Asset inventory", Component: AssetPreview },
  "threat-exposure-management": { label: "Exposure queue", Component: ExposurePreview },
  "vulnerability-patch-management": { label: "Patch rollout", Component: PatchPreview },
  "automated-penetration-testing": { label: "Attack path", Component: PentestPreview },
  "third-party-risk-management": { label: "Vendor register", Component: VendorPreview },
  grc: { label: "Control evidence", Component: GrcPreview },
};
