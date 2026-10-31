import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Terms of use" };

export default function Terms() {
  return (
    <LegalPage title="Terms of use">
      <p>These terms will cover use of this website. Product terms are agreed separately with each customer.</p>
    </LegalPage>
  );
}
