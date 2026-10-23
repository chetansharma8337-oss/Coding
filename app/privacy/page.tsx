import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy notice" };

export default function Privacy() {
  return (
    <LegalPage title="Privacy notice">
      <p>
        The walkthrough form asks for your name, work email, company, security team size, the modules you are interested
        in and any notes you add. ASH-V uses these details to contact you about the walkthrough you requested.
      </p>
      <p>The final notice will set out retention periods, your rights and how to contact ASH-V about your data.</p>
    </LegalPage>
  );
}
