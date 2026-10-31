import Link from "next/link";

// The one chromatic surface in the system, used once per page as DESIGN.md requires.
export function PromoBar() {
  return (
    <div className="on-dark text-bone" style={{ background: "var(--gradient-cobalt-wash)" }}>
      <p className="page-x flex min-h-10 items-center justify-center py-2 text-center text-[14px] leading-snug sm:text-[16px]">
        <span>
          See ASH-V on your own estate.{" "}
          <Link href="/#walkthrough" className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4">
            Book a 30-minute walkthrough
          </Link>
        </span>
      </p>
    </div>
  );
}
