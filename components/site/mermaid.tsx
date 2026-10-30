"use client";
import { useEffect, useId, useState } from "react";
import { useTheme } from "next-themes";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
export default function Mermaid({ code }: { code: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState("");
  const [error, setError] = useState(false);
  useEffect(() => {
    let live = true;
    setSvg("");
    setError(false);
    if (!code.trim()) return;
    async function render() {
      try {
        const { default: mermaid } = await import("mermaid");
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: resolvedTheme === "dark" ? "dark" : "default",
          themeVariables: {
            fontFamily: '"Plus Jakarta Sans Variable", sans-serif',
            primaryColor: resolvedTheme === "dark" ? "#191954" : "#eaf0fc",
            primaryTextColor: resolvedTheme === "dark" ? "#fefdf8" : "#0a0a3a",
            primaryBorderColor: resolvedTheme === "dark" ? "#353578" : "#d7dff0",
            lineColor: resolvedTheme === "dark" ? "#95b6ff" : "#05308c",
          },
        });
        const result = await mermaid.render(`mermaid${id}`, code);
        if (live) setSvg(result.svg);
      } catch {
        if (live) setError(true);
      }
    }
    void render();
    return () => {
      live = false;
    };
  }, [code, id, resolvedTheme]);
  if (!code.trim())
    return <p className="surface p-6 text-sm text-muted-foreground">Chưa có sơ đồ kiến trúc.</p>;
  if (error)
    return (
      <Alert>
        <AlertTitle>Chưa thể hiển thị sơ đồ</AlertTitle>
        <AlertDescription>Kiểm tra lại cú pháp Mermaid trong trình biên tập.</AlertDescription>
      </Alert>
    );
  return (
    <div
      className="surface min-h-48 overflow-x-auto p-5"
      role="img"
      aria-label="Sơ đồ kiến trúc hệ thống"
    >
      {svg ? (
        <div
          className="flex justify-center [&>svg]:max-w-none md:[&>svg]:max-w-full"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <Skeleton className="h-48 w-full" />
      )}
    </div>
  );
}
