import React, { useState } from "react";
import { Menu, PawPrint, X } from "lucide-react";

export default function Navbar({ go }) {
  const [open, setOpen] = useState(false);

  const handleNavigation = (id) => {
    go(id);
    setOpen(false);
  };

  const links = [
    ["home", "Home"],
    ["about", "About"],
    ["activities", "Activities"],
    ["gallery", "Gallery"],
    ["achievements", "Achievements"],
    ["contact", "Contact"],
  ];

  return (
    <nav className="navbar">
      <div className="container nav">
        <button className="brand" onClick={() => handleNavigation("home")}>
          <PawPrint />

          <span>
            <b>BINDU BASNET</b>
            <small>VETERINARY JOURNEY</small>
          </span>
        </button>

        <div className={`links ${open ? "open" : ""}`}>
          {links.map(([id, label]) => (
            <button key={id} onClick={() => handleNavigation(id)}>
              {label}
            </button>
          ))}
        </div>

        <button
          className="menu"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
}