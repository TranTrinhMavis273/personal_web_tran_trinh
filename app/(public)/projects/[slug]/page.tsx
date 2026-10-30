import { ProjectDetail } from "@/components/site/projects";
export const metadata = { title: "Case Study" };
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProjectDetail slug={slug} />;
}
