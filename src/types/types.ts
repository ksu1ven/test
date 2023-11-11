export interface Hero {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  url?: string;
}

export interface HeroList {
  name: string;
  url?: string;
}

export interface Data {
  count: number;
  next: string | null;
  previous: string | null;
  results: Hero[];
}
