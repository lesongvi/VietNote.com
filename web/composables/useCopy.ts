// All visible copy lives here (vi first, en second). Icon fields are Lucide icon keys, never emoji.
// Text wrapped in {braces} inside `mock.lines` is rendered as a highlighted English term.
const copy = {
  vi: {
    skip: 'Chuyển đến nội dung',
    nav: { features: 'Tính năng', how: 'Cách hoạt động', progress: 'Tiến độ', join: 'Đăng ký sớm' },
    langLabel: 'Switch to English',
    hero: {
      eyebrow: 'Trợ lý ghi chú AI cho tiếng Việt',
      status: 'Đang xây dựng',
      h1a: 'Mọi cuộc họp, mọi video,',
      h1b: 'hiểu trọn bằng tiếng Việt.',
      lead: 'VietNote nghe cuộc họp, bài giảng và video, rồi biến thành bản chép lời, tóm tắt và việc cần làm. Chính xác với giọng nói và cách nói tiếng Việt, kể cả khi pha tiếng Anh.',
      cta: 'Đăng ký dùng thử sớm',
      stats: [
        { n: '4', t: 'nền tảng dự kiến', d: 'Web, Chrome, macOS và Windows' },
        { n: '2', t: 'ngôn ngữ', d: 'Tiếng Việt và English trong cùng một câu' },
        { n: '0', t: 'bot vào cuộc họp', d: 'Thu âm ngay trên thiết bị của bạn' },
      ],
    },
    form: {
      emailPh: 'Email của bạn',
      useCaseLabel: 'Bạn định dùng VietNote để làm gì',
      useCases: [
        { value: '', label: 'Mục đích (tuỳ chọn)' },
        { value: 'meeting', label: 'Ghi chú cuộc họp', hint: 'Họp nhóm, họp khách hàng' },
        { value: 'lecture', label: 'Học tập và bài giảng', hint: 'Lớp học, webinar' },
        { value: 'video', label: 'Tóm tắt video', hint: 'YouTube, khoá học' },
        { value: 'interview', label: 'Phỏng vấn', hint: 'Tuyển dụng, báo chí, nghiên cứu' },
        { value: 'other', label: 'Khác' },
      ],
      join: 'Đăng ký dùng thử sớm',
      sending: 'Đang gửi…',
      ok: 'Cảm ơn bạn! Chúng tôi sẽ email ngay khi VietNote sẵn sàng.',
      err: 'Không gửi được. Vui lòng kiểm tra email và thử lại.',
      fine: 'Không spam. Chỉ một email khi ra mắt.',
    },
    mock: {
      sample: 'Dữ liệu minh hoạ',
      title: 'Họp sản phẩm, tuần 43',
      live: 'Đang ghi',
      transcript: 'Bản chép lời',
      summary: 'Tóm tắt',
      actions: 'Việc cần làm',
      nav: ['Ghi chú', 'Thư viện', 'Việc cần làm', 'Cài đặt'],
      lines: [
        { who: 'Minh', time: '00:12', text: 'Mình chốt {deadline} vào thứ Sáu nhé.' },
        { who: 'Lan', time: '00:19', text: 'Ok, phần thiết kế mình gửi bản cuối trước đó.' },
        { who: 'Minh', time: '00:27', text: 'Rồi, sau đó review {sprint} vào tuần sau.' },
      ],
      bullets: ['Chốt hạn giao vào thứ Sáu', 'Review sprint tuần sau'],
      tasks: [
        { who: 'Minh', what: 'Gửi báo giá', due: 'Thứ Sáu' },
        { who: 'Lan', what: 'Chốt thiết kế', due: 'Thứ Sáu' },
      ],
    },
    why: {
      eyebrow: 'Vì sao là VietNote',
      title: 'Ba điều làm nên VietNote.',
      items: [
        { t: 'Tiếng Việt là ưu tiên số một', d: 'Tối ưu cho giọng Bắc, Trung, Nam và câu nói pha tiếng Anh như deadline, sprint, feedback. Độ chính xác được đo trên dữ liệu thực tế trước khi ra mắt.', tag: 'Đang đánh giá' },
        { t: 'Thu âm không cần bot', d: 'Ghi âm từ tab trình duyệt hoặc âm thanh máy tính của bạn. Không ai phải mời thêm một trợ lý lạ vào cuộc họp.', tag: 'Kế hoạch' },
        { t: 'Dữ liệu thuộc về bạn', d: 'Nhắc xin phép trước khi ghi, xoá dữ liệu bất cứ lúc nào, và không dùng âm thanh của bạn để huấn luyện nếu bạn không đồng ý.', tag: 'Nguyên tắc' },
      ],
    },
    how: {
      eyebrow: 'Cách hoạt động',
      title: 'Mọi nguồn âm thanh, một nơi ghi chú.',
      sourcesLabel: 'Nguồn',
      outputsLabel: 'Kết quả',
      sources: [
        { i: 'users', t: 'Cuộc họp' },
        { i: 'graduation', t: 'Bài giảng' },
        { i: 'video', t: 'Video' },
        { i: 'mic', t: 'Ghi âm' },
      ],
      hub: { t: 'VietNote', d: 'Chép lời, tóm tắt, hỏi đáp' },
      outputs: [
        { i: 'file', t: 'Bản chép lời' },
        { i: 'sparkles', t: 'Tóm tắt' },
        { i: 'check', t: 'Việc cần làm' },
        { i: 'message', t: 'Hỏi đáp' },
      ],
    },
    product: {
      eyebrow: 'Chi tiết sản phẩm',
      title: 'Từ lúc ghi âm đến việc cần làm, mỗi bước đều có công cụ.',
      lead: 'Sáu mảng chúng tôi đang xây dựng, theo thứ tự ưu tiên.',
      modules: [
        { i: 'mic', t: 'Chép lời chính xác', d: 'Nhận dạng giọng nói tiếng Việt, tách người nói, gắn mốc thời gian, hiểu cả từ tiếng Anh xen giữa câu.', tag: 'Đang xây dựng' },
        { i: 'sparkles', t: 'Tóm tắt và việc cần làm', d: 'Biên bản gọn, quyết định rõ ràng, ai làm gì khi nào, kèm dẫn chứng từ bản chép lời.', tag: 'Đang xây dựng' },
        { i: 'message', t: 'Hỏi đáp trên ghi chú', d: 'Hỏi bất cứ điều gì về cuộc họp hay video và nhận câu trả lời có trích dẫn.', tag: 'Sắp tới' },
        { i: 'languages', t: 'Dịch và xuất file', d: 'Dịch Việt và Anh, xuất Markdown, PDF, Docx, SRT hoặc chia sẻ bằng liên kết.', tag: 'Sắp tới' },
        { i: 'puzzle', t: 'Tiện ích Chrome', d: 'Ghi âm tab Google Meet, Zoom web, YouTube và xem bản chép lời trực tiếp ở thanh bên.', tag: 'Dự kiến' },
        { i: 'monitor', t: 'Ứng dụng macOS và Windows', d: 'Thu cả âm thanh hệ thống và micro, chạy gọn trên thanh menu hoặc khay hệ thống.', tag: 'Dự kiến' },
      ],
    },
    band: {
      eyebrow: 'Bảng điều khiển',
      title: 'Mọi cuộc họp, mọi ghi chú, trong một giao diện.',
      lead: 'Bản minh hoạ giao diện đang được phát triển.',
      points: [
        { i: 'audio', t: 'Chép lời trực tiếp', d: 'Xem chữ hiện ra khi mọi người đang nói.' },
        { i: 'zap', t: 'Tóm tắt tức thì', d: 'Có biên bản và việc cần làm ngay khi kết thúc.' },
        { i: 'search', t: 'Tìm lại mọi thứ', d: 'Tìm theo từ khoá hoặc hỏi bằng câu tự nhiên.' },
      ],
    },
    progress: {
      eyebrow: 'Tiến độ',
      title: 'Chúng tôi xây công khai.',
      lead: 'Người đăng ký sớm sẽ được dùng thử trước.',
      status: { done: 'Hoàn thành', now: 'Đang thực hiện', next: 'Sắp tới', plan: 'Dự kiến' },
      steps: [
        { s: 'done', t: 'Trang chờ và danh sách đăng ký sớm' },
        { s: 'now', t: 'Đánh giá độ chính xác nhận dạng tiếng Việt' },
        { s: 'next', t: 'Bản beta: tải file, chép lời, tóm tắt' },
        { s: 'plan', t: 'Tiện ích Chrome, ứng dụng macOS và Windows' },
      ],
    },
    cta: { title: 'Là người đầu tiên dùng VietNote.', lead: 'Để lại email, chúng tôi sẽ báo ngay khi bản beta sẵn sàng.' },
    foot: '© 2026 VietNote. Dự án đang được xây dựng.',
  },
  en: {
    skip: 'Skip to content',
    nav: { features: 'Features', how: 'How it works', progress: 'Progress', join: 'Join waitlist' },
    langLabel: 'Chuyển sang tiếng Việt',
    hero: {
      eyebrow: 'AI note-taker for Vietnamese',
      status: 'In progress',
      h1a: 'Every meeting, every video,',
      h1b: 'fully understood in Vietnamese.',
      lead: 'VietNote listens to meetings, lectures and videos, then turns them into transcripts, summaries and action items. Accurate with Vietnamese speech, even when English is mixed in.',
      cta: 'Get early access',
      stats: [
        { n: '4', t: 'planned platforms', d: 'Web, Chrome, macOS and Windows' },
        { n: '2', t: 'languages', d: 'Vietnamese and English in the same sentence' },
        { n: '0', t: 'bots in your meeting', d: 'Records right on your own device' },
      ],
    },
    form: {
      emailPh: 'Your email',
      useCaseLabel: 'What you want to use VietNote for',
      useCases: [
        { value: '', label: 'Use case (optional)' },
        { value: 'meeting', label: 'Meeting notes', hint: 'Team and client calls' },
        { value: 'lecture', label: 'Lectures and study', hint: 'Classes, webinars' },
        { value: 'video', label: 'Summarizing videos', hint: 'YouTube, courses' },
        { value: 'interview', label: 'Interviews', hint: 'Hiring, journalism, research' },
        { value: 'other', label: 'Other' },
      ],
      join: 'Get early access',
      sending: 'Sending…',
      ok: "Thank you! We'll email you as soon as VietNote is ready.",
      err: "Couldn't submit. Please check your email and try again.",
      fine: 'No spam. One email at launch.',
    },
    mock: {
      sample: 'Sample data',
      title: 'Product sync, week 43',
      live: 'Recording',
      transcript: 'Transcript',
      summary: 'Summary',
      actions: 'Action items',
      nav: ['Notes', 'Library', 'Action items', 'Settings'],
      lines: [
        { who: 'Minh', time: '00:12', text: "Let's lock the {deadline} for Friday." },
        { who: 'Lan', time: '00:19', text: "Ok, I'll send the final design before then." },
        { who: 'Minh', time: '00:27', text: 'Great, then we review the {sprint} next week.' },
      ],
      bullets: ['Delivery deadline set for Friday', 'Sprint review next week'],
      tasks: [
        { who: 'Minh', what: 'Send the quote', due: 'Friday' },
        { who: 'Lan', what: 'Finalize design', due: 'Friday' },
      ],
    },
    why: {
      eyebrow: 'Why VietNote',
      title: 'Three things that make VietNote work.',
      items: [
        { t: 'Vietnamese comes first', d: 'Tuned for Northern, Central and Southern accents and the English mixed into work talk, like deadline, sprint, feedback. Accuracy is measured on real data before launch.', tag: 'Being evaluated' },
        { t: 'Recording without a bot', d: 'Capture audio from a browser tab or your computer. Nobody has to invite a stranger-bot into the meeting.', tag: 'Planned' },
        { t: 'Your data stays yours', d: 'Consent reminders before recording, delete your data any time, and no training on your audio unless you opt in.', tag: 'Principle' },
      ],
    },
    how: {
      eyebrow: 'How it works',
      title: 'Every audio source, one place for notes.',
      sourcesLabel: 'Sources',
      outputsLabel: 'Results',
      sources: [
        { i: 'users', t: 'Meetings' },
        { i: 'graduation', t: 'Lectures' },
        { i: 'video', t: 'Videos' },
        { i: 'mic', t: 'Voice notes' },
      ],
      hub: { t: 'VietNote', d: 'Transcribe, summarize, ask' },
      outputs: [
        { i: 'file', t: 'Transcript' },
        { i: 'sparkles', t: 'Summary' },
        { i: 'check', t: 'Action items' },
        { i: 'message', t: 'Q&A' },
      ],
    },
    product: {
      eyebrow: 'Product depth',
      title: 'From recording to action items, every step has a tool.',
      lead: 'Six areas we are building, in priority order.',
      modules: [
        { i: 'mic', t: 'Accurate transcription', d: 'Vietnamese speech recognition with speaker labels, timestamps and English words mid-sentence.', tag: 'In progress' },
        { i: 'sparkles', t: 'Summaries and action items', d: 'Clean minutes, clear decisions, who does what by when, with citations to the transcript.', tag: 'In progress' },
        { i: 'message', t: 'Chat with your notes', d: 'Ask anything about a meeting or video and get answers with citations.', tag: 'Next' },
        { i: 'languages', t: 'Translate and export', d: 'Vietnamese and English translation; export to Markdown, PDF, Docx, SRT or share a link.', tag: 'Next' },
        { i: 'puzzle', t: 'Chrome extension', d: 'Record Google Meet, Zoom web or YouTube tabs and follow a live transcript in the side panel.', tag: 'Planned' },
        { i: 'monitor', t: 'macOS and Windows apps', d: 'Capture system audio and microphone from the menu bar or system tray.', tag: 'Planned' },
      ],
    },
    band: {
      eyebrow: 'Dashboard',
      title: 'Every meeting, every note, in one interface.',
      lead: 'A mock-up of the interface under development.',
      points: [
        { i: 'audio', t: 'Live transcript', d: 'Watch the text appear while people speak.' },
        { i: 'zap', t: 'Instant summary', d: 'Minutes and action items the moment you finish.' },
        { i: 'search', t: 'Find anything', d: 'Search by keyword or ask in plain language.' },
      ],
    },
    progress: {
      eyebrow: 'Progress',
      title: 'We build in the open.',
      lead: 'Early sign-ups get access first.',
      status: { done: 'Done', now: 'In progress', next: 'Next', plan: 'Planned' },
      steps: [
        { s: 'done', t: 'Landing page and early-access waitlist' },
        { s: 'now', t: 'Benchmarking Vietnamese speech recognition accuracy' },
        { s: 'next', t: 'Beta: upload a file, transcript, summary' },
        { s: 'plan', t: 'Chrome extension, macOS and Windows apps' },
      ],
    },
    cta: { title: 'Be the first to use VietNote.', lead: "Leave your email and we'll tell you the moment the beta is ready." },
    foot: '© 2026 VietNote. This project is under construction.',
  },
} as const

export type Locale = keyof typeof copy

export const useCopy = () => {
  const locale = useState<Locale>('locale', () => 'vi')
  const t = computed(() => copy[locale.value])
  const toggle = () => {
    locale.value = locale.value === 'vi' ? 'en' : 'vi'
    if (import.meta.client) document.documentElement.lang = locale.value
  }
  return { locale, t, toggle }
}
