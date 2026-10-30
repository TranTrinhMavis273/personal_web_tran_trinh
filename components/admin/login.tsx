"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowUpRight, LockKeyhole, Eye, EyeOff, Info } from "lucide-react";
import { z } from "zod";
import { Brand, ThemeSwitch } from "@/components/site/chrome";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { TextField } from "@/components/forms/controls";
export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState(false);
  function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = z
      .object({
        email: z.string().email("Email chưa hợp lệ."),
        password: z.string().min(8, "Mật khẩu cần ít nhất 8 ký tự."),
      })
      .safeParse({ email, password });
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [i.path[0], i.message])));
      return;
    }
    setErrors({});
    setNotice(true);
  }
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <section className="relative isolate hidden flex-col justify-between overflow-hidden border-r border-border bg-subtle p-12 lg:flex">
        <div className="halo -inset-36 -z-10" />
        <div className="dot-texture absolute inset-0 -z-10" />
        <Brand />
        <div className="max-w-lg">
          <p className="eyebrow mb-7">Private content workspace</p>
          <h1 className="display-title">
            Quản trị
            <br />
            câu chuyện
            <br />
            <span className="text-brand-ink">của bạn.</span>
          </h1>
          <p className="mt-7 text-sm leading-8 text-muted-foreground">
            Từng dự án, từng bài viết, từng kết nối.
            <br />
            Một không gian để giữ mọi thứ luôn được cập nhật.
          </p>
        </div>
        <p className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <LockKeyhole size={14} />
          Không gian quản trị dành cho chủ website.
        </p>
      </section>
      <section className="flex flex-col px-6 py-7 sm:px-12">
        <div className="flex justify-between">
          <Button asChild variant="ghost" size="sm">
            <Link href="/">
              <ArrowLeft data-icon="inline-start" />
              Về website
            </Link>
          </Button>
          <ThemeSwitch />
        </div>
        <div className="mx-auto my-auto w-full max-w-sm py-16">
          <span className="icon-box mb-8">
            <LockKeyhole />
          </span>
          <p className="eyebrow mb-3">Welcome back</p>
          <h2 className="text-3xl font-semibold tracking-tight">Đăng nhập</h2>
          <p className="mb-9 mt-4 text-xs leading-6 text-muted-foreground">
            Truy cập không gian nội dung của bạn.
          </p>
          <form onSubmit={submit} noValidate>
            <FieldGroup>
              <TextField
                id="login-email"
                label="Email chủ sở hữu"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
              />
              <Field data-invalid={!!errors.password}>
                <FieldLabel htmlFor="login-password">Mật khẩu</FieldLabel>
                <div className="relative">
                  <Input
                    id="login-password"
                    type={show ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? "login-password-error" : undefined}
                    className="pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="absolute right-1 top-1"
                    aria-label={show ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    onClick={() => setShow(!show)}
                  >
                    {show ? <EyeOff /> : <Eye />}
                  </Button>
                </div>
                <FieldError id="login-password-error">{errors.password}</FieldError>
              </Field>
              {notice && (
                <Alert>
                  <Info />
                  <AlertTitle>Xác thực chưa được kết nối</AlertTitle>
                  <AlertDescription>
                    Đăng nhập thật cần Supabase Auth và phân quyền chủ sở hữu. Bạn có thể khám phá
                    giao diện CMS qua chế độ xem thử bên dưới.
                  </AlertDescription>
                </Alert>
              )}
              <Button type="submit" size="lg" className="w-full">
                Đăng nhập
                <ArrowUpRight data-icon="inline-end" />
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setNotice(true)}
              >
                Gửi Magic Link
              </Button>
            </FieldGroup>
          </form>
          <div className="mt-8 border-t pt-7">
            <p className="mb-4 text-[11px] leading-6 text-muted-foreground">
              Chưa cấu hình tài khoản? Xem trước các màn hình quản trị bằng dữ liệu minh họa.
            </p>
            <Button asChild variant="secondary" className="w-full">
              <Link href="/admin/dashboard">
                Khám phá CMS xem thử
                <ArrowUpRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
