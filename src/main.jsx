
import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Activities from "./pages/Activities";
import ActivityDetails from "./pages/ActivityDetails";
import Gallery from "./pages/Gallery";
import Achievements from "./pages/Achievements";
import Navbar from "./components/Navbar";
import "./styles.css";

function App() {
  const navigate = useNavigate();

  const go = (id) => {
    if (id === "activities") {
      navigate("/activities");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (id === "gallery") {
      navigate("/gallery");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (id === "achievements") {
      navigate("/achievements");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (window.location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Navbar go={go} />

      <Routes>
        <Route path="/" element={<Home go={go} />} />

        <Route path="/activities" element={<Activities />} />

        <Route
          path="/activities/:id"
          element={<ActivityDetails />}
        />

        <Route path="/gallery" element={<Gallery />} />

        <Route
          path="/achievements"
          element={<Achievements />}
        />
      </Routes>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

