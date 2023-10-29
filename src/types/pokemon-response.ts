interface PokemonResponse {
  name: string;
  weight: number;
  height: number;
  abilities: string[];
  image: string | null;
}

export default PokemonResponse;
