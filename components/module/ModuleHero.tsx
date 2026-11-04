"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { HeroIntro } from "@/components/HeroIntro";
import { ModuleIcon } from "@/components/ModuleIcon";
import { moduleHero } from "@/lib/images";
import type { PlatformModule } from "@/lib/modules";
import { fade, spring } from "@/lib/springs";

// Module page opener. Two layouts so the six pages do not share one silhouette:
// "split" puts the module's signature visual beside the copy; "stacked" centres the copy and gives the visual
// the full width underneath. The photograph sits deep under a flat black layer as texture, and drifts slower
// than the page as you scroll away (transform only).
export function ModuleHero({
  mod,
  lines,
  intro,
  layout = "split",
  visual,
  secondary,
}: {
  mod: PlatformModule;
  lines: string[];
  intro: string;
  layout?: "split" | "stacked";
  visual: React.ReactNode;
  secondary?: { href: string; label: string };
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(p, [0, 1], reduce ? ["0%", "0%"] : ["0%", "20%"]);
  const photo = moduleHero[mod.slug];

  const copy = (
    <>
      <nav aria-label="Breadcrumb" className="caption-1 mb-6 text-bone/80">
        <Link href="/platform" className="inline-flex min-h-10 items-center underline underline-offset-4 hover:text-bone">
          Platform
        </Link>
        <span aria-hidden="true" className="mx-2">
          /
        </span>
        <span aria-current="page" className="text-bone">
          {mod.name}
        </span>
      </nav>
      <div className={`mb-6 flex items-center gap-3 text-bone ${layout === "stacked" ? "justify-center" : ""}`}>
        <span className="flex size-10 items-center justify-center rounded-xl border border-bone/30 bg-bone/10">
          <ModuleIcon slug={mod.slug} className="size-6" />
        </span>
        <span className="title-2">{mod.name}</span>
      </div>
      <HeroIntro lines={lines}>
        <p className="body-7 sm:body-8 mt-6 text-bone/85">{intro}</p>
        <div className={`mt-8 flex flex-col gap-3 sm:flex-row ${layout === "stacked" ? "sm:justify-center" : ""}`}>
          <Link href={`/walkthrough?interest=${mod.slug}`} className="btn btn-light">
            Book a walkthrough
            <ArrowRight weight="bold" className="size-4" aria-hidden="true" />
          </Link>
          {secondary ? (
            <Link href={secondary.href} className="btn btn-ghost">
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </HeroIntro>
    </>
  );

  return (
    <section
      ref={ref}
      data-nav-tone="dark"
      className="on-dark relative isolate -mt-[var(--header-h)] overflow-hidden bg-pure-black text-bone"
    >
      <motion.div className="absolute inset-0 -z-10" style={{ y: photoY }} aria-hidden="true">
        <Image
          src={photo.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
          style={{ objectPosition: photo.position }}
        />
        <div className="absolute inset-0 bg-pure-black/70" />
      </motion.div>

      {layout === "split" ? (
        <div className="page-x grid items-center gap-12 pb-20 pt-40 lg:min-h-[92svh] lg:grid-cols-12 lg:gap-8 lg:pb-24">
          <div className="lg:col-span-6">{copy}</div>
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduce ? { y: { duration: 0 }, opacity: fade } : { ...spring.reveal, delay: 0.4 }}
          >
            {visual}
          </motion.div>
        </div>
      ) : (
        <div className="page-x pb-20 pt-40 sm:pb-24">
          <div className="mx-auto flex max-w-[680px] flex-col items-center text-center [&_h1]:mx-auto">{copy}</div>
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduce ? { y: { duration: 0 }, opacity: fade } : { ...spring.reveal, delay: 0.45 }}
          >
            {visual}
          </motion.div>
        </div>
      )}
    </section>
  );
}
