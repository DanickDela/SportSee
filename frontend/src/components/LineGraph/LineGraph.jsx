import styles from "../../styles/linegraph.module.scss";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useIsTablet from "../../hook/useIsTablet";

/**
 * Ajoute un point vide au début et à la fin des données
 * afin d'améliorer le rendu visuel de la courbe.
 *
 * @param {Array<{day: string|number, sessionLength: number}>} sessions - Liste des sessions utilisateur.
 * @returns {Array<{day: string|number, sessionLength: number}>} Tableau enrichi avec un padding au début et à la fin.
 */
const formatSessions = (sessions) => {
  return [
    { day: "", sessionLength: 0 },
    ...sessions,
    { day: "", sessionLength: 0 },
  ];
};

/**
 * Curseur personnalisé affiché au survol d'un point.
 *
 * Affiche un rectangle semi-transparent à droite du point actif.
 *
 * @component
 * @param {Object} props - Propriétés du curseur.
 * @param {Array<{x: number}>} props.points - Coordonnées du point actif.
 * @param {number} props.width - Largeur du graphique.
 * @param {number} props.height - Hauteur du graphique.
 * @returns {JSX.Element|null} Le curseur personnalisé ou null si aucun point n'est actif.
 */
const CustomCursor = ({ points, width, height }) => {
  const isTablet = useIsTablet();
  if (
    !points ||
    !points.length ||
    typeof width !== "number" ||
    typeof height !== "number"
  ) {
    return null;
  }

  const x = points[0]?.x;
  if (typeof x !== "number") return null;

  return (
    <rect
      x={x}
      y={0}
      width={width - x}
      height={isTablet ? 194 : 258}
      fill="rgba(0, 0, 0, 0.0975)"
    />
  );
};

/**
 * Tooltip personnalisé affichant la durée de la session.
 *
 * @component
 * @param {Object} props - Propriétés du tooltip.
 * @param {Array<{value: number}>} props.payload - Données du point survolé.
 * @returns {JSX.Element|null} Tooltip personnalisé ou null si aucune donnée n'est disponible.
 */
const CustomTooltip = ({ payload }) => {
  if (!payload || !payload.length) return null;

  return (
    <div
      style={{
        padding: "8px",
        backgroundColor: "white",
        fontSize: "10px",
      }}
    >
      <p>{`${payload[0].value} min`}</p>
    </div>
  );
};

/**
 * Affiche le graphique de durée moyenne des sessions utilisateur.
 *
 * Le composant :
 * - ajoute un padding visuel aux données,
 * - affiche un tooltip personnalisé,
 * - affiche un curseur personnalisé,
 * - adapte dynamiquement la hauteur du graphique selon le format tablette.
 *
 * @component
 * @param {Object} props - Propriétés du composant.
 * @param {Array<{day: string|number, sessionLength: number}>} props.data - Données des sessions utilisateur.
 * @returns {JSX.Element|null} Le graphique des sessions ou null si les données sont absentes ou invalides.
 *
 * @example
 * <LineGraph
 *   data={[
 *     { day: "L", sessionLength: 30 },
 *     { day: "M", sessionLength: 23 },
 *     { day: "M", sessionLength: 45 },
 *   ]}
 * />
 */
const LineGraph = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) return null;

  const isTablet = useIsTablet();
  const formattedData = formatSessions(data);

  return (
    <div className={styles.graphchart}>
      <h3 className={styles.graphchart__title}>Durée moyenne des sessions</h3>
      <ResponsiveContainer width="100%" height={isTablet ? 194 : 258}>
        <LineChart
          data={formattedData}
          margin={{ right: -16, left: -16, bottom: 16, top: 50 }}
        >
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "rgba(255, 255, 255, 0.5)",
              fontSize: 12,
            }}
          />

          <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />

          <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />} />

          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="white"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "white" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineGraph;
