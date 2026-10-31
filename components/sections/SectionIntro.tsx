import { RiseOnView } from "@/components/RiseOnView";
import { WordReveal } from "@/components/WordReveal";

// The heading and lead paragraph that open a section. Headings rise word by word; the lead follows.
export function SectionIntro({
  heading,
  lead,
  muted,
  className = "",
  id,
}: {
  heading: string;
  /** Optional muted first phrase, rendered in slate before the heading proper. */
  muted?: string;
  lead?: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div className={className}>
      <WordReveal
        id={id}
        parts={muted ? [{ text: muted, className: "text-slate" }, { text: heading }] : heading}
        className="heading-4 sm:heading-3 lg:heading-2 max-w-[22ch]"
      />
      {lead ? (
        <RiseOnView delay={0.15}>
          <p className="body-7 mt-6 max-w-[60ch] text-graphite">{lead}</p>
        </RiseOnView>
      ) : null}
    </div>
  );
}
