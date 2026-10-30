import { siPython, siPostgresql, siN8n, siNextdotjs, siSupabase } from "simple-icons";
export function TechnologyStrip() {
  return (
    <div className="container-site">
      <div className="flex flex-col items-start gap-6 rounded-2xl border border-border bg-subtle px-7 py-7 sm:flex-row sm:items-center">
        <p className="shrink-0 font-mono text-[9px] tracking-[.13em] text-muted-foreground uppercase">
          Tools & ecosystem
        </p>
        <div className="flex w-full flex-wrap items-center justify-between gap-x-8 gap-y-6">
          {[siPython, siN8n, siPostgresql, siNextdotjs, siSupabase].map((icon) => (
            <span
              key={icon.slug}
              className="flex items-center gap-2 text-[13px] font-medium text-muted-foreground"
            >
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d={icon.path} />
              </svg>
              {icon.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
