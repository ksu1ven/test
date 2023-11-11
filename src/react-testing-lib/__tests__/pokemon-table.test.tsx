import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Context } from "../../context-api/context";
import PokemonsTable from "../../components/pokemons-table";
import { BrowserRouter } from "react-router-dom";

describe("PokemonsTable", () => {
  test('renders "Nothing found" when no pokemons are present', () => {
    const mockContext = {
      pokemons: [],
      setPokemons: jest.fn(),
      searchValue: "",
      setSearchValue: jest.fn(),
    };
    render(
      <BrowserRouter>
        <Context.Provider value={mockContext}>
          <PokemonsTable />
        </Context.Provider>
      </BrowserRouter>,
    );

    expect(screen.getByText("Nothing found")).toBeInTheDocument();
  });

  test("renders table with pokemons data when pokemons are present", () => {
    const mockContext = {
      pokemons: [
        {
          name: "pokemon1",
          image: [
            {
              type: "front",
              url: "url1",
            },
          ],
          weight: 10,
          height: 10,
          abilities: ["ability1", "ability2"],
          isDefault: true,
        },
        {
          name: "pokemon2",
          image: [
            {
              type: "front",
              url: "url2",
            },
          ],
          weight: 10,
          height: 10,
          abilities: ["ability1", "ability2"],
          isDefault: true,
        },
      ],
      setPokemons: jest.fn(),
      searchValue: "",
      setSearchValue: jest.fn(),
    };

    render(
      <Context.Provider value={mockContext}>
        <PokemonsTable />
      </Context.Provider>,
    );

    mockContext.pokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
      expect(screen.getByAltText(pokemon.name)).toBeInTheDocument();
    });
  });
});
