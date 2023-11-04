import { RouteObject } from "react-router-dom";
import App from "../App";
import PokemonCard from "../components/pokemon-card";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/:name",
        element: <PokemonCard />,
      },
    ],
  },
];
