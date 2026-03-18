import styles from "../../styles/radarchart.module.scss";
import PropTypes from "prop-types";

/**
 * Composant RadarGraph
 *
 * Affiche un graphique radar représentant les performances
 * de l'utilisateur selon plusieurs catégories.
 *
 * Le composant attend un tableau de données déjà formatées,
 * avec pour chaque élément :
 * - `kind` : le libellé de la catégorie
 * - `value` : la valeur associée
 *
 * Si les données sont absentes, invalides ou vides,
 * le composant n'affiche rien.
 *
 * @component
 *
 * @param {Object} props - Propriétés du composant
 * @param {Array<{kind: string, value: number}>} props.data - Données du radar chart
 *
 * @returns {JSX.Element|null} Un graphique radar ou `null` si aucune donnée exploitable
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

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

const RadarGraph = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <div className={styles.graphchart}>
      <ResponsiveContainer width="100%" height={263}>
        <RadarChart
          data={data}
          outerRadius="69%"
          startAngle={90}
          endAngle={-270}
        >
          <PolarGrid stroke="#FFFFFF" />
          <PolarAngleAxis
            dataKey="kind"
            tick={{
              fontSize: 12,
              fill: "#FFFFFF",
              fontWeight: 500,
            }}
          />
          <Radar dataKey="value" fill="#FF0101" fillOpacity={0.7} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

RadarGraph.propTypes = {
  data: PropTypes.array,
};

export default RadarGraph;
