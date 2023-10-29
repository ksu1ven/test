interface PokemonData {
  name: string;
  abilities: Ability[];
  weight: number;
  height: number;
  sprites: Sprites;
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
}

export default PokemonData;
