import { RechartsDevtools } from "@recharts/devtools";
import styles from "../../styles/barchar.module.scss";
import useContainerWidth from "../../hook/useContainerWidth";
import { useRef } from "react";

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import PropTypes from "prop-types";

/**
 * Tooltip personnalisé du graphique d'activité.
 *
 * Affiche le poids et les calories du point survolé.
 *
 * @param {Object} props - Propriétés injectées par Recharts
 * @param {boolean} props.active - Indique si le tooltip est actif
 * @param {Array<Object>} props.payload - Données du point survolé
 *
 * @returns {JSX.Element|null} Tooltip personnalisé ou null
 */
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  const kilogram = payload.find((p) => p.dataKey === "kilogram")?.value;
  const calories = payload.find((p) => p.dataKey === "calories")?.value;

  return (
    <div className={styles.boxhisto}>
      <p>{kilogram} kg</p>
      <p>{calories} kcal</p>
    </div>
  );
};

/**
 * Composant BarGraph
 *
 * Affiche un histogramme d'activité quotidienne avec :
 * - le poids (kg)
 * - les calories brûlées (kcal)
 *
 * Le composant attend un tableau d'objets formatés contenant
 * les propriétés `day`, `kilogram` et `calories`.
 *
 * Il calcule dynamiquement :
 * - les bornes de l'axe Y
 * - les graduations
 * - la largeur utile de la grille selon la taille du conteneur
 *
 * @component
 *
 * @param {Object} props - Propriétés du composant
 * @param {Array<{day: number, kilogram: number, calories: number}>} props.data - Données d'activité formatées
 *
 * @returns {JSX.Element|null} Histogramme d'activité ou null si aucune donnée
 *
 * @example
 * <BarGraph
 *   data={[
 *     { day: 1, kilogram: 80, calories: 240 },
 *     { day: 2, kilogram: 79, calories: 220 },
 *   ]}
 * />
 */
const BarGraph = ({ data }) => {
  if (!data.length) return null;
  const containerRef = useRef(null);
  const chartWidth = useContainerWidth(containerRef);

  const marginLeft = 43;
  const marginRight = 73;

  const baseChartWidth = 839; //base 1440px
  const baseGridX = 43;
  const baseGridWidth = 680;

  const basePlotWidth = baseChartWidth - marginLeft - marginRight;
  const plotWidth = chartWidth - marginLeft - marginRight;

  const innerStart = baseGridX - marginLeft;

  const innerStartRatio = innerStart / basePlotWidth;
  const gridWidthRatio = baseGridWidth / basePlotWidth;

  const gridX = marginLeft + plotWidth * innerStartRatio;
  const gridWidth = plotWidth * gridWidthRatio;

  const kilos = data.map((d) => d.kilogram);
  const minKilo = Math.min(...kilos);
  const maxKilo = Math.max(...kilos);

  const domainMin = minKilo - 1;
  const domainMax = maxKilo + 1;

  const barSize = 7;
  const barGap = 8;

  const kiloTicks = Array.from(
    { length: domainMax - domainMin + 1 },
    (_, i) => domainMin + i,
  );

  return (
    <div ref={containerRef} className={styles.chartWrapper}>
      <h2 className={styles.chartTitle}>Activité quotidienne</h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          barGap={barGap}
          barSize={barSize}
          margin={{
            top: 64,
            right: 0,
            left: 0,
            bottom: 23,
          }}
        >
          <CartesianGrid
            vertical={false}
            stroke="#DEDEDE"
            strokeDasharray="3 3"
            x={gridX}
            width={gridWidth}
            horizontalCoordinatesGenerator={({ offset }) => {
              return kiloTicks.map((tick) => {
                const ratio = (tick - domainMin) / (domainMax - domainMin);
                return offset.top + offset.height - ratio * offset.height;
              });
            }}
          />

          <XAxis
            dataKey="day"
            tickMargin={16}
            tickLine={false}
            axisLine={false}
            padding={{ left: 0, right: 10 }}
            tick={{
              fontSize: 14,
              fill: "#9B9EAC",
              fontWeight: 500,
            }}
          />

          <YAxis
            yAxisId="kilogram"
            orientation="right"
            type="number"
            domain={[domainMin, domainMax]}
            ticks={kiloTicks}
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
            interval={0}
            tick={{
              fontSize: 14,
              fill: "#9B9EAC",
              fontWeight: 500,
            }}
          />

          <YAxis yAxisId="calories" hide />

          <Tooltip cursor={{ fill: "#C4C4C4" }} content={<CustomTooltip />} />

          <Legend
            iconType="circle"
            iconSize={8}
            align="right"
            verticalAlign="top"
            wrapperStyle={{ top: 24, right: 26 }}
          />

          <Bar
            yAxisId="kilogram"
            dataKey="kilogram"
            name="Poids (kg)"
            fill="#282D30"
            radius={[10, 10, 0, 0]}
          />

          <Bar
            yAxisId="calories"
            dataKey="calories"
            name="Calories brûlées (kCal)"
            fill="#E60000"
            radius={[10, 10, 0, 0]}
          />

          <RechartsDevtools />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

BarGraph.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.number.isRequired,
      kilogram: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default BarGraph;
