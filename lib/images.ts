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
