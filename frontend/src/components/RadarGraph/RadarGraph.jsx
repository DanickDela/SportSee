import styles from "../../styles/radarchart.module.scss";
import useIsTablet from "../../hook/useIsTablet";
import PropTypes from "prop-types";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

/**
 * Tick personnalisé du radar chart.
 *
 * Ce composant permet de repositionner les libellés des axes
 * en les décalant légèrement vers l'extérieur du graphique
 * à partir du centre du radar.
 *
 * @component
 * @param {Object} props - Propriétés du tick personnalisé.
 * @param {number} props.x - Position horizontale initiale du label.
 * @param {number} props.y - Position verticale initiale du label.
 * @param {number} props.cx - Position horizontale du centre du radar.
 * @param {number} props.cy - Position verticale du centre du radar.
 * @param {{ value: string }} props.payload - Donnée du label à afficher.
 * @returns {JSX.Element} Élément SVG text affichant le label repositionné.
 */
const CustomTick = ({ x, y, cx, cy, payload }) => {
  const offsetx = 17;
  const offsety = 5;

  const dx = x - cx;
  const dy = y - cy;
  const distance = Math.sqrt(dx * dx + dy * dy) || 1;

  const newX = x + (dx / distance) * offsetx;
  const newY = y + (dy / distance) * offsety;

  return (
    <text
      x={newX}
      y={newY}
      className={styles.tick}
      textAnchor="middle"
      dominantBaseline="middle"
    >
      {payload.value}
    </text>
  );
};

/**
 * Composant RadarGraph.
 *
 * Affiche un graphique radar représentant les performances
 * de l'utilisateur selon plusieurs catégories.
 *
 * Le composant :
 * - reçoit des données déjà formatées,
 * - adapte dynamiquement sa hauteur selon le breakpoint tablette,
 * - utilise un tick personnalisé pour améliorer le positionnement des labels,
 * - s'appuie sur Recharts pour le rendu du radar chart.
 *
 * Si les données sont absentes, invalides ou vides,
 * le composant n'affiche rien.
 *
 * @component
 * @param {Object} props - Propriétés du composant.
 * @param {Array<{kind: string, value: number}>} props.data - Données formatées du radar chart.
 * @returns {JSX.Element|null} Un graphique radar ou `null` si aucune donnée exploitable.
 *
 * @example
 * <RadarGraph
 *   data={[
 *     { kind: "Cardio", value: 80 },
 *     { kind: "Énergie", value: 120 },
 *     { kind: "Endurance", value: 140 },
 *   ]}
 * />
 */
const RadarGraph = ({ data }) => {
  const isTablet = useIsTablet();

  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <ResponsiveContainer width="100%" height={isTablet ? 194 : 258}>
      <RadarChart data={data} outerRadius="69%" startAngle={90} endAngle={-270}>
        <PolarGrid stroke="#FFFFFF" />
        <PolarAngleAxis dataKey="kind" tick={<CustomTick />} />
        <Radar dataKey="value" fill="#FF0101" fillOpacity={0.7} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

RadarGraph.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      kind: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    }),
  ),
};

export default RadarGraph;
