import { useContext } from "react";
import { Context } from "../../context-api/context";
import { Link } from "react-router-dom";

const PokemonsTable = () => {
  const { pokemons } = useContext(Context);

  if (pokemons.length === 0) {
    return <p className="not-found">Nothing found</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {pokemons.map((pokemon) => {
          const image = pokemon.image.length ? pokemon.image[0].url : null;
          return (
            <tr key={pokemon.name}>
              <td>
                {image ? (
                  <img src={image} alt={pokemon.name} />
                ) : (
                  <span>None</span>
                )}
              </td>
              <td>
                <Link to={pokemon.name.toLowerCase()}>{pokemon.name}</Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PokemonsTable;
