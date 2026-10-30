"use client";
import { useEffect, useState } from "react";
import { Save, FileDown, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { useContent } from "@/components/providers";
import { profileSchema, type Profile } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { TextField } from "@/components/forms/controls";
import { AdminHeading } from "@/components/admin/shell";
import { readFile } from "@/lib/files";
export function ProfileEditor() {
  const { content, ready, update, reset } = useContent();
  const [draft, setDraft] = useState<Profile>(content.profile);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirm, setConfirm] = useState(false);
  useEffect(() => {
    if (ready) setDraft(content.profile);
  }, [ready, content.profile]);
  function patch(v: Partial<Profile>) {
    setDraft((d) => ({ ...d, ...v }));
  }
  function save() {
    const result = profileSchema.safeParse(draft);
    if (!result.success) {
      setErrors(Object.fromEntries(result.error.issues.map((i) => [String(i.path[0]), i.message])));
      toast.error("Vui lòng kiểm tra thông tin hồ sơ.");
      return;
    }
    if (update((c) => ({ ...c, profile: result.data }))) {
      setErrors({});
      toast.success("Đã cập nhật hồ sơ trong bản xem thử.");
    }
  }
  async function upload(file?: File) {
    if (!file) return;
    if (file.type !== "application/pdf" || file.size > 2 * 1024 * 1024) {
      toast.error("Chọn tệp PDF không quá 2 MB.");
      return;
    }
    try {
      patch({ resume: await readFile(file) });
    } catch {
      toast.error("Chưa thể đọc tệp PDF.");
    }
  }
  return (
    <>
      <AdminHeading
        title="Hồ sơ của bạn."
        description="Thông tin được dùng thống nhất trên trang chủ, giới thiệu, liên hệ và CV."
        action={
          <Button onClick={save}>
            <Save data-icon="inline-start" />
            Lưu hồ sơ
          </Button>
        }
      />
      <div className="grid items-start gap-7 xl:grid-cols-[minmax(0,1fr)_320px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            save();
          }}
          className="surface p-6 sm:p-7"
        >
          <FieldGroup>
            <FieldGroup className="sm:flex-row">
              <TextField
                id="profile-name"
                label="Tên hiển thị *"
                value={draft.name}
                onChange={(e) => patch({ name: e.target.value })}
                error={errors.name}
              />
              <TextField
                id="profile-title"
                label="Chức danh / Định hướng *"
                value={draft.title}
                onChange={(e) => patch({ title: e.target.value })}
                error={errors.title}
              />
            </FieldGroup>
            <TextField
              id="profile-bio"
              label="Giới thiệu"
              multiline
              rows={6}
              value={draft.bio}
              onChange={(e) => patch({ bio: e.target.value })}
            />
            <TextField
              id="profile-email"
              label="Email công khai (tùy chọn)"
              type="email"
              value={draft.email}
              onChange={(e) => patch({ email: e.target.value })}
              error={errors.email}
            />
            <TextField
              id="profile-location"
              label="Địa điểm (tùy chọn)"
              value={draft.location}
              onChange={(e) => patch({ location: e.target.value })}
            />
            <TextField
              id="profile-linkedin"
              label="LinkedIn URL (tùy chọn)"
              value={draft.linkedin}
              onChange={(e) => patch({ linkedin: e.target.value })}
              error={errors.linkedin}
            />
            <TextField
              id="profile-github"
              label="GitHub URL (tùy chọn)"
              value={draft.github}
              onChange={(e) => patch({ github: e.target.value })}
              error={errors.github}
            />
          </FieldGroup>
        </form>
        <aside className="flex flex-col gap-6">
          <div className="surface p-6">
            <span className="icon-box mb-6">
              <FileDown />
            </span>
            <h2 className="text-lg font-semibold">CV chính thức</h2>
            <p className="mb-6 mt-3 text-xs leading-6 text-muted-foreground">
              Tải lên PDF để mở nút tải CV trên trang công khai của bản xem thử.
            </p>
            <Field>
              <FieldLabel htmlFor="resume-file">Chọn PDF ≤ 2 MB</FieldLabel>
              <Input
                id="resume-file"
                type="file"
                accept="application/pdf"
                onChange={(e) => void upload(e.target.files?.[0])}
              />
            </Field>
            {draft.resume && (
              <div className="mt-6 flex flex-col gap-3">
                <p className="text-xs text-brand-ink">
                  Đã chọn tệp PDF. Nhấn Lưu hồ sơ để áp dụng.
                </p>
                <Button variant="outline" size="sm" onClick={() => patch({ resume: "" })}>
                  Bỏ tệp CV
                </Button>
              </div>
            )}
          </div>
          <div className="surface p-6">
            <h2 className="text-base font-semibold">Bắt đầu lại bản xem thử</h2>
            <p className="mb-5 mt-3 text-xs leading-6 text-muted-foreground">
              Khôi phục dự án, bài viết, hộp thư và hồ sơ về dữ liệu mẫu ban đầu.
            </p>
            <Button variant="outline" onClick={() => setConfirm(true)} className="w-full">
              <RotateCcw data-icon="inline-start" />
              Khôi phục nội dung mẫu
            </Button>
          </div>
        </aside>
      </div>
      <Dialog open={confirm} onOpenChange={setConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Khôi phục dữ liệu mẫu?</DialogTitle>
            <DialogDescription>
              Thay đổi nội dung trong bản xem thử trên trình duyệt này sẽ bị thay thế bằng dữ liệu
              mẫu. Không ảnh hưởng dịch vụ bên ngoài.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirm(false)}>
              Giữ thay đổi
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                reset();
                setConfirm(false);
              }}
            >
              Khôi phục
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
