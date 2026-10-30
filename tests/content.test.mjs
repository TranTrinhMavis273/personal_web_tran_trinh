import test from "node:test";
import assert from "node:assert/strict";
import {
  contactSchema,
  contentSchema,
  initialContent,
  profileSchema,
  projectSchema,
} from "../lib/content.ts";

const validContact = {
  name: "Người liên hệ",
  email: "person@example.com",
  company: "",
  purpose: "Cơ hội nghề nghiệp",
  message: "Tôi muốn trao đổi thêm về một cơ hội hợp tác phù hợp.",
  token: "test-token",
};

test("contact accepts a complete message and trims input", () => {
  const result = contactSchema.parse({ ...validContact, name: "  Người liên hệ  " });
  assert.equal(result.name, "Người liên hệ");
});
test("contact rejects invalid email, short message, and unknown purpose", () => {
  for (const change of [{ email: "not-an-email" }, { message: "short" }, { purpose: "unknown" }]) {
    assert.equal(contactSchema.safeParse({ ...validContact, ...change }).success, false);
  }
});
test("contact bounds message and identity input sizes", () => {
  assert.equal(
    contactSchema.safeParse({ ...validContact, message: "a".repeat(5001) }).success,
    false,
  );
  assert.equal(contactSchema.safeParse({ ...validContact, name: "a".repeat(121) }).success, false);
});
test("profile rejects executable URLs and non-PDF resume payloads", () => {
  assert.equal(
    profileSchema.safeParse({ ...initialContent.profile, linkedin: "javascript:alert(1)" }).success,
    false,
  );
  assert.equal(
    profileSchema.safeParse({
      ...initialContent.profile,
      resume: "data:text/html,<script>alert(1)</script>",
    }).success,
    false,
  );
  assert.equal(
    profileSchema.safeParse({
      ...initialContent.profile,
      resume: "data:application/pdf;base64,JVBERi0=",
    }).success,
    true,
  );
});
test("saved content is validated and rejects incompatible or malformed records", () => {
  assert.equal(contentSchema.safeParse(initialContent).success, true);
  assert.equal(contentSchema.safeParse({ ...initialContent, version: 2 }).success, false);
  assert.equal(
    contentSchema.safeParse({ ...initialContent, projects: [{ title: "Incomplete" }] }).success,
    false,
  );
});
test("project slug cannot contain path traversal or whitespace", () => {
  for (const slug of ["../admin", "with space", "invalid/path", "Uppercase"]) {
    assert.equal(projectSchema.safeParse({ ...initialContent.projects[0], slug }).success, false);
  }
});
