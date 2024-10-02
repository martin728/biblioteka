export interface Book {
  id: number | null;
  bookTitle: string;
  year: number | null,
  imgLink: string;
  description: string;
  author: string;
}

export type ViewMode = 'constructor' | 'view' | null
