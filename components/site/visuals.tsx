"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  BrainCircuit,
  Database,
  Workflow,
  GitBranch,
  ShieldCheck,
  Scan,
  Layers3,
  Braces,
} from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";

export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.06 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
export function Portrait({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn("portrait-stage", compact && "min-h-[360px]")}>
      <div className="halo" />
      <div
        aria-hidden="true"
        className="dot-texture absolute inset-7 [mask-image:radial-gradient(white,transparent_75%)]"
      />
      <div aria-hidden="true" className="orbit inset-[7%_8%]" />
      <div aria-hidden="true" className="orbit inset-[17%_18%] border-dashed" />
      <div
        aria-hidden="true"
        className="absolute right-[15%] top-[23%] size-3 rounded-full bg-deepsea shadow-lg shadow-deepsea/30"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[28%] left-[12%] size-2 rounded-full bg-lobster"
      />
      <div className="portrait-shape">
        <Image
          src="/images/tran-trinh-portrait.png"
          alt="Ảnh chân dung Trần Trinh"
          fill
          priority={!compact}
          sizes="(max-width: 767px) 90vw, (max-width: 1280px) 44vw, 520px"
          className="object-cover object-top"
        />
      </div>
      {!compact && (
        <div className="glass absolute inset-x-5 bottom-0 rounded-2xl p-6 sm:inset-x-7">
          <p className="font-mono text-[9px] tracking-[.15em] text-muted-foreground uppercase">
            Let’s build something meaningful
          </p>
          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="text-xl font-semibold tracking-tight">Cùng tạo nên giá trị.</span>
            <ArrowUpRight className="size-6 text-brand-ink" />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Bắt đầu từ một cuộc trò chuyện.</p>
        </div>
      )}
    </div>
  );
}
export function CoverArt({
  domain = "",
  cover = "",
  className,
}: {
  domain?: string;
  cover?: string;
  className?: string;
}) {
  const type = domain.includes("AI") ? "ai" : domain.includes("Automation") ? "data" : "systems";
  const Icon = type === "ai" ? BrainCircuit : type === "data" ? Workflow : Layers3;
  return (
    <div className={cn("cover-art", className)}>
      {cover ? (
        <Image
          src={cover}
          alt="Ảnh bìa dự án"
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 420px"
          className="object-cover"
        />
      ) : (
        <>
          <div className="halo" />
          <div className="dot-texture absolute inset-0" />
          <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center p-7">
            <div className="diagram-node size-12 sm:size-14">
              {type === "ai" ? (
                <Scan className="size-5 text-brand-ink" />
              ) : (
                <Braces className="size-5 text-brand-ink" />
              )}
            </div>
            <span className="cover-line max-w-10" />
            <div className="diagram-node size-20 sm:size-24">
              <Icon className="size-10 text-brand-ink" />
            </div>
            <span className="cover-line max-w-10" />
            <div className="diagram-node size-12 sm:size-14">
              {type === "systems" ? (
                <ShieldCheck className="size-5 text-brand-ink" />
              ) : (
                <Database className="size-5 text-brand-ink" />
              )}
            </div>
          </div>
          <span className="absolute left-4 top-4 font-mono text-[8px] tracking-[.13em] text-muted-foreground uppercase">
            {type === "ai"
              ? "Intelligence / Vision"
              : type === "data"
                ? "Connect / Automate"
                : "Architecture / Systems"}
          </span>
          <GitBranch
            aria-hidden="true"
            className="absolute bottom-4 right-4 size-4 text-muted-foreground/50"
          />
        </>
      )}
    </div>
  );
}
export function FeaturedFrame({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <div className="relative isolate overflow-hidden rounded-[20px]">
      {children}
      {!reduced && (
        <div aria-hidden="true">
          <BorderBeam duration={12} size={90} colorFrom="#05308C" colorTo="#AD1F23" />
        </div>
      )}
    </div>
  );
}
