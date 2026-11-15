import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style/home.css";

const navItems = [
  { key: "dashboard", label: "Overview", mark: "01" },
  { key: "store", label: "Game library", mark: "02" },
  { key: "elge", label: "ELGE engine", mark: "03" },
  { key: "hopper", label: "Knowledge base", mark: "04" },
  { key: "clipper", label: "GameClipper", mark: "05" },
  { key: "profile", label: "Your account", mark: "06" }
];

const destinations = [
  { title: "Game library", detail: "Browse games published to the platform.", to: "/store", number: "01" },
  { title: "Community forums", detail: "Read discussions and share updates with players.", to: "/forums", number: "02" },
  { title: "Modding hub", detail: "Explore community-made game modifications.", to: "/moddit", number: "03" },
  { title: "Creator tools", detail: "Open the ELGE editor and experiment with a project.", to: "/editor", number: "04" }
];

function DashboardPage({ navigate }) {
  return (
    <div className="page-block">
      <section className="hero-banner">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> BROWSER-BASED VOXEL GAMING</p>
          <h1>Play, create,<br /><span>and explore.</span></h1>
          <p className="hero-desc">
            Eaglercraft2 brings browser games, community spaces, and creator tools together.
            Pick a destination and get straight to it.
          </p>
          <div className="hero-actions">
            <button type="button" className="button-primary" onClick={() => navigate("/play")}>Open game <span aria-hidden="true">↗</span></button>
            <button type="button" className="button-secondary" onClick={() => navigate("/store")}>Browse library</button>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="voxel-scene">
            <div className="voxel voxel-back" />
            <div className="voxel voxel-mid" />
            <div className="voxel voxel-front" />
          </div>
          <span className="art-caption">ELGE / VICTUS</span>
        </div>
      </section>

      <section className="section-heading">
        <div><p className="eyebrow">EXPLORE THE PLATFORM</p><h2>Choose your next stop</h2></div>
        <span className="section-note">A clearer way into Eaglercraft2</span>
      </section>

      <section className="destination-grid" aria-label="Platform destinations">
        {destinations.map((item) => (
          <Link className="destination-card" to={item.to} key={item.to}>
            <span className="destination-number">{item.number}</span>
            <span className="destination-arrow" aria-hidden="true">↗</span>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </Link>
        ))}
      </section>

      <section className="platform-note">
        <div><p className="eyebrow">BUILT FOR THE BROWSER</p><h2>One platform. Different ways to play.</h2></div>
        <p>Eaglercraft2 is developed around ELGE, its low-end game engine, and Victus, its renderer. The platform is still evolving; features are presented as they become available.</p>
      </section>
    </div>
  );
}

function ServicePage({ title, summary, bullets, action, to }) {
  return (
    <section className="service-page">
      <p className="eyebrow">EAGLERCRAFT2 / PLATFORM</p>
      <h1>{title}</h1>
      <p className="page-summary">{summary}</p>
      <div className="service-detail">
        <h2>About this area</h2>
        <ul>{bullets.map((item) => <li key={item}>{item}</li>)}</ul>
        {action && <Link className="button-primary inline-action" to={to}>{action} <span aria-hidden="true">↗</span></Link>}
      </div>
    </section>
  );
}

export default function Home({ identityState, profile }) {
  const [activePage, setActivePage] = useState("dashboard");
  const navigate = useNavigate();

  const pageContent = useMemo(() => {
    switch (activePage) {
      case "store":
        return <ServicePage title="Game library" summary="A place to discover games available through Eaglercraft2." bullets={["Browse published game entries.", "Open a game from its available launch page.", "Availability depends on published releases."]} action="Open game library" to="/store" />;
      case "elge":
        return <ServicePage title="ELGE engine" summary="Eaglercraft2 Low-End Game Engine — the browser-focused runtime behind the platform." bullets={["Engine and renderer development.", "Performance and compatibility work.", "Runtime capabilities are under active development."]} action="Open the player" to="/play" />;
      case "hopper":
        return <ServicePage title="Knowledge base" summary="Guides and project documentation for players and creators." bullets={["Read the current platform documentation.", "Find guidance for community features.", "Documentation grows alongside the project."]} action="Read documentation" to="/docs" />;
      case "clipper":
        return <ServicePage title="GameClipper" summary="A planned home for sharing gameplay moments." bullets={["The destination is listed as part of the platform roadmap.", "Clip capture and publishing availability is not represented as live here."]} />;
      case "profile":
        return <section className="service-page"><p className="eyebrow">ACCOUNT</p><h1>Your account</h1><p className="page-summary">Signed-in account information currently available to this session.</p><div className="service-detail profile-detail"><p><span>Session</span><strong>{identityState}</strong></p><p><span>Username</span><strong>{profile?.username || "Not provided"}</strong></p><p><span>Email</span><strong>{profile?.email || "Not provided"}</strong></p><p><span>Account ID</span><strong>{profile?.uid || "Unavailable"}</strong></p><Link className="button-secondary inline-action" to="/settings">Manage settings</Link></div></section>;
      default:
        return <DashboardPage navigate={navigate} />;
    }
  }, [activePage, identityState, navigate, profile]);

  const handleNavClick = (key) => {
    if (key === "profile") { navigate("/settings"); return; }
    if (key === "dashboard") { setActivePage("dashboard"); return; }
    setActivePage(key);
  };

  return (
    <div className="home">
      <div className="layout">
        <aside className="sidebar" aria-label="Platform sections">
          <div className="sidebar-label">WORKSPACE</div>
          {navItems.map((item) => (
            <button key={item.key} className={item.key === activePage ? "active" : ""} onClick={() => handleNavClick(item.key)} type="button" aria-current={item.key === activePage ? "page" : undefined}>
              <span className="sidebar-index">{item.mark}</span><span>{item.label}</span><span className="sidebar-chevron" aria-hidden="true">›</span>
            </button>
          ))}
          <div className="sidebar-foot"><span className="status-dot" /> Platform in active development</div>
        </aside>

        <main className="content">{pageContent}</main>

        <aside className="identity-card">
          <div className="identity-heading"><span className="eyebrow">SIGNED-IN SESSION</span><span className="identity-indicator" /></div>
          {profile?.profilePicture ? <img className="identity-avatar" src={profile.profilePicture} alt="" /> : <div className="identity-avatar identity-avatar-fallback">{(profile?.username || "P").slice(0, 1).toUpperCase()}</div>}
          <h3>{profile?.username || "Player"}</h3>
          <p className="identity-email">{profile?.email || "Account connected"}</p>
          <div className="identity-divider" />
          <p className="identity-status">{identityState}</p>
          <Link to="/settings" className="identity-link">Account settings <span aria-hidden="true">↗</span></Link>
        </aside>
      </div>
    </div>
  );
}
