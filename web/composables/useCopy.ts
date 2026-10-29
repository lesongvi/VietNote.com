const copy = {
  vi: {
    badge: 'Đang xây dựng · Sắp ra mắt',
    h1a: 'Mọi cuộc họp, mọi video,',
    h1b: 'hiểu trọn bằng tiếng Việt.',
    lead: 'VietNote là trợ lý ghi chú AI cho người Việt: nghe cuộc họp, bài giảng, video rồi biến thành bản chép lời, tóm tắt và việc cần làm — chính xác với giọng và cách nói tiếng Việt.',
    navFeatures: 'Tính năng',
    navProgress: 'Tiến độ',
    navJoin: 'Đăng ký sớm',
    emailPh: 'Email của bạn',
    useCase: 'Bạn định dùng để…',
    useCases: { '': 'Chọn (không bắt buộc)', meeting: 'Ghi chú cuộc họp', lecture: 'Học tập, bài giảng', video: 'Tóm tắt video', interview: 'Phỏng vấn', other: 'Khác' },
    join: 'Đăng ký dùng thử sớm',
    sending: 'Đang gửi…',
    ok: 'Cảm ơn bạn! Chúng tôi sẽ email ngay khi VietNote sẵn sàng.',
    err: 'Không gửi được. Vui lòng kiểm tra email và thử lại.',
    fine: 'Không spam. Chỉ một email khi ra mắt.',
    note: 'Họp sản phẩm', noteSub: 'Tóm tắt tự động', n1: 'Chốt ra mắt beta vào quý sau', n2: 'Minh gửi báo giá trước thứ Sáu', n3: '3 rủi ro cần theo dõi',
    live: 'Chép lời trực tiếp', liveSub: 'Tiếng Việt + English trong cùng một câu',
    chatQ: 'Cuộc họp hôm qua ai nhận việc gì?', chatA: 'Minh gửi báo giá, Lan chốt thiết kế. Hạn: thứ Sáu.', chatTitle: 'Hỏi ghi chú của bạn',
    todo: 'Việc cần làm', todoSub: 'Tự trích xuất từ cuộc họp', tag: 'Hạn: thứ Sáu',
    fTitle: 'Nghe. Hiểu. Hành động.',
    fSub: 'Những gì chúng tôi đang xây dựng.',
    feats: [
      { i: '🎙️', t: 'Chép lời chính xác', d: 'Tối ưu cho giọng Bắc, Trung, Nam và câu nói pha tiếng Anh thường gặp ở công sở.' },
      { i: '✨', t: 'Tóm tắt & việc cần làm', d: 'Biên bản gọn, quyết định rõ ràng, ai làm gì khi nào — trong vài giây.' },
      { i: '💬', t: 'Hỏi đáp trên ghi chú', d: 'Hỏi bất cứ điều gì về cuộc họp hay video, nhận câu trả lời có dẫn chứng.' },
      { i: '🌐', t: 'Dịch & xuất file', d: 'Dịch Việt ↔ Anh, xuất Markdown, PDF, Docx. Dữ liệu của bạn thuộc về bạn.' },
    ],
    pTitle: 'Tiến độ dự án',
    pSub: 'Chúng tôi xây công khai và ưu tiên người đăng ký sớm.',
    steps: [
      { s: 'done', t: 'Nghiên cứu & chọn mô hình nhận dạng tiếng Việt', d: 'Hoàn thành' },
      { s: 'now', t: 'Xây dựng bản beta: tải file → chép lời → tóm tắt', d: 'Đang thực hiện' },
      { s: '', t: 'Tiện ích Chrome cho họp trực tuyến & video', d: 'Sắp tới' },
      { s: '', t: 'Ứng dụng macOS / Windows', d: 'Dự kiến' },
    ],
    foot: '© 2026 VietNote. Dự án đang được xây dựng.',
  },
  en: {
    badge: 'In progress · Coming soon',
    h1a: 'Every meeting, every video,',
    h1b: 'fully understood in Vietnamese.',
    lead: 'VietNote is an AI note-taker built for Vietnamese: it listens to meetings, lectures and videos, then turns them into transcripts, summaries and action items — accurate with Vietnamese speech.',
    navFeatures: 'Features',
    navProgress: 'Progress',
    navJoin: 'Join waitlist',
    emailPh: 'Your email',
    useCase: 'I want to use it for…',
    useCases: { '': 'Choose (optional)', meeting: 'Meeting notes', lecture: 'Lectures & study', video: 'Summarizing videos', interview: 'Interviews', other: 'Other' },
    join: 'Get early access',
    sending: 'Sending…',
    ok: "Thank you! We'll email you as soon as VietNote is ready.",
    err: "Couldn't submit. Please check your email and try again.",
    fine: 'No spam. One email at launch.',
    note: 'Product sync', noteSub: 'Auto summary', n1: 'Ship beta next quarter', n2: 'Minh sends the quote by Friday', n3: '3 risks to watch',
    live: 'Live transcript', liveSub: 'Vietnamese + English in the same sentence',
    chatQ: 'Who took what in yesterday’s meeting?', chatA: 'Minh sends the quote, Lan finalizes design. Due: Friday.', chatTitle: 'Ask your notes',
    todo: 'Action items', todoSub: 'Extracted from the meeting', tag: 'Due: Friday',
    fTitle: 'Listen. Understand. Act.',
    fSub: "What we're building.",
    feats: [
      { i: '🎙️', t: 'Accurate transcription', d: 'Tuned for Northern, Central and Southern accents and the Vietnamese–English mix common at work.' },
      { i: '✨', t: 'Summaries & action items', d: 'Clean minutes, clear decisions, who does what by when — in seconds.' },
      { i: '💬', t: 'Chat with your notes', d: 'Ask anything about a meeting or video and get answers with citations.' },
      { i: '🌐', t: 'Translate & export', d: 'Vietnamese ↔ English, export to Markdown, PDF, Docx. Your data stays yours.' },
    ],
    pTitle: 'Project status',
    pSub: 'We build in the open and prioritize early sign-ups.',
    steps: [
      { s: 'done', t: 'Research & pick Vietnamese speech models', d: 'Done' },
      { s: 'now', t: 'Beta: upload file → transcript → summary', d: 'In progress' },
      { s: '', t: 'Chrome extension for online meetings & videos', d: 'Next' },
      { s: '', t: 'macOS / Windows apps', d: 'Planned' },
    ],
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
