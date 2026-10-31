import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-x py-28 sm:py-36">
      <h1 className="display max-w-[16ch]">This page is not part of the site.</h1>
      <p className="mt-6 text-[17px] text-graphite">The link may be out of date. The six modules are listed on the home page.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/#platform" className="pill pill-dark">
          See the modules
        </Link>
        <Link href="/" className="pill pill-light">
          Go to the home page
        </Link>
      </div>
    </section>
  );
}
