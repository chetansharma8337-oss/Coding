import fs from "node:fs";
import path from "node:path";
import Link from "next/link";

// The brand mark is supplied by ASH-V. Drop it at public/brand/ash-v-logo.(svg|png|webp) and it appears;
// until then the header shows the wordmark alone rather than an invented mark.
const candidates = ["ash-v-logo.svg", "ash-v-logo.png", "ash-v-logo.webp"];
const markFile = candidates.find((f) => fs.existsSync(path.join(process.cwd(), "public", "brand", f)));

export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <Link
      href="/"
      className={`inline-flex min-h-11 items-center gap-2.5 rounded-[12px] ${tone === "light" ? "text-bone" : "text-ink"}`}
      aria-label="ASH-V home"
    >
      {markFile ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`/brand/${markFile}`} alt="" width={36} height={36} className="size-9 object-contain" />
      ) : null}
      <span className="font-display text-[22px] font-medium leading-none tracking-[-0.02em]">ASH-V</span>
    </Link>
  );
}
