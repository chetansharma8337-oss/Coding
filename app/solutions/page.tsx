import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { SolutionCards } from "@/components/sections/SolutionCards";
import { photos } from "@/lib/images";

export const metadata: Metadata = {
  title: "Solutions by team",
  description: "How CISOs, security operations, IT operations and GRC teams use ASH-V from the same asset record.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero src={photos.teamScreen} lines={["One record,", "four ways of working."]}>
        <p className="body-7 sm:body-8 mt-6 text-bone/90">
          Leaders see risk by business impact. Analysts see a ranked queue. IT sees only the assets it owns. Audit sees
          evidence. Pick your team to see what changes.
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
