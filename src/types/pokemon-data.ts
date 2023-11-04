interface PokemonData {
  name: string;
  abilities: Ability[];
  weight: number;
  height: number;
  sprites: Sprites;
  is_default: boolean;
}

interface Ability {
  ability: {
    name: string;
    url: string;
  };
}

interface Sprites {
  front_default: string | null;
  front_shiny: string | null;
  back_default: string | null;
  back_shiny: string | null;
}

export default PokemonData;
