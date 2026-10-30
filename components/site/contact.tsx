"use client";
import { useRef, useState } from "react";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Send,
  LoaderCircle,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { useContent } from "@/components/providers";
import { contactSchema } from "@/lib/content";
import { FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { TextField, SelectControl } from "@/components/forms/controls";
import { PageIntro } from "@/components/site/blocks";
const purposes = ["Cơ hội nghề nghiệp", "Dự án hợp tác", "Sự kiện / Chia sẻ", "Kết nối chuyên môn"];
export function Contact({ serviceReady }: { serviceReady: boolean }) {
  const {
    content: { profile },
  } = useContent();
  const { resolvedTheme } = useTheme();
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    purpose: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const turnstile = useRef<TurnstileInstance>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  function change(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
    setStatus(null);
  }
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = contactSchema.safeParse({ ...form, token });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        next[String(i.path[0])] = i.message;
      });
      setErrors(next);
      document.getElementById(`contact-${Object.keys(next)[0]}`)?.focus();
      return;
    }
    if (!serviceReady) {
      setStatus({
        ok: false,
        message: "Biểu mẫu chưa được mở nhận tin. Nội dung của bạn vẫn được giữ để gửi lại sau.",
      });
      return;
    }
    if (!token) {
      setStatus({ ok: false, message: "Vui lòng hoàn tất bước xác minh chống spam." });
      return;
    }
    setBusy(true);
    setStatus(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Chưa thể gửi lời nhắn. Vui lòng thử lại.");
      setStatus({ ok: true, message: "Đã nhận lời nhắn của bạn. Cảm ơn bạn đã kết nối!" });
      toast.success("Đã nhận lời nhắn.");
      setForm({ name: "", email: "", company: "", purpose: "", message: "", website: "" });
    } catch (error) {
      setStatus({
        ok: false,
        message: error instanceof Error ? error.message : "Kết nối gián đoạn. Vui lòng thử lại.",
      });
    } finally {
      setBusy(false);
      setToken("");
      turnstile.current?.reset();
    }
  }
  return (
    <>
      <PageIntro
        eyebrow="Let’s connect"
        title="Bắt đầu một cuộc trao đổi."
        description="Cơ hội nghề nghiệp, dự án hợp tác hoặc đơn giản là một góc nhìn mới. Tôi rất mong được lắng nghe."
      />
      <div className="container-site grid gap-12 pb-20 lg:grid-cols-[.85fr_1.15fr]">
        <section className="py-3">
          <h2 className="max-w-md text-3xl font-semibold leading-[1.5] tracking-tight">
            Mọi dự án tốt đều bắt đầu từ{" "}
            <span className="text-brand-ink">một cuộc trò chuyện.</span>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-8 text-muted-foreground">
            Chia sẻ điều bạn đang tìm kiếm và một chút bối cảnh. Một lời nhắn rõ ràng là điểm khởi
            đầu cho sự kết nối có ý nghĩa.
          </p>
          <div className="mt-10 flex flex-col gap-7">
            {[
              {
                icon: Mail,
                label: "Email",
                value: profile.email || "Qua biểu mẫu bên cạnh",
                href: profile.email ? `mailto:${profile.email}` : "",
              },
              {
                icon: MessageSquare,
                label: "LinkedIn",
                value: profile.linkedin ? "Kết nối chuyên môn" : "Hồ sơ đang được cập nhật",
                href: profile.linkedin,
              },
              {
                icon: MapPin,
                label: "Địa điểm",
                value: profile.location || "Thông tin đang cập nhật",
                href: "",
              },
            ].map(({ icon: Icon, label, value, href }) => (
              <div className="flex items-start gap-4" key={label}>
                <span className="icon-box">
                  <Icon />
                </span>
                <div>
                  <p className="mb-2 font-mono text-[9px] tracking-widest text-muted-foreground uppercase">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="flex break-all items-center gap-2 text-sm font-medium hover:text-brand-ink"
                    >
                      {value}
                      <ArrowUpRight size={14} />
                    </a>
                  ) : (
                    <p className="text-sm">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="relative mt-12 overflow-hidden rounded-2xl border border-border p-7">
            <div className="halo -inset-24" />
            <div className="dot-texture absolute inset-0" />
            <p className="relative font-mono text-[10px] leading-7 tracking-[.12em] text-muted-foreground uppercase">
              CLEAR CONTEXT.
              <br />
              MEANINGFUL CONVERSATIONS.
              <br />
              BETTER OUTCOMES.
            </p>
          </div>
        </section>
        <section className="surface p-6 sm:p-9">
          <div className="mb-7">
            <h2 className="text-xl font-semibold tracking-tight">Gửi một lời nhắn</h2>
            <p className="mt-3 text-xs leading-6 text-muted-foreground">
              Các trường có dấu * là bắt buộc.
            </p>
          </div>
          <form onSubmit={submit} noValidate>
            <FieldGroup>
              <FieldGroup className="sm:flex-row">
                <TextField
                  id="contact-name"
                  label="Họ và tên *"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => change("name", e.target.value)}
                  error={errors.name}
                  maxLength={120}
                />
                <TextField
                  id="contact-email"
                  label="Email *"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => change("email", e.target.value)}
                  error={errors.email}
                  maxLength={254}
                />
              </FieldGroup>
              <TextField
                id="contact-company"
                label="Công ty / Tổ chức"
                autoComplete="organization"
                value={form.company}
                onChange={(e) => change("company", e.target.value)}
                maxLength={200}
              />
              <SelectControl
                id="contact-purpose"
                label="Mục đích liên hệ *"
                value={form.purpose}
                onChange={(v) => change("purpose", v)}
                options={purposes}
                error={errors.purpose}
                placeholder="Bạn muốn trao đổi về…"
              />
              <TextField
                id="contact-message"
                label="Nội dung *"
                multiline
                rows={6}
                placeholder="Một chút bối cảnh sẽ giúp cuộc trao đổi hiệu quả hơn…"
                value={form.message}
                onChange={(e) => change("message", e.target.value)}
                error={errors.message}
                maxLength={5000}
              />
              <div className="hidden" aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => change("website", e.target.value)}
                />
              </div>
              {siteKey && serviceReady ? (
                <Turnstile
                  ref={turnstile}
                  siteKey={siteKey}
                  onSuccess={setToken}
                  onExpire={() => setToken("")}
                  onError={() =>
                    setStatus({ ok: false, message: "Xác minh chưa thành công. Vui lòng thử lại." })
                  }
                  options={{ theme: resolvedTheme === "dark" ? "dark" : "light" }}
                />
              ) : (
                <p className="preview-note">
                  <ShieldCheck className="mt-1 size-4 shrink-0" />
                  Biểu mẫu đang được hoàn thiện và chưa nhận lời nhắn trực tuyến.
                </p>
              )}
              {status && (
                <Alert variant={status.ok ? "default" : "destructive"}>
                  {status.ok ? <CheckCircle2 /> : <AlertCircle />}
                  <AlertTitle>
                    {status.ok ? "Đã nhận lời nhắn" : "Chưa thể gửi lời nhắn"}
                  </AlertTitle>
                  <AlertDescription>{status.message}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" size="lg" disabled={busy} className="w-full">
                {busy ? (
                  <LoaderCircle className="animate-spin" data-icon="inline-start" />
                ) : (
                  <Send data-icon="inline-end" />
                )}
                {busy ? "Đang gửi…" : "Gửi lời nhắn"}
              </Button>
              <p className="text-[10px] leading-6 text-muted-foreground">
                Thông tin bạn cung cấp chỉ được dùng để phản hồi nội dung liên hệ.
              </p>
            </FieldGroup>
          </form>
        </section>
      </div>
    </>
  );
}
