import { z } from "zod";
export const domains = ["AI & Computer Vision", "Data & Automation", "Enterprise Systems"] as const;
export const categories = ["Tech PM Handbook", "Automation & n8n", "Data & AI"] as const;
export const competencies = ["Agile Delivery", "Risk Management", "System Architecture"] as const;
export const projectSchema = z.object({
  id: z.string(),
  slug: z
    .string()
    .min(2, "Nhập ít nhất 2 ký tự.")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug chỉ gồm chữ thường, số và dấu gạch ngang."),
  title: z.string().min(3, "Nhập ít nhất 3 ký tự."),
  tagline: z.string().min(10, "Nhập ít nhất 10 ký tự."),
  domain: z.enum(domains),
  role: z.string().min(2, "Nhập ít nhất 2 ký tự."),
  timeline: z.string(),
  teamSize: z.string(),
  methodology: z.string(),
  tech: z.array(z.string()),
  competencies: z.array(z.string()),
  summary: z.string().min(10, "Nhập ít nhất 10 ký tự."),
  problem: z.string(),
  architecture: z.string(),
  lessons: z.string(),
  metrics: z.array(z.object({ label: z.string(), value: z.string(), source: z.string() })),
  risks: z.array(
    z.object({
      risk: z.string(),
      severity: z.enum(["High", "Medium", "Low"]),
      mitigation: z.string(),
    }),
  ),
  cover: z.string(),
  published: z.boolean(),
  featured: z.boolean(),
  demo: z.boolean(),
});
export type Project = z.infer<typeof projectSchema>;
export const articleSchema = z.object({
  id: z.string(),
  slug: z
    .string()
    .min(2, "Nhập ít nhất 2 ký tự.")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug chỉ gồm chữ thường, số và dấu gạch ngang."),
  title: z.string().min(3, "Nhập ít nhất 3 ký tự."),
  summary: z.string().min(10, "Nhập ít nhất 10 ký tự."),
  category: z.enum(categories),
  content: z.string().min(20, "Nhập ít nhất 20 ký tự."),
  readTime: z.number().min(1).max(120),
  published: z.boolean(),
  demo: z.boolean(),
});
export type Article = z.infer<typeof articleSchema>;
export const inquirySchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  company: z.string(),
  purpose: z.string(),
  message: z.string(),
  status: z.enum(["new", "contacted", "archived"]),
  date: z.string(),
  demo: z.boolean(),
});
export type Inquiry = z.infer<typeof inquirySchema>;
const safeLink = z
  .string()
  .url()
  .refine((s) => s.startsWith("https://"), "Dùng liên kết https://.")
  .or(z.literal(""));
