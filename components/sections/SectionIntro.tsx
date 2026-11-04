import { RiseOnView } from "@/components/RiseOnView";
import { WordReveal } from "@/components/WordReveal";

// Opens a section: an optional eyebrow label (the section's category, in Title Case), a Title Case heading, and a
// one or two sentence description. Headings rise word by word; the description follows.
export function SectionIntro({
  heading,
  lead,
  eyebrow,
  className = "",
  id,
  tone = "light",
}: {
  heading: string;
  eyebrow?: string;
  lead?: React.ReactNode;
  className?: string;
  id?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className={className}>
      {eyebrow ? <p className={`caption-3 mb-4 ${tone === "dark" ? "text-ash-grey" : "text-slate"}`}>{eyebrow}</p> : null}
      <WordReveal id={id} parts={heading} className="heading-4 sm:heading-3 lg:heading-2 max-w-[24ch]" />
      {lead ? (
        <RiseOnView delay={0.15}>
          <p className={`body-7 mt-6 max-w-[60ch] ${tone === "dark" ? "text-ash-grey" : "text-graphite"}`}>{lead}</p>
        </RiseOnView>
      ) : null}
    </div>
  );
}
