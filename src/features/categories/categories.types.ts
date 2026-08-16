export type Category = {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  createdAt: string;
  updated: string;
};

export type CategoryState = {
  categories: Category[];
  isFetched: boolean;
  loading: boolean;
  error: string | null;
};