export const profileSchema = z.object({
  name: z.string().min(2, "Nhập ít nhất 2 ký tự."),
  title: z.string().min(2, "Nhập ít nhất 2 ký tự."),
  bio: z.string(),
  email: z.string().email().or(z.literal("")),
  linkedin: safeLink,
  github: safeLink,
  location: z.string(),
  resume: z
    .string()
    .refine(
      (s) => s === "" || s.startsWith("data:application/pdf;base64,"),
      "Chọn tệp CV ở định dạng PDF.",
    ),
});
export type Profile = z.infer<typeof profileSchema>;
export const contentSchema = z.object({
  version: z.literal(1),
  projects: z.array(projectSchema),
  articles: z.array(articleSchema),
  inquiries: z.array(inquirySchema),
  profile: profileSchema,
});
export type Content = z.infer<typeof contentSchema>;
export const emptyProject = (): Project => ({
  id: crypto.randomUUID(),
  slug: "",
  title: "",
  tagline: "",
  domain: domains[0],
  role: "",
  timeline: "",
  teamSize: "",
  methodology: "Agile / Scrum",
  tech: [],
  competencies: [],
  summary: "",
  problem: "",
  architecture: "flowchart LR\n A[Nguồn dữ liệu] --> B[Xử lý]\n B --> C[Kết quả]",
  lessons: "",
  metrics: [],
  risks: [],
  cover: "",
  published: false,
  featured: false,
  demo: true,
});
export const emptyArticle = (): Article => ({
  id: crypto.randomUUID(),
  slug: "",
  title: "",
  summary: "",
  category: categories[0],
  content: "",
  readTime: 5,
  published: false,
  demo: true,
});
const drafts = [
  [
    "vision-pipeline",
    "Computer Vision Pipeline",
    "Từ dữ liệu hình ảnh đến một luồng xử lý có thể kiểm soát.",
    domains[0],
    ["Python", "OpenCV", "FastAPI"],
  ],
  [
    "automation-hub",
    "Automation Operations Hub",
    "Kết nối nguồn dữ liệu, tự động hóa quy trình và theo dõi ngoại lệ.",
    domains[1],
    ["n8n", "PostgreSQL", "Python"],
  ],
  [
    "enterprise-platform",
    "Enterprise Data Platform",
    "Phác thảo nền tảng dữ liệu với trách nhiệm và luồng tích hợp rõ ràng.",
    domains[2],
    ["PostgreSQL", "Next.js", "Supabase"],
  ],
  [
    "document-intelligence",
    "Document Intelligence",
    "Thiết kế quy trình tiếp nhận, phân loại và kiểm tra tài liệu.",
    domains[0],
    ["Python", "OCR", "FastAPI"],
  ],
  [
    "workflow-monitor",
    "Workflow Monitor",
    "Một không gian theo dõi công việc và các điểm cần can thiệp.",
    domains[1],
    ["n8n", "Webhooks", "Jira"],
  ],
  [
    "delivery-workspace",
    "Delivery Workspace",
    "Đưa mục tiêu, tiến độ và quyết định vào cùng một góc nhìn.",
    domains[2],
    ["Next.js", "TypeScript", "Supabase"],
  ],
] as const;
export const initialContent: Content = {
  version: 1,
  profile: {
    name: "Tran Trinh",
    title: "Technical Project Manager",
    bio: "Tôi quan tâm đến giao điểm giữa quản trị dự án, AI, dữ liệu và tư duy hệ thống. Đây là không gian chia sẻ cách tiếp cận vấn đề, tổ chức công việc và biến ý tưởng kỹ thuật thành giá trị thực tế.",
    email: "",
    linkedin: "",
    github: "https://github.com/TranTrinhMavis273",
    location: "",
    resume: "",
  },
  projects: drafts.map(([slug, title, tagline, domain, tech], i) => ({
    id: `sample-project-${i + 1}`,
    slug,
    title,
    tagline,
    domain,
    tech: [...tech],
    role: "Chưa cập nhật",
    timeline: "Chưa cập nhật",
    teamSize: "Chưa cập nhật",
    methodology: "Agile / Scrum",
    competencies: [competencies[i % 3], competencies[(i + 1) % 3]],
    summary:
      "Case study mẫu mô tả cấu trúc trình bày một dự án Technical PM: từ bối cảnh và mục tiêu, đến kiến trúc, quản trị rủi ro và bài học. Nội dung này phục vụ việc xem thử giao diện, chưa đại diện cho dự án thực tế của chủ website.",
    problem:
      "Làm thế nào để chuyển một nhu cầu chưa rõ ràng thành phạm vi công việc, luồng dữ liệu và tiêu chí chấp nhận có thể kiểm tra? Phần này sẽ được thay thế bằng bối cảnh và các ràng buộc thực tế của dự án.",
    architecture:
      "flowchart LR\n A[Nguồn dữ liệu] --> B[Kiểm tra đầu vào]\n B --> C{Hợp lệ?}\n C -->|Có| D[Xử lý / AI]\n C -->|Không| E[Kiểm tra thủ công]\n D --> F[Lưu trữ]\n F --> G[Báo cáo / Kết quả]",
    lessons:
      "Làm rõ tiêu chí hoàn thành trước khi triển khai. Ghi lại quyết định và giả định. Thiết kế các điểm kiểm tra để phát hiện vấn đề sớm. Bài học và tác động thực tế sẽ được bổ sung cùng bằng chứng của dự án.",
    metrics: [],
    risks: [
      {
        risk: "Tình huống minh họa: dữ liệu đầu vào không đồng nhất",
        severity: "Medium",
        mitigation: "Thống nhất schema và kiểm tra dữ liệu trước khi xử lý.",
      },
    ],
    cover: "",
    published: true,
    featured: i < 3,
    demo: true,
  })),
  articles: [
    {
      id: "sample-article-1",
      slug: "bat-dau-du-an-ai-tu-bai-toan",
      title: "Dự án AI nên bắt đầu từ bài toán nào?",
      summary:
        "Một khung suy nghĩ để kết nối nhu cầu, dữ liệu và tiêu chí chấp nhận trước khi bắt tay vào mô hình.",
      category: "Tech PM Handbook",
      readTime: 5,
      published: true,
      demo: true,
      content:
        "## Bắt đầu từ điều cần thay đổi\n\nTrước khi lựa chọn công nghệ, hãy viết ra quyết định hoặc công việc mà hệ thống cần hỗ trợ. Một mục tiêu rõ giúp cả nhóm hiểu vì sao dự án tồn tại.\n\n> Công nghệ là một phần của giải pháp. Bài toán và cách kiểm chứng giá trị mới định hướng công việc.\n\n## Làm rõ dữ liệu và ràng buộc\n\n- Dữ liệu đến từ đâu và ai chịu trách nhiệm?\n- Những ngoại lệ nào cần con người xử lý?\n- Phạm vi nào chưa thuộc giai đoạn đầu tiên?\n\n## Thống nhất tiêu chí chấp nhận\n\nGhi lại tiêu chí, người xác nhận và cách kiểm tra. Tách chất lượng kỹ thuật khỏi mức độ phù hợp với quy trình sử dụng.\n\n## Mang quyết định vào tài liệu sống\n\nCập nhật giả định khi có thông tin mới. Mỗi thay đổi đáng kể nên có bối cảnh, phương án đã cân nhắc và lý do lựa chọn.",
    },
    {
      id: "sample-article-2",
      slug: "thiet-ke-workflow-co-kiem-soat",
      title: "Tự động hóa cần một đường quay lại",
      summary:
        "Cách nhìn về ngoại lệ, khả năng quan sát và vai trò của con người trong một workflow tự động.",
      category: "Automation & n8n",
      readTime: 4,
      published: true,
      demo: true,
      content:
        "## Nhìn workflow như một hệ thống\n\nMỗi bước cần có đầu vào, đầu ra và điều kiện hoàn thành rõ ràng. Đừng chỉ mô tả đường đi khi mọi thứ đúng như mong đợi.\n\n## Thiết kế cho ngoại lệ\n\nTách lỗi có thể thử lại khỏi lỗi cần kiểm tra thủ công. Lưu đủ bối cảnh để người vận hành hiểu chuyện gì đã xảy ra.\n\n## Giữ người dùng trong vòng phản hồi\n\nMột trạng thái rõ ràng và hành động tiếp theo cụ thể giúp người dùng tiếp tục công việc khi quy trình dừng.\n\n## Đo lường sau khi có baseline\n\nXác định nguồn đo trước khi đưa ra các nhận định về thời gian hoặc chất lượng. Chỉ công bố kết quả khi có bằng chứng phù hợp.",
    },
    {
      id: "sample-article-3",
      slug: "so-do-kien-truc-de-doi-thoai",
      title: "Sơ đồ kiến trúc là một công cụ đối thoại",
      summary:
        "Dùng luồng dữ liệu và ranh giới hệ thống để làm rõ trách nhiệm, tích hợp và quyết định dự án.",
      category: "Data & AI",
      readTime: 6,
      published: true,
      demo: true,
      content:
        "## Vẽ đúng mức chi tiết\n\nMột sơ đồ hữu ích phải trả lời được câu hỏi của người đọc. Bắt đầu bằng các thành phần chính và ranh giới trách nhiệm.\n\n## Làm nổi bật luồng dữ liệu\n\nGhi tên dữ liệu, điều kiện chuyển bước và các điểm kiểm tra quan trọng. Phân biệt xử lý tự động với công việc thủ công.\n\n## Ghi lại điều chưa biết\n\nMột giả định được đánh dấu rõ tốt hơn một khoảng trống được hiểu nhầm là đã thống nhất.\n\n## Cập nhật cùng quyết định\n\nKhi giải pháp thay đổi, cập nhật sơ đồ và ghi lại lý do. Giữ tài liệu gần với cách hệ thống thật sự hoạt động.",
    },
  ],
  inquiries: [
    {
      id: "sample-inquiry-1",
      name: "Người gửi minh họa",
      email: "hello@example.com",
      company: "Tổ chức minh họa",
      purpose: "Cơ hội nghề nghiệp",
      message:
        "Đây là lời nhắn mẫu để xem bố cục hộp thư. Bạn có thể thử đổi trạng thái, lưu trữ và tìm kiếm. Không có email thật nào được gửi từ các thao tác xem thử này.",
      status: "new",
      date: "2026-10-30",
      demo: true,
    },
  ],
};
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Vui lòng nhập họ tên.").max(120),
  email: z.string().trim().email("Email chưa hợp lệ.").max(254),
  company: z.string().trim().max(200).default(""),
  purpose: z.enum(
    ["Cơ hội nghề nghiệp", "Dự án hợp tác", "Sự kiện / Chia sẻ", "Kết nối chuyên môn"],
    { error: "Chọn mục đích liên hệ." },
  ),
  message: z.string().trim().min(20, "Nội dung cần ít nhất 20 ký tự.").max(5000),
  token: z.string().max(4096).optional(),
  website: z.string().max(200).optional(),
});
