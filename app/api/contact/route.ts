import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/content";
import { createClient } from "@/lib/supabase/server";
const escapeHtml = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
export async function POST(req: Request) {
  try {
    const raw = await req.text();
    if (raw.length > 16000)
      return NextResponse.json(
        { error: "Nội dung vượt quá dung lượng cho phép." },
        { status: 413 },
      );
    let json: unknown;
    try {
      json = JSON.parse(raw);
    } catch {
      return NextResponse.json({ error: "Dữ liệu chưa hợp lệ." }, { status: 400 });
    }
    const parsed = contactSchema.safeParse(json);
    if (!parsed.success)
      return NextResponse.json(
        { error: "Vui lòng kiểm tra các trường bắt buộc." },
        { status: 400 },
      );
    const b = parsed.data;
    if (b.website)
      return NextResponse.json({ error: "Không thể xác minh yêu cầu." }, { status: 400 });
    if (
      !process.env.TURNSTILE_SECRET_KEY ||
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      !process.env.RESEND_API_KEY ||
      !process.env.NOTIFICATION_RECEIVER_EMAIL ||
      !process.env.RESEND_FROM_EMAIL
    )
      return NextResponse.json(
        { error: "Biểu mẫu chưa được mở nhận tin. Vui lòng quay lại sau." },
        { status: 503 },
      );
    const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: b.token || "",
      }),
      signal: AbortSignal.timeout(10000),
    });
    const challenge = await verify.json();
    if (!challenge.success)
      return NextResponse.json({ error: "Xác minh chống spam chưa thành công." }, { status: 400 });
    const supabase = await createClient();
    const { error } = await supabase
      .from("contact_inquiries")
      .insert({
        sender_name: b.name,
        sender_email: b.email,
        company: b.company,
        purpose: b.purpose,
        message: b.message,
      });
    if (error) throw error;
    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.NOTIFICATION_RECEIVER_EMAIL,
      replyTo: b.email,
      subject: `Portfolio: ${b.purpose} — ${b.name}`,
      html: `<h2>Lời nhắn mới từ portfolio</h2><p>${escapeHtml(b.name)} — ${escapeHtml(b.email)}</p><p>${escapeHtml(b.company)}</p><p>${escapeHtml(b.purpose)}</p><p style="white-space:pre-wrap">${escapeHtml(b.message)}</p>`,
    });
    return NextResponse.json({ success: true, notificationSent: !result.error });
  } catch {
    return NextResponse.json(
      { error: "Kết nối đang gián đoạn. Nội dung chưa gửi được, vui lòng thử lại sau." },
      { status: 503 },
    );
  }
}
