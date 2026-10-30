# Tran Trinh — Tech PM Portfolio & CMS

Next.js 15 App Router · React 19 · TypeScript · Tailwind CSS 4.
Giao diện được triển khai từ bộ wireframe Figma trong thư mục `design/`.

## Chạy dự án

Yêu cầu Node.js 22.6+ hoặc Node.js 24 và npm.

```powershell
npm ci
# Chỉ tạo file nếu chưa có .env.local; không ghi đè cấu hình đang dùng.
if (-not (Test-Path .env.local)) { Copy-Item .env.example .env.local }
npm run dev
```

Mặc định mở http://localhost:3000. Có thể chọn cổng khác khi cổng này đang bận:

```powershell
npm run dev -- --port 3001
```

Dev dùng `.next-dev`, production dùng `.next` để các bản build không ghi đè nhau.

```powershell
npm test
npm run lint
npm run typecheck
npm run build
npm start
```

## Giao diện đã triển khai

| Nhóm | Đường dẫn | Tương tác |
| --- | --- | --- |
| Trang chủ | `/` | Hero, dự án nổi bật, năng lực, quy trình, bài viết, CTA |
| Dự án | `/projects`, `/projects/[slug]` | Tìm kiếm, lọc lĩnh vực/năng lực, kiến trúc Mermaid, metrics, RAID log |
| Bài viết | `/articles`, `/articles/[slug]` | Lọc chuyên mục, tìm kiếm, Markdown, mục lục, tiến độ đọc, sao chép liên kết |
| Hồ sơ | `/about`, `/resume` | Thông tin cá nhân, trạng thái kinh nghiệm/chứng chỉ, xem/tải PDF khi có tệp |
| Liên hệ | `/contact` | Zod validation, trạng thái gửi/lỗi, Turnstile khi được cấu hình |
| CMS | `/admin/login`, `/admin/dashboard` | Login UI, không gian xem thử, thống kê nội dung |
| Quản lý nội dung | `/admin/projects`, `/admin/articles` | Tìm, lọc, sửa, ẩn/xuất bản xem thử và xác nhận xóa |
| Biên tập | `/admin/projects/new`, `/admin/projects/[id]`, `/admin/articles/new`, `/admin/articles/[id]` | Lưu nháp, preview, editor Mermaid/Markdown, ảnh, chỉ số, rủi ro |
| Hộp thư | `/admin/inquiries` | Tìm, lọc, đọc và đổi New / Contacted / Archived |
| Hồ sơ quản trị | `/admin/profile` | Chỉnh hồ sơ, chọn PDF, khôi phục dữ liệu xem thử |
| UI kit | `/design-system` | Component, hiệu ứng và các trạng thái giao diện |

Hai theme theo hệ thống, có thể chọn sáng/tối và ghi nhớ lựa chọn. Font được đóng
gói cục bộ: Plus Jakarta Sans và JetBrains Mono. Icon Lucide và logo Simple Icons.
Kính mờ dùng backdrop blur; spotlight, dot texture, orbital rings và Border Beam
được tiết chế và tôn trọng tùy chọn giảm chuyển động.

## Phạm vi dữ liệu và dịch vụ

Giai đoạn này triển khai **giao diện**, chưa triển khai CMS production.

- Dự án/bài viết và hộp thư khởi tạo là dữ liệu minh họa, có nhãn rõ ràng.
- Chế độ xem thử CMS lưu vào localStorage của trình duyệt. Xuất bản ở đây chỉ
  thay đổi bản xem thử trên cùng trình duyệt/origin, không ghi Supabase.
- Đăng nhập và Magic Link hiện thông báo chưa kết nối xác thực. CMS preview không
  chứa dữ liệu riêng tư từ cloud và không giả lập một phiên đăng nhập thành công.
- Ảnh chân dung do chủ website cung cấp được dùng ở trang chủ và Giới thiệu.
- Kinh nghiệm, chứng chỉ và số liệu chưa xác nhận không được bịa ra.
- CV tải được sau khi chọn PDF và lưu hồ sơ trong chế độ xem thử.
- Contact API có validation phía server, honeypot, Turnstile, Supabase insert và
  thông báo Resend. Khi thiếu cấu hình, API từ chối bằng 503; không báo gửi thành công.
- Chưa kiểm thử gửi email thật hoặc ghi dữ liệu cloud vì hiện chưa có credentials.

### Kết nối production ở bước tiếp theo

1. Tạo migration/RLS Supabase giới hạn đúng chủ website; không dùng nguyên policy
   `authenticated USING (true)` trong tài liệu mẫu.
2. Nối repository dữ liệu và các thao tác CMS tới Supabase; thêm route guard và
   kiểm tra quyền ở từng Server Action/API trước khi mở dữ liệu cloud.
3. Cấu hình URL/anon key Supabase, Resend API key/domain gửi/email nhận và Turnstile
   site key/secret trong `.env.local` hoặc môi trường Vercel.
4. Nhập nội dung thật, CV và ảnh chân dung rồi kiểm thử end-to-end trên dịch vụ thật.
5. Kết nối Vercel và domain khi sẵn sàng triển khai.

Không commit `.env.local` hoặc đặt secret trong biến `NEXT_PUBLIC_*`.

## Thiết kế và quy tắc dự án

- `design/WIREFRAMES.md`: nhóm trang, Figma và nguồn vector.
- `design/VISUAL-DIRECTION.md`: theme, icon và hiệu ứng.
- `docs/ui-sources.md`: nguồn component và các điều chỉnh.
- `docs/IMPLEMENTATION.md`: cấu trúc mã và giới hạn triển khai.
- `.agents/skills/shadcn` và `.agents/skills/deep-ocean-portfolio`: skill theo dự án.

## Deploy thử

Xem [hướng dẫn Vercel](docs/DEPLOYMENT.md). Cấu hình Node.js 24.x và build đã được chuẩn bị.
Bản UI có thể build khi chưa cấu hình dịch vụ cloud.
