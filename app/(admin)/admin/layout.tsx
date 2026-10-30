import { AdminShell } from "@/components/admin/shell";
export const metadata = { title: "Quản trị portfolio", robots: { index: false, follow: false } };
export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
