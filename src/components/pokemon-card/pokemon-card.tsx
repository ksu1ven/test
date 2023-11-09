/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PokemonResponse from "../../types/pokemon-response";
import PokeApi from "../../api/poke-api";
import Loader from "../loader";

const PokemonCard = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState<PokemonResponse | null>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    setIsLoading(true);
    if (name) {
      const pokemonApi = new PokeApi();
      try {
        const convertPokemon = await pokemonApi.getPokemon(name);
        convertPokemon && setPokemon(convertPokemon);
      } catch (error) {
        navigate("404");
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="pokemon-card-wrapper" onClick={() => navigate(-1)}>
      <div className="pokemon-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={() => navigate(-1)}>
          X
        </button>
        {isLoading && <Loader />}
        {pokemon && (
          <>
            <h2 className="pokemon-name">{pokemon.name}</h2>
            <div className="pokemon-main-info">
              <div className="pokemon-images">
                {pokemon.image.map((image) => (
                  <div key={image.url} className="pokemon-image-wrapper">
                    {image.url ? (
                      <img
                        src={image.url}
                        alt={pokemon.name}
                        className={image.type}
                      />
                    ) : (
                      <div style={{ color: "black" }}>
                        No {image.type} image
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div>
                <p>
                  Weight:{" "}
                  <span className="pokemon-weight">
                    {pokemon.weight / 10} kg
                  </span>
                </p>
                <p>
                  Height:{" "}
                  <span className="pokemon-height">
                    {pokemon.height * 10} sm
                  </span>
                </p>
                <p>Is default: {pokemon.isDefault ? "yes" : "no"}</p>
                <p>Abilities: {pokemon.abilities.join(", ")}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
