import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy Notice", alternates: { canonical: "/privacy" } };

export default function Privacy() {
  return (
    <LegalPage title="Privacy Notice">
      <p>
        The walkthrough request form collects full name, work email address, organization, security team size, modules of
        interest and any additional context provided. ASH-V uses this information only to schedule the requested
        walkthrough.
      </p>
      <p>The final notice will define retention periods, data subject rights and the contact for data protection enquiries.</p>
    </LegalPage>
  );
}
