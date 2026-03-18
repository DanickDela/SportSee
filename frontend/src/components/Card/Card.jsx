import PropTypes from "prop-types";
import styles from "../../styles/synthinfos.module.scss";

/**
 * Composant affichant une information de synthèse
 * (calories, protéines, glucides, lipides) dans le dashboard.
 *
 * @component
 *
 * @param {Object} props - Propriétés du composant
 * @param {Object} props.data - Données macro
 * @param {number} props.data.quantity - Valeur numérique (ex: 1930)
 * @param {string} props.data.unit - Unité associée (ex: "kCal")
 * @param {string} props.data.name - Nom de la macro (ex: "Calories")
 * @param {string} props.data.macroType - Type de macro pour l'alt de l'image
 * @param {string} props.icon - Chemin de l'icône
 *
 * @returns {JSX.Element}
 */
function Card({ data, icon }) {
  return (
    <article className={styles.infos}>
      <img src={icon} alt={data.macroType} />
      <div className={styles.infos__macro}>
        <p className={styles.infos__macro_quantity}>
          {data.quantity}
          {data.unit}
        </p>
        <p className={styles.infos__macro_name}>{data.name}</p>
      </div>
    </article>
  );
}

Card.propTypes = {
  data: PropTypes.shape({
    quantity: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    macroType: PropTypes.string,
  }).isRequired,
  icon: PropTypes.string.isRequired,
};

export default Card;
