"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ThemeProvider, useTheme } from "next-themes";
import { MotionConfig } from "motion/react";
import { Toaster, toast } from "sonner";
import { contentSchema, initialContent, type Content } from "@/lib/content";
const KEY = "tran-trinh-portfolio-preview-v1";
const Context = createContext<{
  content: Content;
  ready: boolean;
  update: (fn: (c: Content) => Content) => boolean;
  reset: () => void;
}>({ content: initialContent, ready: false, update: () => false, reset: () => {} });
export const useContent = () => useContext(Context);
function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<Content>(initialContent);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const read = () => {
      try {
        const saved = localStorage.getItem(KEY);
        const parsed = saved && contentSchema.safeParse(JSON.parse(saved));
        setContent(parsed && parsed.success ? parsed.data : initialContent);
      } catch {
        setContent(initialContent);
      }
      setReady(true);
    };
    read();
    const sync = (e: StorageEvent) => {
      if (e.key === KEY) read();
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  const update = useCallback(
    (fn: (c: Content) => Content) => {
      const next = fn(content);
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
        setContent(next);
        return true;
      } catch {
        toast.error(
          "Chưa thể lưu vào trình duyệt. Thử dùng ảnh nhỏ hơn hoặc kiểm tra quyền lưu trữ.",
        );
        return false;
      }
    },
    [content],
  );
  const reset = () => {
    if (update(() => structuredClone(initialContent)))
      toast.success("Đã khôi phục dữ liệu minh họa.");
  };
  return <Context.Provider value={{ content, ready, update, reset }}>{children}</Context.Provider>;
}
function Notifications() {
  const { resolvedTheme } = useTheme();
  return <Toaster richColors closeButton theme={resolvedTheme === "dark" ? "dark" : "light"} />;
}
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="tran-trinh-theme"
    >
      <MotionConfig reducedMotion="user">
        <ContentProvider>
          {children}
          <Notifications />
        </ContentProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
