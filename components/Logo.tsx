import fs from "node:fs";
import path from "node:path";
import Link from "next/link";

// The brand mark is supplied by ASH-V. ash-v-mark.webp is a cropped 240px export of the original upload
// (ash-v-logo.png) so the header does not download 1.5 MB; if neither exists the wordmark shows alone.
const candidates = ["ash-v-mark.svg", "ash-v-mark.webp", "ash-v-logo.svg", "ash-v-logo.png", "ash-v-logo.webp"];
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
        <img src={`/brand/${markFile}`} alt="" width={29} height={40} className="h-10 w-auto object-contain" />
      ) : null}
      <span className="font-display text-[22px] font-medium leading-none tracking-[-0.02em]">ASH-V</span>
    </Link>
  );
}
