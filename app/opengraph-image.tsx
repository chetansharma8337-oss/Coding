import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const alt = "ASH-V: one record of everything you defend";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social preview, rendered at build time from the brand mark, a dark photograph and Geist.
export default async function OpengraphImage() {
  const root = process.cwd();
  const [font, photo, mark] = await Promise.all([
    readFile(path.join(root, "node_modules/geist/dist/fonts/geist-sans/Geist-SemiBold.ttf")),
    readFile(path.join(root, "public/images/og-base.jpg")),
    readFile(path.join(root, "public/brand/ash-v-mark.png")).catch(() => null),
  ]);
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#000", fontFamily: "Geist" }}>
        {/* The strands hang from the top; the bottom of the photo is near black, which is where the type sits. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photoSrc} alt="" width={1200} height={630} style={{ position: "absolute", inset: 0, objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex" }} />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#fff", fontSize: 40 }}>
            {mark ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={`data:image/png;base64,${mark.toString("base64")}`} alt="" height={56} width={40} />
            ) : null}
            ASH-V
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 76,
                lineHeight: 1,
                letterSpacing: "-0.03em",
                backgroundImage: "linear-gradient(to right, #ffffff, #9b9b9b)",
                backgroundClip: "text",
                color: "transparent",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span>One record of</span>
              <span>everything you defend.</span>
            </div>
            <div style={{ marginTop: 24, fontSize: 28, color: "#c9c9cd" }}>
              Asset intelligence, exposure, patching, testing, vendor risk and GRC
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Geist", data: font, weight: 600, style: "normal" }] },
  );
}
