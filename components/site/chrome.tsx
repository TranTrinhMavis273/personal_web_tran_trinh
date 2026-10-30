"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { ArrowUpRight, Code2, Menu, Moon, Sun, Monitor, Check } from "lucide-react";
import { useContent } from "@/components/providers";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

export const publicLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/projects", label: "Dự án" },
  { href: "/articles", label: "Bài viết" },
  { href: "/about", label: "Giới thiệu" },
  { href: "/resume", label: "CV" },
];
export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Tran Trinh — Trang chủ">
      <span
        aria-hidden="true"
        className="flex size-10 items-center justify-center rounded-xl border border-border bg-secondary font-mono text-lg font-semibold tracking-[-.15em] text-brand-ink"
      >
        TT<span className="text-lobster">.</span>
      </span>
      {!compact && (
        <span className="flex flex-col gap-1">
          <span className="text-[13px] font-bold tracking-[.08em] uppercase">Tran Trinh</span>
          <span className="font-mono text-[8px] tracking-[.11em] text-muted-foreground uppercase">
            Technical Project Manager
          </span>
        </span>
      )}
    </Link>
  );
}
export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Chọn giao diện sáng hoặc tối">
          <Sun className="hidden dark:block" />
          <Moon className="dark:hidden" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          {[
            { value: "light", label: "Giao diện sáng", icon: Sun },
            { value: "dark", label: "Giao diện tối", icon: Moon },
            { value: "system", label: "Theo hệ thống", icon: Monitor },
          ].map(({ value, label, icon: Icon }) => (
            <DropdownMenuItem key={value} onSelect={() => setTheme(value)}>
              <Icon />
              {label}
              {theme === value && <Check className="ml-auto" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export function Header() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="container-site flex h-[86px] items-center justify-between gap-5">
        <Brand />
        <nav aria-label="Điều hướng chính" className="hidden items-center gap-7 lg:flex">
          {publicLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="nav-link"
              aria-current={
                (l.href === "/" ? path === "/" : path.startsWith(l.href)) ? "page" : undefined
              }
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeSwitch />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/contact">
              Kết nối <ArrowUpRight data-icon="inline-end" />
            </Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Mở menu điều hướng"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader className="px-6 pt-8">
                <SheetTitle>Khám phá portfolio</SheetTitle>
                <SheetDescription>AI · Data · Systems</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-2 px-4" aria-label="Điều hướng di động">
                {[...publicLinks, { href: "/contact", label: "Liên hệ" }].map((l) => (
                  <SheetClose key={l.href} asChild>
                    <Link
                      href={l.href}
                      className="rounded-xl px-4 py-4 text-sm hover:bg-accent"
                      aria-current={path === l.href ? "page" : undefined}
                    >
                      {l.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
export function Footer() {
  const {
    content: { profile },
  } = useContent();
  return (
    <footer className="border-t border-border bg-subtle">
      <div className="container-site py-12">
        <div className="flex flex-col justify-between gap-9 md:flex-row">
          <div className="flex flex-col gap-5">
            <Brand />
            <p className="max-w-xs text-xs leading-6 text-muted-foreground">
              Kết nối quản trị dự án với tư duy kỹ thuật.
              <br />
              Từng quyết định rõ ràng. Từng giá trị có ý nghĩa.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-16 gap-y-8">
            <div>
              <p className="eyebrow mb-4">Khám phá</p>
              <nav className="grid grid-cols-2 gap-x-8 gap-y-3" aria-label="Liên kết chân trang">
                {[...publicLinks, { href: "/contact", label: "Liên hệ" }].map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-xs text-muted-foreground hover:text-brand-ink"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <p className="eyebrow mb-4">Kết nối</p>
              <div className="flex flex-col gap-3 text-xs text-muted-foreground">
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 hover:text-brand-ink"
                  >
                    <Code2 size={15} />
                    GitHub
                    <ArrowUpRight size={12} />
                  </a>
                )}
                {profile.linkedin && (
                  <a href={profile.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn ↗
                  </a>
                )}
                <Link href="/contact" className="hover:text-brand-ink">
                  Gửi lời nhắn ↗
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-9" />
        <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] text-muted-foreground">
          <span>© 2026 Tran Trinh. AI · Data · Systems.</span>
          <div className="flex items-center gap-5">
            <Link href="/design-system" className="hover:text-brand-ink">
              Design system
            </Link>
            <Link href="/admin/login" className="hover:text-brand-ink">
              Quản trị
            </Link>
            <a
              href="#top"
              aria-label="Trở về đầu trang"
              className="rounded-full border border-border p-2"
            >
              <ArrowUpRight size={14} className="-rotate-45" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
