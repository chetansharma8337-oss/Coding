// Facts below were checked against the publishers' own pages in October 2026; each entry lists its sources.
export type Framework = {
  name: string;
  publisher: string;
  facts: string[];
  sources: { label: string; href: string }[];
};

export const frameworks: Framework[] = [
  {
    name: "ISO/IEC 27001:2022",
    publisher: "ISO and IEC",
    facts: [
      "93 Annex A controls, grouped into four themes: organizational, people, physical and technological.",
      "Replaced the 2013 edition, which had 114 controls in 14 clauses. The transition period for certified organizations ended on 31 October 2025.",
    ],
    sources: [
      { label: "ISO/IEC 27001:2022, iso.org", href: "https://www.iso.org/standard/27001" },
      {
        label: "IAF MD 26, transition requirements",
        href: "https://iaf.nu/iaf_system/uploads/documents/IAF_MD_26_Transition_requirements_for_ISOIEC_27001-2022_09082022.pdf",
      },
    ],
  },
  {
    name: "NIST Cybersecurity Framework 2.0",
    publisher: "NIST",
    facts: [
      "Released on 26 February 2024, with six functions: Govern, Identify, Protect, Detect, Respond and Recover.",
      "Govern is new in 2.0, and the framework now addresses organizations in every sector rather than critical infrastructure alone.",
    ],
    sources: [
      {
        label: "NIST releases version 2.0",
        href: "https://www.nist.gov/news-events/news/2024/02/nist-releases-version-20-landmark-cybersecurity-framework",
      },
      { label: "NIST CSWP 29", href: "https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf" },
    ],
  },
  {
    name: "CIS Critical Security Controls v8.1",
    publisher: "Center for Internet Security",
    facts: [
      "Released on 25 June 2024: 18 Controls and 153 Safeguards.",
      "Safeguards fall into three Implementation Groups. IG1, the baseline every organization should meet, has 56.",
    ],
    sources: [
      {
        label: "CIS Controls v8.1 release",
        href: "https://www.cisecurity.org/about-us/media/press-release/center-for-internet-security-releases-cis-controls-v8-1-with-new-governance-recommendations",
      },
      { label: "Implementation Group 1", href: "https://www.cisecurity.org/controls/implementation-groups/ig1" },
    ],
  },
  {
    name: "CISA Known Exploited Vulnerabilities catalog",
    publisher: "CISA",
    facts: [
      "A list of CVEs with reliable evidence of active exploitation and clear remediation guidance. It held more than 1,700 entries in October 2026.",
      "Created under Binding Operational Directive 22-01 in November 2021. BOD 26-04, issued in June 2026, replaced it with risk-based timelines and retained the catalog.",
    ],
    sources: [
      { label: "KEV catalog", href: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog" },
      { label: "BOD 26-04", href: "https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk" },
    ],
  },
];

// An example of one control mapped across frameworks. Control IDs are the publishers' own; the ASH-V control
// names and the evidence column are illustrative.
export const mappingExample = [
  {
    control: "AM-02 Asset Inventory and Ownership",
    iso: "A.5.9",
    csf: "ID.AM-01",
    cis: "1.1",
    evidence: "Asset Intelligence",
  },
  {
    control: "VM-01 Remediate Known Exploited Vulnerabilities",
    iso: "A.8.8",
    csf: "ID.RA-01",
    cis: "7.7",
    evidence: "Vulnerability & Patch Management, Automated Penetration Testing",
  },
  {
    control: "SR-04 Vendor Review by Access Level",
    iso: "A.5.19",
    csf: "GV.SC",
    cis: "15",
    evidence: "Third-Party Risk Management",
  },
];
