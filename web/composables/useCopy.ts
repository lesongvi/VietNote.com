// All visible copy lives here (vi first, en second, same shape). No emoji; icons are Lucide keys.
// "{term}" inside spoken/note text renders as a highlighted English word.
const copy = {
  vi: {
    skip: 'Chuyển đến nội dung',
    langLabel: 'Switch to English',
    maker: { prefix: 'Từ lập trình viên của', and: 'và' },
    nav: { why: 'Vì sao', example: 'Ví dụ', features: 'Tính năng', progress: 'Tiến độ', join: 'Đăng ký' },
    hero: {
      issue: 'Đang xây dựng · Chưa mở cửa',
      h1a: 'Mọi cuộc họp, mọi video,',
      h1em: 'hiểu trọn',
      h1b: 'bằng tiếng Việt.',
      lead: 'VietNote nghe cuộc họp, bài giảng và video, rồi viết lại thành bản chép lời, tóm tắt và việc cần làm. Làm cho cách nói của người Việt, kể cả khi câu nói pha tiếng Anh.',
      platformsLabel: 'Dự kiến có trên',
      platforms: ['Web', 'Chrome', 'macOS', 'Windows'],
    },
    form: {
      emailLabel: 'Email',
      emailPh: 'ten@congty.com',
      useCaseTitle: 'Bạn định dùng để',
      useCaseLabel: 'Bạn định dùng VietNote để làm gì',
      useCases: [
        { value: '', label: 'Chọn (không bắt buộc)' },
        { value: 'meeting', label: 'Ghi chú cuộc họp', hint: 'Họp nhóm, họp khách hàng' },
        { value: 'lecture', label: 'Học tập và bài giảng', hint: 'Lớp học, webinar' },
        { value: 'video', label: 'Tóm tắt video', hint: 'YouTube, khoá học' },
        { value: 'interview', label: 'Phỏng vấn', hint: 'Tuyển dụng, báo chí, nghiên cứu' },
        { value: 'other', label: 'Khác' },
      ],
      join: 'Đăng ký dùng thử sớm',
      sending: 'Đang gửi…',
      ok: 'Cảm ơn bạn. Chúng tôi sẽ gửi email ngay khi VietNote sẵn sàng.',
      err: 'Chưa gửi được. Bạn kiểm tra lại email rồi thử lần nữa nhé.',
      fine: 'Không spam. Chỉ một email khi ra mắt.',
    },
    note: {
      stamp: 'Ví dụ minh hoạ',
      title: 'Họp sản phẩm, tuần 43',
      lines: [
        { time: '00:12', who: 'Minh', text: 'Mình chốt {deadline} vào thứ Sáu nhé.' },
        { time: '00:19', who: 'Lan', text: 'Ok, phần thiết kế mình gửi bản cuối trước đó.' },
        { time: '00:27', who: 'Minh', text: 'Rồi, tuần sau review {sprint}.' },
      ],
      todoTitle: 'Việc cần làm',
      todos: [
        { text: 'Lan gửi bản thiết kế cuối, trước thứ Sáu', scrawl: 'của Lan' },
        { text: 'Cả nhóm review sprint, tuần sau', scrawl: '' },
      ],
    },
    why: {
      num: '01',
      label: 'Vì sao',
      title: 'Ba nguyên tắc khi làm VietNote.',
      items: [
        { t: 'Tiếng Việt là ưu tiên số một', d: 'Tối ưu cho giọng Bắc, Trung, Nam và những câu pha tiếng Anh như deadline, sprint, feedback. Độ chính xác được đo trên dữ liệu thực tế trước khi ra mắt.', tag: 'Đang đánh giá' },
        { t: 'Thu âm không cần bot', d: 'Ghi âm từ tab trình duyệt hoặc âm thanh máy tính của bạn. Không ai phải mời thêm một trợ lý lạ vào cuộc họp.', tag: 'Kế hoạch' },
        { t: 'Dữ liệu thuộc về bạn', d: 'Nhắc xin phép trước khi ghi, xoá dữ liệu bất cứ lúc nào, và không dùng âm thanh của bạn để huấn luyện nếu bạn không đồng ý.', tag: 'Nguyên tắc' },
      ],
    },
    example: {
      num: '02',
      label: 'Ví dụ',
      title: 'Từ lời nói đến ghi chú.',
      lead: 'Người ta nói không theo văn viết. VietNote giữ ý, bỏ phần thừa.',
      spokenLabel: 'Lời nói',
      noteLabel: 'Ghi chú',
      spoken: [
        { filler: 'Ờ thì', text: 'mình chốt cái {deadline} vào thứ Sáu nha.' },
        { filler: 'À,', text: 'phần thiết kế thì Lan gửi bản cuối trước đó.' },
        { filler: 'Rồi', text: 'tuần sau mình review cái {sprint}.' },
      ],
      decisions: 'Quyết định',
      decisionsList: ['Chốt {deadline} vào thứ Sáu.'],
      todosTitle: 'Việc cần làm',
      todos: ['Lan: gửi bản thiết kế cuối (trước thứ Sáu)', 'Cả nhóm: review {sprint} (tuần sau)'],
      caveat: 'Ví dụ minh hoạ để mô tả cách hoạt động, không phải kết quả thật của sản phẩm.',
    },
    features: {
      num: '03',
      label: 'Tính năng',
      title: 'Những gì chúng tôi đang xây, theo thứ tự ưu tiên.',
      items: [
        { t: 'Chép lời chính xác', d: 'Nhận dạng giọng nói tiếng Việt, tách người nói, gắn mốc thời gian, hiểu cả từ tiếng Anh xen giữa câu.', s: 'now', st: 'Đang làm' },
        { t: 'Tóm tắt và việc cần làm', d: 'Biên bản gọn, quyết định rõ ràng, ai làm gì khi nào, kèm dẫn chứng từ bản chép lời.', s: 'now', st: 'Đang làm' },
        { t: 'Hỏi đáp trên ghi chú', d: 'Hỏi bất cứ điều gì về cuộc họp hay video và nhận câu trả lời có trích dẫn.', s: 'next', st: 'Sắp tới' },
        { t: 'Dịch và xuất file', d: 'Dịch Việt và Anh; xuất Markdown, PDF, Docx, SRT hoặc chia sẻ bằng liên kết.', s: 'next', st: 'Sắp tới' },
        { t: 'Tiện ích Chrome', d: 'Ghi âm tab Google Meet, Zoom web, YouTube và xem bản chép lời trực tiếp ở thanh bên.', s: 'plan', st: 'Dự kiến' },
        { t: 'Ứng dụng macOS và Windows', d: 'Thu cả âm thanh hệ thống và micro, chạy gọn trên thanh menu hoặc khay hệ thống.', s: 'plan', st: 'Dự kiến' },
      ],
    },
    makerSection: {
      num: '04',
      label: 'Người làm',
      body: 'Chúng tôi xây VietNote công khai và báo tiến độ ngay trên trang này. Đăng ký email để được dùng thử trước khi mở cửa.',
      visit: 'Ghé xem',
    },
    progress: {
      num: '05',
      label: 'Tiến độ',
      title: 'Đang ở đâu rồi.',
      steps: [
        { s: 'done', t: 'Trang chờ và danh sách đăng ký sớm', st: 'Xong' },
        { s: 'now', t: 'Đánh giá độ chính xác nhận dạng tiếng Việt', st: 'Đang làm' },
        { s: 'next', t: 'Bản beta: tải file, chép lời, tóm tắt', st: 'Sắp tới' },
        { s: 'plan', t: 'Tiện ích Chrome', st: 'Dự kiến' },
        { s: 'plan', t: 'Ứng dụng macOS và Windows', st: 'Dự kiến' },
      ],
    },
    cta: { title: 'Dùng thử sớm.', lead: 'Để lại email. Chúng tôi sẽ báo ngay khi bản beta sẵn sàng.' },
    foot: '© 2026 VietNote · Đang xây dựng',
  },
  en: {
    skip: 'Skip to content',
    langLabel: 'Chuyển sang tiếng Việt',
    maker: { prefix: 'From the developers of', and: 'and' },
    nav: { why: 'Why', example: 'Example', features: 'Features', progress: 'Progress', join: 'Join' },
    hero: {
      issue: 'In progress · Not open yet',
      h1a: 'Every meeting, every video,',
      h1em: 'fully understood',
      h1b: 'in Vietnamese.',
      lead: 'VietNote listens to meetings, lectures and videos, then writes them up as a transcript, a summary and action items. Built for how Vietnamese people actually speak, English words mixed in included.',
      platformsLabel: 'Planned for',
      platforms: ['Web', 'Chrome', 'macOS', 'Windows'],
    },
    form: {
      emailLabel: 'Email',
      emailPh: 'name@company.com',
      useCaseTitle: 'You would use it for',
      useCaseLabel: 'What you want to use VietNote for',
      useCases: [
        { value: '', label: 'Choose (optional)' },
        { value: 'meeting', label: 'Meeting notes', hint: 'Team and client calls' },
        { value: 'lecture', label: 'Lectures and study', hint: 'Classes, webinars' },
        { value: 'video', label: 'Summarizing videos', hint: 'YouTube, courses' },
        { value: 'interview', label: 'Interviews', hint: 'Hiring, journalism, research' },
        { value: 'other', label: 'Other' },
      ],
      join: 'Get early access',
      sending: 'Sending…',
      ok: "Thank you. We'll email you as soon as VietNote is ready.",
      err: "That didn't go through. Please check your email and try again.",
      fine: 'No spam. One email at launch.',
    },
    note: {
      stamp: 'Sample',
      title: 'Product sync, week 43',
      lines: [
        { time: '00:12', who: 'Minh', text: "Let's lock the {deadline} for Friday." },
        { time: '00:19', who: 'Lan', text: "Ok, I'll send the final design before then." },
        { time: '00:27', who: 'Minh', text: 'Great, we review the {sprint} next week.' },
      ],
      todoTitle: 'Action items',
      todos: [
        { text: 'Lan sends the final design, before Friday', scrawl: "Lan's" },
        { text: 'Whole team reviews the sprint, next week', scrawl: '' },
      ],
    },
    why: {
      num: '01',
      label: 'Why',
      title: 'Three principles behind VietNote.',
      items: [
        { t: 'Vietnamese comes first', d: 'Tuned for Northern, Central and Southern accents and the English mixed into work talk, like deadline, sprint, feedback. Accuracy is measured on real data before launch.', tag: 'Being evaluated' },
        { t: 'Recording without a bot', d: 'Capture audio from a browser tab or your computer. Nobody has to invite a stranger-bot into the meeting.', tag: 'Planned' },
        { t: 'Your data stays yours', d: 'Consent reminders before recording, delete your data any time, and no training on your audio unless you opt in.', tag: 'Principle' },
      ],
    },
    example: {
      num: '02',
      label: 'Example',
      title: 'From speech to notes.',
      lead: "People don't speak the way they write. VietNote keeps the meaning and drops the filler.",
      spokenLabel: 'Speech',
      noteLabel: 'Notes',
      spoken: [
        { filler: 'Um, so', text: "let's lock the {deadline} for Friday." },
        { filler: 'Oh,', text: "Lan sends the final design before that." },
        { filler: 'Right,', text: 'and next week we review the {sprint}.' },
      ],
      decisions: 'Decisions',
      decisionsList: ['{deadline} locked for Friday.'],
      todosTitle: 'Action items',
      todos: ['Lan: send the final design (before Friday)', 'Whole team: review the {sprint} (next week)'],
      caveat: 'An illustration of how it should work, not a real output of the product.',
    },
    features: {
      num: '03',
      label: 'Features',
      title: 'What we are building, in priority order.',
      items: [
        { t: 'Accurate transcription', d: 'Vietnamese speech recognition with speaker labels, timestamps and English words mid-sentence.', s: 'now', st: 'In progress' },
        { t: 'Summaries and action items', d: 'Clean minutes, clear decisions, who does what by when, with citations to the transcript.', s: 'now', st: 'In progress' },
        { t: 'Chat with your notes', d: 'Ask anything about a meeting or video and get answers with citations.', s: 'next', st: 'Next' },
        { t: 'Translate and export', d: 'Vietnamese and English translation; export to Markdown, PDF, Docx, SRT or share a link.', s: 'next', st: 'Next' },
        { t: 'Chrome extension', d: 'Record Google Meet, Zoom web or YouTube tabs and follow a live transcript in the side panel.', s: 'plan', st: 'Planned' },
        { t: 'macOS and Windows apps', d: 'Capture system audio and microphone from the menu bar or system tray.', s: 'plan', st: 'Planned' },
      ],
    },
    makerSection: {
      num: '04',
      label: 'The makers',
      body: 'We build VietNote in the open and post progress right on this page. Leave your email to try it before it opens.',
      visit: 'Visit',
    },
    progress: {
      num: '05',
      label: 'Progress',
      title: 'Where things stand.',
      steps: [
        { s: 'done', t: 'Landing page and early-access waitlist', st: 'Done' },
        { s: 'now', t: 'Benchmarking Vietnamese speech recognition', st: 'In progress' },
        { s: 'next', t: 'Beta: upload a file, transcript, summary', st: 'Next' },
        { s: 'plan', t: 'Chrome extension', st: 'Planned' },
        { s: 'plan', t: 'macOS and Windows apps', st: 'Planned' },
      ],
    },
    cta: { title: 'Try it early.', lead: "Leave your email. We'll tell you the moment the beta is ready." },
    foot: '© 2026 VietNote · In progress',
  },
} as const

export type Locale = keyof typeof copy

export const MAKER_LINKS = [
  { name: 'NoteVN.com', href: 'https://notevn.com' },
  { name: 'NoteOp.com', href: 'https://noteop.com' },
] as const

export const useCopy = () => {
  const locale = useState<Locale>('locale', () => 'vi')
  const t = computed(() => copy[locale.value])
  const toggle = () => {
    locale.value = locale.value === 'vi' ? 'en' : 'vi'
    if (import.meta.client) document.documentElement.lang = locale.value
  }
  return { locale, t, toggle }
}
