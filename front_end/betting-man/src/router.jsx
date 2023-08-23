import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
// import LandingPage from "./components/LandingPage.jsx";
import HomePage from "./components/HomePage.jsx";
import BetsPage from "./components/BetsPage.jsx"
import SignupPage from "./components/SignupPage.jsx"
import LoginPage from "./components/LoginPage.jsx"
import ProfilePage from "./components/ProfilePage.jsx";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/signup",
          element: <SignupPage />
        },
        {
          path: "/login",
          element: <LoginPage />
        },
        // {
        //   path: "/home",
        //   element: <HomePage />,
        // },
        {
          path: "/bets",
          element: <BetsPage />,
        },
        {
          path: "/profile",
          element: <ProfilePage />
        }
      ],
    },
  ]);
  
  export default router;