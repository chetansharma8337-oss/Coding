import Link from "next/link";

// The one chromatic surface in the system: a flat cobalt strip (B4, no background gradients).
// White on #1227fd is 7.7:1.
export function PromoBar() {
  return (
    <div data-nav-tone="dark" className="on-dark bg-cobalt text-bone">
      <p className="page-x body-6 flex min-h-10 items-center justify-center py-1 text-center">
        <span>
          See ASH-V on your own estate.{" "}
          <Link href="/walkthrough" className="body-4 inline-flex min-h-10 items-center underline underline-offset-4">
            Book a 30 minute walkthrough
          </Link>
        </span>
      </p>
    </div>
  );
}
