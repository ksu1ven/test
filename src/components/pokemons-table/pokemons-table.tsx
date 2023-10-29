import React from "react";
import PokemonResponse from "../../types/pokemon-response";

type Props = {
  pokemons: PokemonResponse[];
};

export class PokemonsTable extends React.Component<Props> {
  render(): React.ReactNode {
    if (this.props.pokemons.length === 0) {
      return <p className="not-found">Nothing found</p>;
    }
    return (
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Abilities</th>
            <th>Height, sm</th>
            <th>Weight, kg</th>
          </tr>
        </thead>
        <tbody>
          {this.props.pokemons.map((pokemon) => (
            <tr key={pokemon.name}>
              <td>
                {pokemon.image ? (
                  <img src={pokemon.image} alt={pokemon.name} />
                ) : (
                  <span>None</span>
                )}
              </td>
              <td>{pokemon.name}</td>
              <td>
                {pokemon.abilities.map((ability, index) => (
                  <span key={ability}>
                    {ability}
                    {index !== pokemon.abilities.length - 1 && ", "}
                  </span>
                ))}
              </td>
              <td>{pokemon.height * 10}</td>
              <td>{pokemon.weight / 10}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
