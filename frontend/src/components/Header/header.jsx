import { NavLink, Link } from "react-router-dom";
import styles from "../../styles/header.module.scss";
import logo from "../../assets/logo.png";
import "../../styles/common.scss";

/**
 * Composant Header
 *
 * Affiche l'en-tête principal de l'application SportSee avec :
 * - le logo cliquable redirigeant vers la page d'accueil
 * - la navigation principale (Accueil, Profil, Réglages, Communauté)
 *
 * Utilise react-router-dom pour la navigation SPA.
 *
 * @component
 * @returns {JSX.Element} Le header de l'application
 */
function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <Link to="/">
          <img src={logo} alt="Logo SportSee" />
        </Link>
      </div>

      <nav className={styles.header__nav} aria-label="Navigation principale">
        <NavLink to="/" end>
          Accueil
        </NavLink>

        <NavLink to="/profil">Profil</NavLink>

        <NavLink to="/settings">Réglages</NavLink>

        <NavLink to="/communaute">Communauté</NavLink>
      </nav>
    </header>
  );
}

export default Header;
