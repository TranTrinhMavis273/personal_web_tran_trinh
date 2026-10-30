"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  BookOpen,
  Inbox,
  UserRound,
  ArrowUpRight,
  LogOut,
  Menu,
  Info,
} from "lucide-react";
import { Brand, ThemeSwitch } from "@/components/site/chrome";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
const links = [
  { href: "/admin/dashboard", label: "Tổng quan", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Dự án", icon: FolderKanban },
  { href: "/admin/articles", label: "Bài viết", icon: BookOpen },
  { href: "/admin/inquiries", label: "Hộp thư", icon: Inbox },
  { href: "/admin/profile", label: "Hồ sơ & CV", icon: UserRound },
];
function Navigation({ mobile = false }: { mobile?: boolean }) {
  const path = usePathname();
  return (
    <nav
      className="flex flex-col gap-2"
      aria-label={mobile ? "Điều hướng CMS di động" : "Điều hướng CMS"}
    >
      {links.map(({ href, label, icon: Icon }) => {
        const link = (
          <Link
            href={href}
            className="admin-nav-link"
            aria-current={path.startsWith(href) ? "page" : undefined}
          >
            <Icon />
            {label}
          </Link>
        );
        return mobile ? (
          <SheetClose asChild key={href}>
            {link}
          </SheetClose>
        ) : (
          <div key={href}>{link}</div>
        );
      })}
    </nav>
  );
}
export function AdminShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  if (path === "/admin/login") return <>{children}</>;
  const current = links.find((l) => path.startsWith(l.href));
  return (
    <div className="admin-grid">
      <a className="skip-link" href="#admin-content">
        Đến nội dung quản trị
      </a>
      <aside className="sticky top-0 hidden h-screen flex-col border-r border-border bg-subtle p-5 lg:flex">
        <div className="px-2 py-5">
          <Brand />
        </div>
        <p className="mb-5 mt-8 px-4 font-mono text-[9px] tracking-[.15em] text-muted-foreground uppercase">
          Content workspace
        </p>
        <Navigation />
        <div className="mt-auto">
          <div className="glass mb-5 rounded-2xl p-4">
            <p className="mb-2 text-xs font-semibold">Một không gian của riêng bạn.</p>
            <p className="text-[10px] leading-6 text-muted-foreground">
              Câu chuyện, dự án và những điều đáng chia sẻ.
            </p>
          </div>
          <Link href="/" className="admin-nav-link">
            <ArrowUpRight />
            Xem website
          </Link>
          <Link href="/admin/login" className="admin-nav-link">
            <LogOut />
            Về trang đăng nhập
          </Link>
        </div>
      </aside>
      <div className="min-w-0">
        <header className="flex h-[82px] items-center justify-between gap-4 border-b border-border px-5 sm:px-10">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Mở menu quản trị"
                >
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Quản trị nội dung</SheetTitle>
                  <SheetDescription>Không gian xem thử CMS</SheetDescription>
                </SheetHeader>
                <div className="px-4">
                  <Navigation mobile />
                </div>
              </SheetContent>
            </Sheet>
            <span className="text-xs text-muted-foreground">
              Workspace <span className="mx-3 opacity-40">/</span>
              <span className="font-medium text-foreground">{current?.label || "Biên tập"}</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeSwitch />
            <Separator orientation="vertical" className="hidden h-6 sm:block" />
            <span className="hidden text-xs text-muted-foreground sm:block">Chủ website</span>
            <span className="flex size-9 items-center justify-center rounded-full border bg-secondary font-mono text-xs text-brand-ink">
              TT
            </span>
          </div>
        </header>
        <div className="flex flex-wrap items-center gap-3 border-b border-border bg-secondary/50 px-5 py-3 text-[10px] leading-6 text-muted-foreground sm:px-10">
          <Badge variant="outline">CMS xem thử</Badge>
          <span className="flex items-center gap-2">
            <Info size={13} />
            Thay đổi lưu trên trình duyệt này, chưa đồng bộ cloud.
          </span>
          <Link href="/" className="ml-auto inline-flex items-center gap-1 text-brand-ink">
            Xem website
            <ArrowUpRight size={12} />
          </Link>
        </div>
        <main id="admin-content" className="admin-main">
          {children}
        </main>
      </div>
    </div>
  );
}
export function AdminHeading({
  eyebrow = "Content workspace",
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-3 max-w-2xl text-xs leading-6 text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}
