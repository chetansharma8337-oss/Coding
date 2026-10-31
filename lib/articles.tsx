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
    title: "Using the CISA KEV catalog to decide what to patch first",
    description:
      "What the Known Exploited Vulnerabilities catalog is, what changed with BOD 26-04, and how to combine it with reachability and asset criticality.",
    date: "2026-10-31",
    minutes: 6,
    topic: "Exposure management",
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
          A vulnerability scanner will happily report thousands of critical findings. Most will never be used against you.
          The CISA Known Exploited Vulnerabilities catalog, usually called KEV, is the most widely used public answer to a
          narrower question: which of these are attackers actually using?
        </p>
        <h2>What gets a CVE into the catalog</h2>
        <p>CISA adds a vulnerability only when three conditions hold:</p>
        <ul>
          <li>it has an assigned CVE ID,</li>
          <li>there is reliable evidence that it is being actively exploited, and</li>
          <li>there is clear remediation guidance, such as a vendor update.</li>
        </ul>
        <p>
          A public proof of concept is not enough on its own. That strictness is what makes the list useful: it held more
          than 1,700 entries in October 2026, a small fraction of all published CVEs. Since October 2023 each entry also
          says whether the vulnerability is known to be used in ransomware campaigns.
        </p>
        <h2>From <span className="whitespace-nowrap">BOD 22-01</span> to <span className="whitespace-nowrap">BOD 26-04</span></h2>
        <p>
          The catalog was created under Binding Operational Directive 22-01 in November 2021. For US federal civilian
          agencies it set default deadlines of two weeks for CVEs assigned from 2021 onward and six months for older ones.
        </p>
        <p>
          In June 2026 CISA revoked <span className="whitespace-nowrap">BOD 22-01</span> and issued <span className="whitespace-nowrap">BOD 26-04</span>, “Prioritizing Security Updates Based on Risk”. The
          catalog and its inclusion criteria remain, but deadlines now depend on risk: a vulnerability that is publicly
          exposed, automatable and gives an attacker total technical impact must be fixed within three days. If your
          remediation policy quotes the old two week default, it is worth revisiting.
        </p>
        <h2>A worked example: <span className="whitespace-nowrap">CVE-2024-21762</span></h2>
        <p>
          <span className="whitespace-nowrap">CVE-2024-21762</span> is an out of bounds write in the SSL VPN component of Fortinet FortiOS that lets a remote,
          unauthenticated attacker run code with crafted HTTP requests. NVD scores it 9.8. CISA added it to KEV on 9
          February 2024 with a federal due date one week later.
        </p>
        <p>
          It is also typical of where exploitation has moved. Verizon&apos;s 2025 Data Breach Investigations Report found
          vulnerability exploitation was the initial access vector in 20% of breaches, and that edge devices and VPNs made up
          22% of exploitation targets, up from 3% the year before. Only about 54% of those edge vulnerabilities were fully
          remediated, with a median of 32 days to do it.
        </p>
        <h2>KEV is a floor, not a ranking</h2>
        <p>KEV tells you a vulnerability is exploited somewhere. It does not tell you whether it matters here. Three more facts do:</p>
        <ul>
          <li>
            <strong>Reachability.</strong> A KEV entry on an internet facing VPN outranks the same entry on an isolated lab
            host.
          </li>
          <li>
            <strong>Asset criticality.</strong> The payment database matters more than the test box, and only your inventory
            knows which is which.
          </li>
          <li>
            <strong>Proof.</strong> If a test shows the exposure leads somewhere valuable, it goes to the top.
          </li>
        </ul>
        <p>
          For vulnerabilities that are not on the list yet, FIRST&apos;s Exploit Prediction Scoring System estimates the
          probability that a CVE will be exploited in the next 30 days, and is a useful second signal.
        </p>
        <h2>How ASH-V uses it</h2>
        <p>
          <Link href="/platform/threat-exposure-management">Threat Exposure Management</Link> flags KEV entries and scores
          each exposure against the asset it sits on, using reachability and the criticality recorded in{" "}
          <Link href="/platform/asset-intelligence">Asset Intelligence</Link>.{" "}
          <Link href="/platform/automated-penetration-testing">Automated Penetration Testing</Link> moves validated paths to
          the top, and <Link href="/platform/vulnerability-patch-management">Vulnerability &amp; Patch Management</Link> closes
          a finding only when a rescan confirms the fix.
        </p>
      </>
    ),
  },
  {
    slug: "continuous-threat-exposure-management",
    title: "What continuous threat exposure management looks like in practice",
    description:
      "The five stages of a CTEM program, what each one needs from your data, and why most programs stall at prioritization.",
    date: "2026-10-31",
    minutes: 5,
    topic: "Exposure management",
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
          Continuous threat exposure management, or CTEM, is a term Gartner introduced in 2022 for a program rather than a
          product: a repeating cycle that decides what to protect, finds what is exposed, and gets the important exposures
          fixed. In October 2023 Gartner predicted that by 2026, organizations prioritizing their security investments based
          on a CTEM program would realize a two thirds reduction in breaches.
        </p>
        <p>The cycle is commonly described in five stages.</p>
        <h2>1. Scoping</h2>
        <p>
          Decide which part of the business the cycle covers: external attack surface, a business unit, the SaaS estate.
          Scoping needs an inventory with owners and business context, or every later stage argues about what counts.
        </p>
        <h2>2. Discovery</h2>
        <p>
          Find assets and their exposures within scope: vulnerabilities, misconfigurations, over privileged identities. The
          hard part is not finding things, it is merging duplicate sightings from different tools into one record per asset.
        </p>
        <h2>3. Prioritization</h2>
        <p>
          Rank exposures by what an attacker could actually do with them. This is where most programs stall, because severity
          scores alone rate nearly everything as urgent. Useful inputs are known exploitation (such as the CISA KEV catalog),
          reachability, compensating controls and the criticality of the asset.
        </p>
        <h2>4. Validation</h2>
        <p>
          Confirm that a high ranked exposure is exploitable in your environment and see where it leads. Validation turns a
          theoretical risk into an attack path with evidence, which is what persuades another team to act.
        </p>
        <h2>5. Mobilization</h2>
        <p>
          Get the fix done: route the work to the owner, agree the deadline, and confirm the result. Mobilization fails when
          findings arrive without owners or close without verification.
        </p>
        <h2>The common thread is the asset record</h2>
        <p>
          Every stage reads from or writes to the same facts about an asset: who owns it, how critical it is, what can reach
          it, what is wrong with it and whether that has been fixed. When each stage runs in a different tool, a team spends
          its time reconciling instead of reducing exposure.
        </p>
        <p>In ASH-V the stages map onto modules that share one inventory:</p>
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
            flowing to <Link href="/platform/grc">GRC</Link>
          </li>
        </ul>
      </>
    ),
  },
  {
    slug: "one-control-many-frameworks",
    title: "One control, many frameworks: mapping vulnerability management",
    description:
      "How the same vulnerability management control appears in ISO/IEC 27001:2022, NIST CSF 2.0 and the CIS Controls, and what evidence satisfies all three.",
    date: "2026-10-31",
    minutes: 5,
    topic: "Governance and compliance",
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
          Ask three frameworks whether you manage vulnerabilities and you get three questions in three vocabularies. The
          underlying expectation is the same: know what you have, find what is wrong with it, fix the important things on
          time, and be able to show it.
        </p>
        <h2>The same requirement, three ways</h2>
        <ul>
          <li>
            <strong>ISO/IEC 27001:2022</strong> has 93 Annex A controls across four themes. Control <span className="whitespace-nowrap">A.8.8</span>, management of
            technical vulnerabilities, covers obtaining information about vulnerabilities, evaluating exposure and taking
            appropriate measures.
          </li>
          <li>
            <strong>NIST CSF 2.0</strong>, released in February 2024, organizes outcomes under six functions. <span className="whitespace-nowrap">ID.RA-01</span> asks
            that vulnerabilities in assets are identified, validated and recorded.
          </li>
          <li>
            <strong>CIS Controls v8.1</strong> has 18 Controls and 153 Safeguards. Control 7 is continuous vulnerability
            management, and Safeguard 7.7 is to remediate detected vulnerabilities.
          </li>
        </ul>
        <p>
          All three also depend on an asset inventory: ISO <span className="whitespace-nowrap">A.5.9</span>, CSF <span className="whitespace-nowrap">ID.AM-01</span> and CIS Safeguard 1.1. You cannot evidence
          remediation on assets you have not counted.
        </p>
        <h2>What evidence satisfies all three</h2>
        <p>An auditor for any of these frameworks is looking for the same artefacts:</p>
        <ul>
          <li>a current inventory, with owners;</li>
          <li>a documented way of ranking what to fix first;</li>
          <li>remediation records with dates, showing the fix was confirmed rather than assumed;</li>
          <li>approved, time limited exceptions for anything not fixed.</li>
        </ul>
        <p>
          NIST <span className="whitespace-nowrap">SP 800-40</span> Rev. 4, published in April 2022, is a useful companion here. It frames patching as preventive
          maintenance and recommends planning it around maintenance groups and phased rollouts, which also produces exactly
          the dated, staged records auditors ask for.
        </p>
        <h2>Map once, collect continuously</h2>
        <p>
          The expensive part of compliance is not the mapping, it is gathering the evidence each time. If the remediation
          record is written by the system that did the remediation, the evidence exists the moment the work is done.
        </p>
        <p>
          In ASH-V, <Link href="/platform/grc">GRC</Link> maps a control once to each framework. Verified closures from{" "}
          <Link href="/platform/vulnerability-patch-management">Vulnerability &amp; Patch Management</Link>, test results from{" "}
          <Link href="/platform/automated-penetration-testing">Automated Penetration Testing</Link> and exceptions with expiry
          dates attach to it as they happen. See the example mapping on the <Link href="/frameworks">frameworks page</Link>.
        </p>
      </>
    ),
  },
];

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
