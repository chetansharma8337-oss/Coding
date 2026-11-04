import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Terms of Use", alternates: { canonical: "/terms" } };

export default function Terms() {
  return (
    <LegalPage title="Terms of Use">
      <p>These terms will govern use of this website. Product terms are agreed separately with each customer.</p>
    </LegalPage>
  );
}
