// Legal pages exist because the walkthrough form collects personal data. The text is a placeholder
// until ASH-V's counsel supplies the real version, and the page says so to every visitor.
export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="page-x max-w-[760px] py-20 sm:py-28">
      <h1 className="display">{title}</h1>
      <p className="mt-6 rounded-[12px] border-2 border-ink p-4 text-[15px] font-semibold">
        Draft placeholder. This page will be replaced with text approved by ASH-V&apos;s legal team before launch.
      </p>
      <div className="mt-10 space-y-5 text-[16px] leading-[1.65] text-graphite">{children}</div>
    </article>
  );
}
