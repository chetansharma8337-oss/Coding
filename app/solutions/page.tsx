import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { SolutionCards } from "@/components/sections/SolutionCards";
import { photos } from "@/lib/images";

export const metadata: Metadata = {
  title: "Solutions by Role",
  description: "Role-specific ASH-V solutions for security leadership, security operations, IT operations and GRC teams.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero src={photos.teamScreen} lines={["Solutions by Role"]}>
        <p className="body-7 sm:body-8 mt-6 text-bone/90">
          ASH-V provides role-specific views for security leadership, security operations, IT operations and GRC teams, all
          based on the same asset record.
        </p>
      </PageHero>
      <section className="py-20 sm:py-24">
        <div className="page-x">
          <SolutionCards />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
