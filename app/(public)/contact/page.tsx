import { Contact } from "@/components/site/contact";
export const metadata = { title: "Liên hệ" };
export default function Page() {
  const ready = !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.RESEND_API_KEY &&
    process.env.RESEND_FROM_EMAIL &&
    process.env.NOTIFICATION_RECEIVER_EMAIL &&
    process.env.TURNSTILE_SECRET_KEY &&
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  );
  return <Contact serviceReady={ready} />;
}
