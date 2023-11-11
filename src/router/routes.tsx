import { Link, RouteObject } from "react-router-dom";
import App from "../App";
import PokemonCard from "../components/pokemon-card";
import NotFoundPage from "../components/not-found-page";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <div>
        <Link to={"search"}>Search</Link>
      </div>
    ),
  },
  {
    path: "search",
    element: <App />,
    children: [
      {
        path: ":name",
        element: <PokemonCard />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
