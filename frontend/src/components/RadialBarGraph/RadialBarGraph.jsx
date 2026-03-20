import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import styles from "../../styles/radialbargraph.module.scss";
import useIsTablet from "../../hook/useIsTablet";
import PropTypes from "prop-types";
/**
 * Composant RadialBarGraph
 *
 * Affiche un graphique radial représentant le score utilisateur
 * sous forme de pourcentage (0 à 100).
 *
 * Le graphique utilise Recharts pour dessiner une barre circulaire,
 * avec un cercle blanc central et un texte overlay affichant le score.
 *
 * @component
 *
 * @param {Object} props - Propriétés du composant
 * @param {number} props.score - Score utilisateur en pourcentage (ex: 12 pour 12%)
 *
 * @returns {JSX.Element} Graphique radial avec score et indicateur visuel
 *
 * @example
 * <RadialBarGraph score={user.scorePercent} />
 */

const RadialBarGraph = ({ score }) => {
  const isTablet = useIsTablet();
  const startAngle = 90;

  /**
   * Données formatées pour Recharts
   * @type {Array<{ uv: number, fill: string }>}
   */
  const chartData = [
    {
      uv: score,
      fill: "#FF0000",
    },
  ];

  return (
    <div className={styles.graphchart}>
      <p className={styles.graphchart__title}>Score</p>
      <ResponsiveContainer width="100%" height={isTablet ? 194 : 258}>
        <RadialBarChart
          data={chartData}
          innerRadius="60%"
          outerRadius="80%"
          barSize={10}
          startAngle={startAngle}
          endAngle={startAngle - (score * 360) / 100}
        >
          <RadialBar dataKey="uv" cornerRadius={10} />
        </RadialBarChart>
      </ResponsiveContainer>

      <div className={styles.innerCircle}></div>
      <div className={styles.score}>
        <p className={styles.score__value}>{score}%</p>
        <p className={styles.score__text}>
          de votre <br /> objectif
        </p>
      </div>
    </div>
  );
};

RadialBarGraph.propTypes = {
  score: PropTypes.number.isRequired,
};

export default RadialBarGraph;
