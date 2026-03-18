import PropTypes from "prop-types";
import styles from "../../styles/iconbutton.module.scss";

/**
 * Composant Iconbutton
 *
 * Affiche un bouton contenant une icône représentant une activité.
 * Utilisé dans la sidebar pour accéder aux différentes activités sportives.
 *
 * @component
 *
 * @param {Object} props - Propriétés du composant
 * @param {string} props.icon - Chemin vers l'image de l'icône
 * @param {string} [props.activity="Activité"] - Texte alternatif décrivant l'icône (accessibilité)
 *
 * @returns {JSX.Element} Bouton avec icône
 */
function Iconbutton({ icon, activity = "Activité" }) {
  return (
    <button className={styles.iconbutton} type="button">
      <img src={icon} alt={activity} />
    </button>
  );
}

Iconbutton.propTypes = {
  /**
   * Chemin vers l'image de l'icône
   */
  icon: PropTypes.string.isRequired,

  /**
   * Description de l'icône (accessibilité)
   */
  activity: PropTypes.string,
};

export default Iconbutton;
