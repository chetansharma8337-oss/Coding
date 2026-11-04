import Link from "next/link";

export type Article = {
  slug: string;
  title: string;
  description: string;
  /** ISO date the article was last reviewed against its sources. */
  date: string;
  minutes: number;
  topic: string;
  image: string;
  Body: () => React.ReactNode;
  sources: { label: string; href: string }[];
};

// Long-form guides. Every figure is attributed to its publisher, and the source list sits under each article.
export const articles: Article[] = [
  {
    slug: "kev-catalog-patch-priority",
    title: "Prioritizing Remediation with the CISA KEV Catalog",
    description:
      "The scope of the CISA Known Exploited Vulnerabilities catalog, the transition from BOD 22-01 to BOD 26-04, and its use alongside reachability and asset criticality.",
    date: "2026-10-31",
    minutes: 6,
    topic: "Exposure Management",
    image: "/images/module-patching.jpg",
    sources: [
      { label: "CISA, Known Exploited Vulnerabilities catalog", href: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog" },
      {
        label: "CISA, BOD 22-01 (revoked)",
        href: "https://www.cisa.gov/news-events/directives/bod-22-01-reducing-significant-risk-known-exploited-vulnerabilities-revoked",
      },
      {
        label: "CISA, BOD 26-04: Prioritizing Security Updates Based on Risk",
        href: "https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk",
      },
      {
        label: "CISA, ransomware field added to KEV (October 2023)",
        href: "https://www.cisa.gov/news-events/alerts/2023/10/12/cisa-releases-new-resources-identifying-known-exploited-vulnerabilities-and-misconfigurations-linked",
      },
      { label: "Fortinet PSIRT, FG-IR-24-015", href: "https://www.fortiguard.com/psirt/FG-IR-24-015" },
      { label: "NVD, CVE-2024-21762", href: "https://nvd.nist.gov/vuln/detail/CVE-2024-21762" },
      { label: "Verizon, 2025 Data Breach Investigations Report", href: "https://www.verizon.com/business/resources/reports/2025-dbir-data-breach-investigations-report.pdf" },
      { label: "FIRST, Exploit Prediction Scoring System", href: "https://www.first.org/epss/" },
    ],
    Body: () => (
      <>
        <p>
          Vulnerability scanners routinely report thousands of critical findings, most of which are never exploited. The
          CISA Known Exploited Vulnerabilities (KEV) catalog is the most widely used public reference for vulnerabilities
          with evidence of active exploitation.
        </p>
        <h2>Catalog Inclusion Criteria</h2>
        <p>CISA adds a vulnerability to the catalog only when three criteria are met:</p>
        <ul>
          <li>an assigned CVE ID;</li>
          <li>reliable evidence of active exploitation;</li>
          <li>clear remediation guidance, such as a vendor update.</li>
        </ul>
        <p>
          A public proof of concept alone does not qualify. These criteria keep the catalog focused: it contained more than
          1,700 entries in October 2026, a small fraction of all published CVEs. Since October 2023, each entry has also
          indicated whether the vulnerability is known to be used in ransomware campaigns.
        </p>
        <h2>Transition from <span className="whitespace-nowrap">BOD 22-01</span> to <span className="whitespace-nowrap">BOD 26-04</span></h2>
        <p>
          The catalog was established under Binding Operational Directive 22-01 in November 2021. For US federal civilian
          agencies, the directive set default remediation deadlines of two weeks for CVEs assigned from 2021 onward and six
          months for earlier CVEs.
        </p>
        <p>
          In June 2026, CISA revoked <span className="whitespace-nowrap">BOD 22-01</span> and issued <span className="whitespace-nowrap">BOD 26-04</span>, “Prioritizing Security Updates Based on Risk”. The catalog and its
          inclusion criteria remain in place, but deadlines are now risk-based: a vulnerability that is publicly exposed,
          automatable and gives an attacker total technical impact must be remediated within three days. Remediation
          policies that reference the previous two-week default should be reviewed.
        </p>
        <h2>Example: <span className="whitespace-nowrap">CVE-2024-21762</span></h2>
        <p>
          <span className="whitespace-nowrap">CVE-2024-21762</span> is an out-of-bounds write in the SSL VPN component of Fortinet FortiOS that allows a remote, unauthenticated
          attacker to execute code through crafted HTTP requests. NVD assigns it a CVSS score of 9.8. CISA added it to the
          KEV catalog on 9 February 2024 with a federal due date one week later.
        </p>
        <p>
          The vulnerability also reflects a broader shift in exploitation activity. The Verizon 2025 Data Breach
          Investigations Report found that vulnerability exploitation was the initial access vector in 20% of breaches, and
          that edge devices and VPNs accounted for 22% of exploitation targets, up from 3% the previous year. Approximately
          54% of those edge device vulnerabilities were fully remediated, with a median remediation time of 32 days.
        </p>
        <h2>KEV as a Baseline, Not a Ranking</h2>
        <p>
          A KEV listing confirms that a vulnerability is exploited, but not whether it is significant in a specific
          environment. Three additional factors determine priority:
        </p>
        <ul>
          <li>
            <strong>Reachability.</strong> A KEV-listed vulnerability on an internet-facing VPN takes priority over the same
            vulnerability on an isolated test system.
          </li>
          <li>
            <strong>Asset criticality.</strong> A payment database warrants higher priority than a test system. Asset
            criticality is recorded in the asset inventory.
          </li>
          <li>
            <strong>Validation.</strong> A finding confirmed by testing as part of an attack path to a high-criticality asset
            takes the highest priority.
          </li>
        </ul>
        <p>
          For vulnerabilities not yet in the catalog, the FIRST Exploit Prediction Scoring System (EPSS) estimates the
          probability that a CVE will be exploited in the next 30 days and provides a useful secondary signal.
        </p>
        <h2>Application in ASH-V</h2>
        <p>
          <Link href="/platform/threat-exposure-management">Threat Exposure Management</Link> flags KEV-listed findings and
          ranks each finding using reachability and the asset criticality recorded in{" "}
          <Link href="/platform/asset-intelligence">Asset Intelligence</Link>.{" "}
          <Link href="/platform/automated-penetration-testing">Automated Penetration Testing</Link> raises findings on
          validated attack paths to the top of the Exposure Queue, and{" "}
          <Link href="/platform/vulnerability-patch-management">Vulnerability &amp; Patch Management</Link> closes a finding
          only after a verification scan confirms the fix.
        </p>
      </>
    ),
  },
  {
    slug: "continuous-threat-exposure-management",
    title: "Implementing Continuous Threat Exposure Management",
    description:
      "The five stages of a continuous threat exposure management program, the data each stage requires and common implementation challenges.",
    date: "2026-10-31",
    minutes: 5,
    topic: "Exposure Management",
    image: "/images/module-threat-exposure.jpg",
    sources: [
      {
        label: "Gartner, top strategic technology trends for 2024 (October 2023)",
        href: "https://www.gartner.com/en/newsroom/press-releases/2023-10-16-gartner-identifies-the-top-10-strategic-technology-trends-for-2024",
      },
      {
        label: "Gartner, top cybersecurity trends for 2024 (February 2024)",
        href: "https://www.gartner.com/en/newsroom/press-releases/2024-02-22-gartner-identifies-top-cybersecurity-trends-for-2024",
      },
      { label: "IBM, What is CTEM?", href: "https://www.ibm.com/topics/ctem" },
    ],
    Body: () => (
      <>
        <p>
          Continuous threat exposure management (CTEM) is a term Gartner introduced in 2022 for a program rather than a
          product: a repeating cycle that defines what to protect, identifies exposures and drives remediation of the most
          significant ones. In October 2023, Gartner predicted that by 2026, organizations prioritizing their security
          investments based on a CTEM program would realize a two-thirds reduction in breaches.
        </p>
        <p>The cycle is commonly described in five stages.</p>
        <h2>1. Scoping</h2>
        <p>
          Define the part of the business the cycle covers, such as the external attack surface, a business unit or the
          SaaS estate. Scoping requires an asset inventory with asset owners and business context; without it, later stages
          lack an agreed scope.
        </p>
        <h2>2. Discovery</h2>
        <p>
          Identify assets and their exposures within scope: vulnerabilities, misconfigurations and identities with
          excessive privileges. The principal challenge is consolidating duplicate records from different data sources into
          one asset record per asset.
        </p>
        <h2>3. Prioritization</h2>
        <p>
          Rank exposures by their potential for exploitation and impact. Many programs stall at this stage because severity
          scores alone rate most findings as urgent. Relevant inputs include known exploitation (such as the CISA KEV
          catalog), reachability, compensating controls and asset criticality.
        </p>
        <h2>4. Validation</h2>
        <p>
          Confirm that a high-priority exposure is exploitable in your environment and identify the resulting attack path.
          Validation provides evidence that supports remediation requests to other teams.
        </p>
        <h2>5. Mobilization</h2>
        <p>
          Complete remediation: assign the work to the asset owner, agree the due date and verify the result. Mobilization
          fails when findings lack asset owners or are closed without verification.
        </p>
        <h2>The Asset Record as a Common Foundation</h2>
        <p>
          Every stage reads from or writes to the same information about an asset: its owner, its criticality, its
          reachability, its findings and their remediation status. When each stage runs in a separate tool, effort is spent
          on reconciliation rather than exposure reduction.
        </p>
        <p>In ASH-V, each stage corresponds to a module that uses the shared asset inventory:</p>
        <ul>
          <li>
            <strong>Scoping and discovery:</strong> <Link href="/platform/asset-intelligence">Asset Intelligence</Link>
          </li>
          <li>
            <strong>Prioritization:</strong> <Link href="/platform/threat-exposure-management">Threat Exposure Management</Link>
          </li>
          <li>
            <strong>Validation:</strong> <Link href="/platform/automated-penetration-testing">Automated Penetration Testing</Link>
          </li>
          <li>
            <strong>Mobilization:</strong>{" "}
            <Link href="/platform/vulnerability-patch-management">Vulnerability &amp; Patch Management</Link>, with evidence
            records provided to <Link href="/platform/grc">GRC</Link>
          </li>
        </ul>
      </>
    ),
  },
  {
    slug: "one-control-many-frameworks",
    title: "Cross-Framework Mapping for Vulnerability Management",
    description:
      "How vulnerability management requirements in ISO/IEC 27001:2022, NIST CSF 2.0 and the CIS Controls align, and the evidence that satisfies each.",
    date: "2026-10-31",
    minutes: 5,
    topic: "Governance, Risk and Compliance",
    image: "/images/frameworks.jpg",
    sources: [
      { label: "ISO, ISO/IEC 27001:2022", href: "https://www.iso.org/standard/27001" },
      {
        label: "NIST, Cybersecurity Framework 2.0",
        href: "https://www.nist.gov/news-events/news/2024/02/nist-releases-version-20-landmark-cybersecurity-framework",
      },
      { label: "CIS, Critical Security Controls list", href: "https://www.cisecurity.org/controls/cis-controls-list" },
      { label: "NIST SP 800-40 Rev. 4", href: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-40r4.pdf" },
    ],
    Body: () => (
      <>
        <p>
          ISO/IEC 27001, NIST CSF and the CIS Controls each address vulnerability management in their own terms. The
          underlying expectation is consistent: maintain an asset inventory, identify vulnerabilities, remediate significant
          vulnerabilities within defined timelines and retain evidence of each step.
        </p>
        <h2>Equivalent Requirements Across Frameworks</h2>
        <ul>
          <li>
            <strong>ISO/IEC 27001:2022</strong> contains 93 Annex A controls across four themes. Control <span className="whitespace-nowrap">A.8.8</span>, Management of
            technical vulnerabilities, covers obtaining information about vulnerabilities, evaluating exposure and taking
            appropriate measures.
          </li>
          <li>
            <strong>NIST CSF 2.0</strong>, released in February 2024, organizes outcomes under six functions. <span className="whitespace-nowrap">ID.RA-01</span> states:
            “Vulnerabilities in assets are identified, validated, and recorded.”
          </li>
          <li>
            <strong>CIS Controls v8.1</strong> contains 18 Controls and 153 Safeguards. Control 7 is Continuous Vulnerability
            Management, and Safeguard 7.7 is Remediate Detected Vulnerabilities.
          </li>
        </ul>
        <p>
          All three frameworks also require an asset inventory: ISO <span className="whitespace-nowrap">A.5.9</span>, CSF <span className="whitespace-nowrap">ID.AM-01</span> and CIS Safeguard 1.1. Remediation cannot be
          evidenced for assets that are not inventoried.
        </p>
        <h2>Evidence Requirements</h2>
        <p>Auditors for each of these frameworks typically request the same evidence:</p>
        <ul>
          <li>a current asset inventory with asset owners;</li>
          <li>a documented prioritization method;</li>
          <li>dated remediation records showing verified closure;</li>
          <li>approved, time-limited risk exceptions for unremediated findings.</li>
        </ul>
        <p>
          NIST <span className="whitespace-nowrap">SP 800-40</span> Rev. 4, published in April 2022, is a relevant reference. It describes patching as preventive maintenance
          and recommends planning around maintenance groups and phased rollouts, which produces the dated, staged records
          auditors request.
        </p>
        <h2>Single Mapping, Continuous Evidence Collection</h2>
        <p>
          The principal cost of compliance is not the mapping but repeated evidence collection. When the system that
          performs remediation also records it, the evidence exists as soon as the work is complete.
        </p>
        <p>
          In ASH-V, <Link href="/platform/grc">GRC</Link> maps each control once to every applicable framework requirement.
          Verified closures from <Link href="/platform/vulnerability-patch-management">Vulnerability &amp; Patch Management</Link>,
          test results from <Link href="/platform/automated-penetration-testing">Automated Penetration Testing</Link> and risk
          exceptions with expiry dates are attached as evidence records when they are produced. An example mapping is
          available on the <Link href="/frameworks">Frameworks page</Link>.
        </p>
      </>
    ),
  },
];

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
