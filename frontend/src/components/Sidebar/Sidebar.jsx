import yoga from "../../assets/yoga.svg";
import natation from "../../assets/natation.svg";
import bike from "../../assets/bike.svg";
import musculation from "../../assets/musculation.svg";
import styles from "../../styles/sidebar.module.scss";
import Iconbutton from "../Iconbutton/Iconbutton";
import "../../styles/common.scss";

/**
 * Composant Sidebar
 *
 * Affiche la barre latérale de l'application avec :
 * - les boutons d'accès aux activités sportives
 * - le texte de copyright
 *
 * Les icônes sont rendues à l'aide du composant Iconbutton.
 *
 * @component
 * @returns {JSX.Element} La barre latérale de l'application
 */
function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav
        className={styles.sidebar__nav}
        aria-label="Navigation des activités sportives"
      >
        <Iconbutton icon={yoga} activity="Yoga" />
        <Iconbutton icon={natation} activity="Natation" />
        <Iconbutton icon={bike} activity="Cyclisme" />
        <Iconbutton icon={musculation} activity="Musculation" />
      </nav>

      <p className={styles.sidebar__copyright}>Copyright, SportSee 2020</p>
    </aside>
  );
}

export default Sidebar;
