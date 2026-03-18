import styles from "../../styles/linegraph.module.scss";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/**
 * Ajoute des points vides au début et à la fin
 * pour améliorer le rendu visuel du graphique
 *
 * @param {Array<Object>} sessions - Liste des sessions utilisateur
 * @returns {Array<Object>} Sessions formatées avec padding
 */
const formatSessions = (sessions) => {
  return [
    { day: "", sessionLength: 0 },
    ...sessions,
    { day: "", sessionLength: 0 },
  ];
};

/**
 * Curseur personnalisé affiché au survol
 *
 * Crée un rectangle sombre à droite du point actif
 *
 * @component
 * @param {Object} props
 * @param {Array} props.points - Coordonnées du point actif
 * @param {number} props.width - Largeur du graphique
 * @param {number} props.height - Hauteur du graphique
 * @returns {JSX.Element|null}
 */
const CustomCursor = ({ points, width, height }) => {
  if (!points || !points.length) return null;

  const x = points[0].x;

  return (
    <rect
      x={x}
      y={0}
      width={width - x}
      height={263}
      fill="rgba(0, 0, 0, 0.0975)"
    />
  );
};

/**
 * Tooltip personnalisé affichant la durée de session
 *
 * @component
 * @param {Object} props
 * @param {Array} props.payload - Données du point survolé
 * @returns {JSX.Element|null}
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
 * Composant LineGraph
 *
 * Affiche un graphique en ligne représentant
 * la durée moyenne des sessions utilisateur.
 *
 * Utilise Recharts avec :
 * - un tooltip personnalisé
 * - un curseur personnalisé
 * - un formatage des données pour un rendu amélioré
 *
 * @component
 *
 * @param {Object} props
 * @param {Array<Object>} props.data - Données des sessions
 * @param {number|string} props.data[].day - Jour de la session
 * @param {number} props.data[].sessionLength - Durée de la session en minutes
 *
 * @returns {JSX.Element}
 */
const LineGraph = ({ data }) => {
  const formattedData = formatSessions(data);

  return (
    <div className={styles.linegraph}>
      <ResponsiveContainer width="100%" height={263}>
        <LineChart
          data={formattedData}
          margin={{ right: -16, left: -16, bottom: 16 }}
        >
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "white", fontSize: 14 }}
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
