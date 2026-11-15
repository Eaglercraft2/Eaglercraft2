import { Link, NavLink } from "react-router-dom";
import "./pages/style/home.css";

const links = [
  { to: "/", label: "Overview", end: true },
  { to: "/play", label: "Play" },
  { to: "/store", label: "Game library" },
  { to: "/forums", label: "Community" },
  { to: "/docs", label: "Documentation" },
  { to: "/moddit", label: "Modding" }
];

export default function Navbar({ onSignOut }) {
  return (
    <header className="topbar">
      <Link to="/" className="brand" aria-label="Eaglercraft2 home">
        <span className="brand-mark" aria-hidden="true">E2</span>
        <span className="brand-wordmark">EAGLERCRAFT<span>2</span></span>
      </Link>

      <nav className="topbar-nav" aria-label="Main navigation">
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="topbar-actions">
        <Link to="/editor" className="nav-editor">Creator tools</Link>
        <button className="signout-button" type="button" onClick={onSignOut}>Sign out</button>
      </div>
    </header>
  );
}
