import { ProjectEditor } from "@/components/admin/editors";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProjectEditor id={id} />;
}
