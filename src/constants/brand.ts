/** Public-facing brand — update store listings when these change. */
export const BRAND = {
  /** Play Store / App Store display name (max ~30 chars) */
  appName: 'NeuraLearn AI',
  /** One-line tagline shown in app hero sections */
  tagline: 'Learn Python · AI · Machine Learning',
  /** SEO short description (~80 chars for Play Store) */
  shortDescription:
    'Learn Python, AI, ML, Deep Learning & GenAI with theory, quizzes, labs & playground.',
  /** Notification / system fallback title */
  notificationTitle: 'NeuraLearn AI',
  /** Drawer subtitle */
  drawerSubtitle: 'Python & AI Learning Lab',
  /** Watermark text for screenshots & feature graphic */
  watermark: 'NeuraLearn AI',
  /** Support messages */
  supportMessage: 'Hi, I need help with NeuraLearn AI app',
  whatsappHelpPrompt: 'Stuck on a lesson? Chat with us — we reply fast on WhatsApp.',
} as const;
