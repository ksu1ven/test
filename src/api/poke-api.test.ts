import axios from "axios";
import PokeApi from "./poke-api";

jest.mock("axios");

describe("PokeApi", () => {
  let pokeApi: PokeApi;
  const mockResults = [
    { name: "pokemon1" },
    { name: "pokemon2" },
    { name: "pokemon3" },
  ];

  beforeEach(() => {
    pokeApi = new PokeApi();
  });

  describe("getAllPokemons", () => {
    it("should retrun all pokemons with empty string", async () => {
      axios.get = jest.fn().mockResolvedValueOnce({ data: { results: [] } });
      await pokeApi.getAllPokemons("");

      expect(axios.get).toHaveBeenCalledWith(
        "https://pokeapi.co/api/v2/pokemon?limit=1500",
      );
      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    it("should retrun filter pokemons if searchValue is not empty", async () => {
      const mockSearchValue = "pokemon1";
      axios.get = jest
        .fn()
        .mockResolvedValueOnce({ data: { results: mockResults } });

      const getAllPokemons = await pokeApi.getAllPokemons(mockSearchValue);

      const result = mockResults.filter(
        (result) => result.name === mockSearchValue,
      );
      expect(axios.get).toHaveBeenCalledWith(
        "https://pokeapi.co/api/v2/pokemon?limit=1500",
      );
      expect(getAllPokemons).toEqual({
        total: result.length,
        pokemons: result,
      });
    });
  });

  describe("getPokemons", () => {
    it("should retrun pokemons if get page, searchValue, limit ", async () => {
      const mockPage = 2;
      const mockSearchValue = "pokemon1";
      const mockLimit = 10;
      axios.get = jest
        .fn()
        .mockResolvedValueOnce({ data: { results: mockResults } });
      pokeApi.getConvertPokemonsArray = jest.fn();

      await pokeApi.getPokemons({
        page: mockPage,
        searchValue: mockSearchValue,
        limit: mockLimit,
      });

      expect(axios.get).toHaveBeenCalledWith(
        "https://pokeapi.co/api/v2/pokemon?limit=1500",
      );
      expect(pokeApi.getConvertPokemonsArray).toHaveBeenCalledTimes(1);
    });
  });

  describe("getPokemon", () => {
    it("should retrun pokemon", async () => {
      const mockName = "pokemon1";
      axios.get = jest.fn().mockResolvedValueOnce({ data: { name: mockName } });
      pokeApi.convertPokemon = jest.fn();

      await pokeApi.getPokemon(mockName);

      expect(axios.get).toHaveBeenCalledWith(
        `https://pokeapi.co/api/v2/pokemon/${mockName}`,
      );
      expect(pokeApi.convertPokemon).toHaveBeenCalledTimes(1);
    });
  });

  describe("convertPokemon", () => {
    it("should retrun pokemon", () => {
      const mockName = "pokemon1";

      const result = pokeApi.convertPokemon({
        name: mockName,
        abilities: [
          { ability: { name: "ability1", url: "url1" } },
          { ability: { name: "ability2", url: "url2" } },
        ],
        sprites: {
          front_default: "front_default_url",
          front_shiny: "front_shiny_url",
          back_default: null,
          back_shiny: "back_shiny_url",
        },
        weight: 10,
        height: 10,
        is_default: false,
      });

      expect(result).toEqual({
        name: pokeApi.capitalizeFirstLetter(mockName),
        weight: 10,
        height: 10,
        abilities: ["ability1", "ability2"],
        image: [
          {
            type: "front",
            url: "front_default_url",
          },
          {
            type: "back",
            url: "back_shiny_url",
          },
        ],
        isDefault: false,
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
