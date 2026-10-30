# Tech PM Portfolio & CMS

Nền tảng Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4.
Tài liệu đặc tả: `tai_lieu_ky_thuat_va_quy_trinh_vibe_code_tech_pm.md`.

## Chạy cục bộ

Yêu cầu Node.js 22 hoặc 24 và npm.

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Mở http://localhost:3000. Trang khởi tạo chạy được khi chưa có API key.
Các chức năng CMS, auth và gửi email chưa được triển khai ở giai đoạn khởi tạo.

```powershell
npm run lint
npm run typecheck
npm run build
npm start
```

## Công cụ và thư viện

- UI: Lucide, Framer Motion, Radix Slot, shadcn configuration, Sonner.
- Forms: React Hook Form, Zod, Hook Form Resolvers, Cloudflare Turnstile React.
- Nội dung: React Markdown, Remark GFM, Rehype Highlight, Mermaid, Recharts.
- Backend: Supabase JS/SSR, Resend; Supabase CLI qua `npx supabase`.
- Theo dõi khi triển khai: Vercel Analytics và Speed Insights.

Aceternity/Magic UI và các component shadcn sẽ được thêm theo từng tính năng,
không cài toàn bộ component không sử dụng. Tailwind 4 dùng design tokens trong
`app/globals.css` thay cho cấu hình Tailwind 3 trong tài liệu gốc.

## Design workflow

Trang `/design-system` minh họa Spotlight, Dot Pattern, Border Beam, Marquee,
Cult Minimal Card, tabs và tương tác nghiêng thẻ tự viết lấy cảm hứng Hover.dev.
Các component đã tải nằm trong `components/ui`; registry nằm trong `components.json`.
Nguồn và thay đổi được ghi tại `docs/ui-sources.md`.

Skill chính thức shadcn và skill thiết kế riêng Deep Ocean được cài theo phạm vi
dự án trong `.agents/skills`. `AGENTS.md` hướng dẫn áp dụng khi phát triển giao diện.
Skill mới có thể được khám phá tự động từ lượt chat tiếp theo.

## Thiết lập dịch vụ ở bước tiếp theo

1. Tạo Supabase project; điền URL và anon/publishable key vào `.env.local`.
2. Thiết kế migration từ schema tài liệu, giới hạn quyền admin theo chủ sở hữu;
   không chạy nguyên các policy cấp quyền cho mọi authenticated user.
3. Tắt public signup nếu chỉ chủ website được đăng nhập; cấu hình redirect URLs.
4. Tạo Resend API key, xác minh domain gửi và điền email nhận thông báo.
5. Tạo Turnstile site key/secret cho localhost và domain thật.
6. Kết nối GitHub/Vercel và cấu hình các biến môi trường khi triển khai.

Không commit `.env.local` hoặc đưa secret key vào biến `NEXT_PUBLIC_*`.
Không cần Supabase Docker local nếu sử dụng Supabase cloud.
