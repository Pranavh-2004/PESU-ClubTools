import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./styles/reset.css";
import "./styles/colors.css";
import "./styles/fonts.css";
import "./styles/layout.css";

import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Templates from "./pages/Templates/Templates";
import Project from "./pages/Project/Project";
import Verify from "./pages/Verify/Verify";
import MainLayout from "./layouts/MainLayout";
import { StatusProvider } from "./providers/status/Status";
import { SessionProvider } from "./providers/session/Session";
import { ModalProvider } from "./providers/modal/Modal";

function rout() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "u/:uid",
          element: <Dashboard />,
        },
        {
          path: "u/:uid/projects",
          element: <Dashboard />,
        },
        {
          path: "u/:uid/templates",
          element: <Templates />,
        },
        {
          path: "u",
          element: <Dashboard />,
        },
        {
          path: "u/:userid/p/:projectid/:state",
          element: <Project />,
        },
        {
          path: "verify/:certificateid",
          element: <Verify />,
        },
      ],
    },
  ]);

  return router;
}

const router = rout();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SessionProvider>
      <StatusProvider>
        <ModalProvider>
          <RouterProvider router={router} />
        </ModalProvider>
      </StatusProvider>
    </SessionProvider>
  </StrictMode>
);
