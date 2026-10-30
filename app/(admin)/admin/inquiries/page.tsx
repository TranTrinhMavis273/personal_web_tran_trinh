import { Suspense } from "react";
import { Inquiries } from "@/components/admin/inquiries";
import { Skeleton } from "@/components/ui/skeleton";
export default function Page() {
  return (
    <Suspense fallback={<Skeleton className="h-96 w-full" />}>
      <Inquiries />
    </Suspense>
  );
}
