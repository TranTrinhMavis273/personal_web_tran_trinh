import { ArticleReader } from "@/components/site/articles";
export const metadata = { title: "Insights" };
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ArticleReader slug={slug} />;
}
