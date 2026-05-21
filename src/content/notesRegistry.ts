import type { LibraryId } from '../types/course';

export type NoteEntry = {
  courseId: LibraryId;
  title: string;
  pdfUri: string; // URL to the PDF (can be online or local file:// path)
};

/**
 * Registry of available PDF notes per course.
 * 
 * To add notes for a new course:
 * 1. Place your PDF in src/notes/<courseId>/
 * 2. Host it online (e.g. GitHub raw URL, Google Drive direct link, or your own server)
 * 3. Add an entry below with the public URL
 * 
 * For offline/bundled PDFs, set pdfUri to a file:// path — the viewer
 * will offer to open it with the device's native PDF reader.
 */
export const notesRegistry: Record<string, NoteEntry> = {
  numpy: {
    courseId: 'numpy',
    title: 'NumPy Complete Notes',
    pdfUri: 'https://drive.google.com/file/d/1ADh60XJhsRvCnW72xcwHhcVS0Yt4aEDu/view?usp=sharing',
  },
  // Add other courses here as their PDFs become available:
  // 'python-basics': {
  //   courseId: 'python-basics',
  //   title: 'Python Basics Notes',
  //   pdfUri: 'https://your-server.com/notes/python-basics.pdf',
  // },
};
