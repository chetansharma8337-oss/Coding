// Product UI is always shown inside a frame with a 22.5px top radius and a square bottom edge,
// so it reads as the product rising out of the photograph (DESIGN.md "Phone Preview Card").
export function ProductFrame({
  label,
  children,
  className = "",
  flat = false,
  elevated = false,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  /** Fully rounded and bordered, for frames that sit on a white page instead of overlapping a photo. */
  flat?: boolean;
  /** Floating over imagery: a deep, soft shadow so the large surface reads as lifted off what is behind it. */
  elevated?: boolean;
}) {
  return (
    <figure data-nav-tone="light"
      className={`overflow-hidden bg-bone text-ink ${
        flat ? "rounded-3xl border border-ash-grey" : "rounded-t-[22.5px]"
      } ${elevated ? "shadow-[0_60px_120px_-40px_rgb(0_0_0/0.7),0_24px_48px_-24px_rgb(0_0_0/0.45)]" : ""} ${className}`}
    >
      <div className="flex items-center justify-between gap-4 border-b border-ash-grey px-4 py-3 sm:px-6">
        <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full bg-mist px-3 py-1 caption-6">{label}</span>
        <figcaption className="text-right caption-5  text-slate">
          Illustrative<span className="hidden sm:inline"> interface</span>, sample data
        </figcaption>
      </div>
      <div className="px-4 py-4 sm:px-6 sm:py-6">{children}</div>
    </figure>
  );
}
