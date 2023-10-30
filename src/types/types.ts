export interface Props {}

export interface People {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  url?: string;
}

export interface State {
  people: People[];
  isLoading: boolean;
  previous: string;
  next: string;
}
