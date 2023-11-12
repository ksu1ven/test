import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Context } from "../../context-api/context";
import PokemonsTable from ".";

describe("PokemonsTable", () => {
  const mockContext = {
    pokemons: [
      {
        name: "pokemon1",
        image: [],
        weight: 1,
        height: 1,
        abilities: [],
        isDefault: true,
      },
    ],
    setPokemons: () => {},
    searchValue: "",
    setSearchValue: () => {},
  };

  it("should render pokemons table if 0 pokemons", () => {
    render(<PokemonsTable />);

    expect(screen.getByText("Nothing found")).toBeInTheDocument();
  });

  it("should render pokemons table if 1 pokemons", () => {
    render(
      <BrowserRouter>
        <Context.Provider value={mockContext}>
          <PokemonsTable />
        </Context.Provider>
      </BrowserRouter>,
    );

    expect(screen.getByText("pokemon1")).toBeInTheDocument();
  });

  it("should render without image if pokemon has no image", () => {
    render(
      <BrowserRouter>
        <Context.Provider value={mockContext}>
          <PokemonsTable />
        </Context.Provider>
      </BrowserRouter>,
    );

    expect(screen.getByText("None")).toBeInTheDocument();
  });

  it("should redirect to pokemon page on click", async () => {
    render(
      <BrowserRouter>
        <Context.Provider value={mockContext}>
          <PokemonsTable />
        </Context.Provider>
      </BrowserRouter>,
    );
    const link = screen.getByText("pokemon1");
    await waitFor(() => link.click());

    expect(link).toBeInTheDocument();
    expect(window.location.pathname).toBe(`/pokemon1`);
  });
});
