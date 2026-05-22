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
    pdfUri: 'https://drive.google.com/file/d/17Pce0SOFCuF_MvjNGFgPK4Cu79svLQAo/view?usp=sharing',
  },
  'python-basics': {
    courseId: 'python-basics',
    title: 'Python Basics Notes',
    pdfUri: 'https://drive.google.com/file/d/1zaarOURpRMiVRgy0SW6wydLxqOPexYeW/view?usp=sharing',
  },
  'python-advanced': {
    courseId: 'python-advanced',
    title: 'Python Advanced Notes',
    pdfUri: 'https://drive.google.com/file/d/1H1FgdJrUNEe5CYNRE11Px12PlCRQUO6L/view?usp=sharing',
  },
  pandas: {
    courseId: 'pandas',
    title: 'Pandas Complete Notes',
    pdfUri: 'https://drive.google.com/file/d/1QUfoZQbyUOq9-vywqpMJVspSn0GomGqd/view?usp=sharing',
  },
  matplotlib: {
    courseId: 'matplotlib',
    title: 'Matplotlib Complete Notes',
    pdfUri: 'https://drive.google.com/file/d/1YpofzQygtCEKFLtVjVOBlIq53j-f5cDM/view?usp=sharing',
  },
};
