import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PokeApi from "../../api/poke-api";
import PokemonCard from ".";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));
jest.mock("../../api/poke-api");

describe("PokemonCard", () => {
  const mockPokemon = {
    name: "pokemon1",
    image: [
      {
        type: "front",
        url: "url1",
      },
      {
        type: "back",
        url: null,
      },
    ],
    weight: 1,
    height: 1,
    isDefault: true,
    abilities: ["static"],
  };

  it("renders PokemonCard and calls fetchPokemon on mount", async () => {
    PokeApi.prototype.getPokemon = jest.fn().mockResolvedValue(mockPokemon);

    render(
      <MemoryRouter initialEntries={["/pokemon/pokemon1"]}>
        <Routes>
          <Route path="/pokemon/:name" element={<PokemonCard />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => screen.getByText(/pokemon1/i));
    expect(PokeApi.prototype.getPokemon).toHaveBeenCalledWith("pokemon1");
  });

  it("should renders images", async () => {
    render(
      <MemoryRouter initialEntries={["/pokemon/pokemon1"]}>
        <Routes>
          <Route path="/pokemon/:name" element={<PokemonCard />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => screen.getByText(/No back image/i));
  });

  it("should redirects to back on click", async () => {
    render(
      <MemoryRouter initialEntries={["/pokemon/pokemon1"]}>
        <Routes>
          <Route path="/pokemon/:name" element={<PokemonCard />} />
        </Routes>
      </MemoryRouter>,
    );

    const backButton = screen.getByRole("button", {});
    backButton.click();

    await waitFor(() => expect(mockedUsedNavigate).toHaveBeenCalledWith(-1))
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
