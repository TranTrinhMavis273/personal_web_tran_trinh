# Deploy thử lên Vercel

## Cấu hình đã chuẩn bị

- Repository: `TranTrinhMavis273/personal_web_tran_trinh`, nhánh `main`.
- Framework preset: **Next.js**; Root Directory: thư mục gốc repository.
- Node.js: **24.x** (khớp máy phát triển; được khai báo trong `package.json`).
- Install Command: `npm ci`; Build Command: `npm run build`.
- Output Directory: để mặc định của Next.js (`.next`), không chọn `out`.
- `vercel.json` lưu cấu hình framework, install và build.
- `.env.local`, `.vercel`, output build và node_modules đều được loại khỏi Git.

## Deploy bản giao diện

1. Vào https://vercel.com/new, đăng nhập tài khoản Vercel muốn dùng.
2. Import repository ở trên. Nếu chưa xuất hiện, cấp quyền GitHub cho đúng repository.
3. Kiểm tra framework/root/Node.js theo cấu hình ở trên.
4. Bản thử giao diện **không cần nhập secret hay cấu hình Supabase/Resend/Turnstile**.
5. Chọn Deploy và chờ trạng thái Ready. Bản deploy đầu tiên của project thường là Production
   theo cách gọi của Vercel; đây vẫn chỉ là bản thử giao diện về phạm vi tính năng.
6. Mở URL `.vercel.app`; kiểm tra trang chủ, ảnh chân dung, theme sáng/tối, trang dự án,
   bài viết, menu mobile và `/admin/login` → không gian CMS xem thử.
7. Các commit tiếp theo lên main tự kích hoạt deployment khi Git Integration được kết nối.
   Nhánh khác hoặc PR có thể dùng Preview Deployment.

## Ranh giới bản thử

- CMS là bản xem thử localStorage, chưa có xác thực hoặc dữ liệu cloud riêng tư.
- Dữ liệu localStorage tách theo domain; dữ liệu thử trên localhost không tự chuyển lên Vercel.
- Form liên hệ hiển thị chưa nhận lời nhắn khi thiếu cấu hình, không giả báo gửi thành công.
- Ảnh chân dung đã được đưa vào repository theo yêu cầu của chủ website.
- Chưa cần bật các dịch vụ có phí hoặc cấu hình domain riêng cho bản thử này.

## Khi triển khai backend thật

Cần bổ sung Supabase migration/RLS, xác thực và route guard CMS trước khi nối cloud.
Sau đó nhập biến môi trường từ `.env.example` trong Project Settings → Environment Variables,
phân tách Preview/Production, cấu hình callback/allowed origins của Supabase và Turnstile,
xác minh domain Resend rồi redeploy. Không commit secret vào repository.

## Kiểm tra và quay lại bản trước

Trong Deployments xem Build Logs nếu Error; không đổi sang static export để né lỗi API.
Sau khi bản thử Ready, lưu URL và commit SHA. Có thể chọn deployment trước trong dashboard
để rollback nếu bản tiếp theo gặp lỗi.

Tài liệu chính thức:
- https://vercel.com/docs/git
- https://vercel.com/docs/builds/configure-a-build
- https://vercel.com/docs/functions/runtimes/node-js/node-js-versions
