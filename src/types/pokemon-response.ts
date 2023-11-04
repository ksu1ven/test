interface PokemonResponse {
  name: string;
  weight: number;
  height: number;
  abilities: string[];
  image: Image[];
  isDefault: boolean;
}

interface Image {
  type: string;
  url: string | null;
}

export default PokemonResponse;
