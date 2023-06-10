import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BookPage from "./pages/Book";
import ColorGuess from "./pages/ColorGuess";
import CircleMarker from "./pages/CircleMarker";
import MemoryGame from "./pages/MemoryGame";
import FileStructure from "./pages/FileStructure";
import Wordle from "./pages/Wordle";

import "./index.module.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BookPage />,
  },
  {
    path: "/color-guess",
    element: <ColorGuess />,
  },
  {
    path: "/circle-marker",
    element: <CircleMarker />,
  },
  {
    path: "/memory-game",
    element: <MemoryGame />,
  },
  {
    path: "/file-structure",
    element: <FileStructure />,
  },
  {
    path: "/wordle",
    element: <Wordle />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
