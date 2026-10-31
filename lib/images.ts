import type { ModuleSlug } from "./modules";

// Photography from Unsplash and Pexels. Both licences allow free commercial use without attribution;
// sources are kept here so anyone can trace or replace an image. All are decorative, so they render with alt="".
export const photos = {
  heroEarth: "/images/hero-earth.jpg", // Unsplash photo-1451187580459-43490279c0fa (NASA)
  opsServerRoom: "/images/ops-server-room.jpg", // Pexels 1181354
  statementServers: "/images/statement-servers.jpg", // Pexels 1148820
  flowCircuit: "/images/flow-circuit.jpg", // Unsplash photo-1550751827-4bd374c3f58b
  teamScreen: "/images/team-screen.jpg", // Unsplash photo-1531482615713-2afd69097998
} as const;

// Each module page opens on its own photograph, chosen for what the module looks after.
export const moduleHero: Record<ModuleSlug, { src: string; position: string }> = {
  "asset-intelligence": { src: "/images/module-asset-intelligence.jpg", position: "50% 50%" }, // Pexels 325229, a data centre aisle
  "threat-exposure-management": { src: "/images/module-threat-exposure.jpg", position: "50% 50%" }, // Unsplash photo-1597733336794-12d05021d510, fibre-optic network
  "vulnerability-patch-management": { src: "/images/module-patching.jpg", position: "50% 50%" }, // Pexels 2881229, fibre patch panel
  "automated-penetration-testing": { src: "/images/module-pentesting.jpg", position: "50% 50%" }, // Pexels 5380642, targeting display
  "third-party-risk-management": { src: "/images/module-third-party.jpg", position: "50% 70%" }, // Unsplash photo-1486406146926-c627a92ad1ab, office towers
  grc: { src: "/images/module-grc.jpg", position: "50% 50%" }, // Unsplash photo-1450101499163-c8848c66ca85, signing documents
};

// Added for the solution, frameworks, resources, company and walkthrough pages (Pexels and Unsplash licences).
export const pagePhotos = {
  frameworks: { src: "/images/frameworks.jpg", position: "60% 70%" }, // Unsplash photo-1460574283810-2aab119d8511, stepped facade
  resources: { src: "/images/resources.jpg", position: "60% 45%" }, // Pexels 8085264, studying in a library
  company: { src: "/images/company.jpg", position: "40% 50%" }, // Pexels 7652180, team meeting
  walkthrough: { src: "/images/walkthrough.jpg", position: "45% 40%" }, // Pexels 6775115, three people at a laptop
  ogBase: "/images/og-base.jpg", // Pexels 17194838, fibre optic strands
} as const;
// Solution page photos, referenced from lib/solutions.ts:
// solution-ciso.jpg Pexels 8730850 · solution-secops.jpg Pexels 7534101 · solution-itops.jpg Pexels 19226354 ·
// solution-compliance.jpg Pexels 8297474
