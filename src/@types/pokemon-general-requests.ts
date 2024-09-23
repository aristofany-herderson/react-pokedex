export type Pokemon = {
  count: number;
  next: string | null;
  previous: null | null;
  results: Result[];
};

export type Abilities = {
  count: number;
  next: string | null;
  previous: null | null;
  results: Result[];
};

export type Result = {
  name: string;
  url: string;
};
