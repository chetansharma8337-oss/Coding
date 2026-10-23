// Product UI is always shown inside a frame with a 22.5px top radius and a square bottom edge,
// so it reads as the product rising out of the photograph (DESIGN.md "Phone Preview Card").
export function ProductFrame({
  label,
  children,
  className = "",
  flat = false,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  /** Fully rounded and bordered, for frames that sit on a white page instead of overlapping a photo. */
  flat?: boolean;
}) {
  return (
    <figure
      className={`overflow-hidden bg-bone text-ink ${
        flat ? "rounded-[22.5px] border border-ash-grey" : "rounded-t-[22.5px]"
      } ${className}`}
    >
      <div className="flex items-center justify-between gap-4 border-b border-ash-grey px-4 py-3 sm:px-6">
        <span className="inline-flex items-center rounded-full bg-mist px-3 py-1 text-[13px] font-semibold">{label}</span>
        <figcaption className="text-right text-[12px] leading-tight text-slate">Illustrative interface, sample data</figcaption>
      </div>
      <div className="px-4 py-4 sm:px-6 sm:py-5">{children}</div>
    </figure>
  );
}
