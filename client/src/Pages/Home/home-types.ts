export interface noteListApiData {
  notes: Array<Note>;
}

export interface Note {
  id: number;
  title: string;
  description: string;
  date: string;
  category: Array<Category>;
}

export interface Category {
  id: number;
  name: string;
}
