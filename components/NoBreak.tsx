// Keeps hyphenated identifiers (ASH-V, hostnames, CVE IDs) on one line; browsers otherwise break after the hyphen.
const TOKEN = /(ASH-V|CVE-\d{4}-\d+|\b[a-z0-9]+(?:-[a-z0-9]+)+\b)/g;

export function NoBreak({ text }: { text: string }) {
  return (
    <>
      {text.split(TOKEN).map((part, i) =>
        i % 2 ? (
          <span key={i} className="whitespace-nowrap">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
