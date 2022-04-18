
export interface AppBook {
  id: number;
  changeDate: string;
  title: string;
  publishDate: string;
  description: string;
  authors: string;
}

export interface ValueChange {
  old?: string;
  new: string;
}

export interface AppBookChange {
  changeDate: string;
  title?: ValueChange;
  publishDate?: ValueChange;
  description?: ValueChange;
  authors?: ValueChange;
}
