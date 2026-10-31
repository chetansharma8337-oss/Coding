"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { modules } from "@/lib/modules";
import { ModuleIcon } from "./ModuleIcon";

const sections = [
  { href: "/#approach", label: "Approach" },
  { href: "/#flow", label: "How it works" },
];

export function SiteHeader({ logo }: { logo: React.ReactNode }) {
  const [platformOpen, setPlatformOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const platformRef = useRef<HTMLDivElement>(null);
  const platformButton = useRef<HTMLButtonElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setPlatformOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (platformOpen) {
        setPlatformOpen(false);
        platformButton.current?.focus();
      }
      if (menuOpen) {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    function onPointer(e: PointerEvent) {
      if (platformOpen && platformRef.current && !platformRef.current.contains(e.target as Node)) {
        setPlatformOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [platformOpen, menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const close = () => {
    setPlatformOpen(false);
    setMenuOpen(false);
  };

  return (
    <header className="on-dark sticky top-0 z-50 bg-ink text-bone">
      <div className="page-x flex h-[var(--header-h)] items-center justify-between gap-6">
        {logo}

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          <div ref={platformRef} className="relative">
            <button
              ref={platformButton}
              type="button"
              aria-expanded={platformOpen}
              aria-controls="platform-menu"
              onClick={() => setPlatformOpen((v) => !v)}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-[16px] text-bone/80 transition-colors hover:text-bone aria-expanded:text-bone"
            >
              Platform
              <svg
                viewBox="0 0 12 12"
                className={`size-3 transition-transform duration-200 ${platformOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M2.5 4.5L6 8l3.5-3.5" />
              </svg>
            </button>
            <div
              id="platform-menu"
              hidden={!platformOpen}
              className="absolute left-1/2 top-[calc(100%+12px)] w-[640px] -translate-x-1/2 rounded-[22.5px] border border-ash-grey bg-bone p-3 text-ink shadow-[0_24px_48px_-24px_rgb(0_0_0/0.35)]"
            >
              {/* Popover: the one place a shadow is allowed, since it floats above page content. */}
              <ul className="grid grid-cols-2 gap-1">
                {modules.map((m) => (
                  <li key={m.slug}>
                    <Link
                      href={`/platform/${m.slug}`}
                      onClick={close}
                      className="flex gap-3 rounded-[12px] p-3 transition-colors hover:bg-mist"
                    >
                      <ModuleIcon slug={m.slug} className="mt-0.5 size-5 shrink-0" />
                      <span>
                        <span className="block text-[15px] font-semibold leading-snug">{m.name}</span>
                        <span className="mt-1 block text-[13px] leading-[1.45] text-graphite">{m.line}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="inline-flex min-h-11 items-center rounded-full px-4 text-[16px] text-bone/80 transition-colors hover:text-bone"
            >
              {s.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/#walkthrough" className="pill pill-light hidden !border-bone sm:inline-flex">
            Book a walkthrough
          </Link>
          <button
            ref={menuButton}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="pill min-h-11 border border-bone/60 px-4 text-[15px] md:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="absolute inset-x-0 top-full h-[calc(100dvh-var(--header-h))] overflow-y-auto border-t border-bone/15 bg-ink md:hidden"
      >
        <nav aria-label="Mobile" className="page-x pb-24 pt-4">
          <p className="micro-label text-ash-grey">Platform</p>
          <ul className="mt-3 divide-y divide-bone/15 border-y border-bone/15">
            {modules.map((m) => (
              <li key={m.slug}>
                <Link href={`/platform/${m.slug}`} onClick={close} className="flex min-h-14 items-center gap-3 py-3">
                  <ModuleIcon slug={m.slug} className="size-5 shrink-0 text-ash-grey" />
                  <span className="text-[17px]">{m.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-6 space-y-1">
            {sections.map((s) => (
              <li key={s.href}>
                <Link href={s.href} onClick={close} className="flex min-h-12 items-center text-[17px]">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/#walkthrough" onClick={close} className="pill pill-light mt-8 w-full !border-bone">
            Book a walkthrough
          </Link>
        </nav>
      </div>
    </header>
  );
}
