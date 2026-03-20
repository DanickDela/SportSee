import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getUserById,
  getUserActivity,
  getUserPerformance,
  getUserSessions,
} from "../../services/api";
import BarGraph from "../../components/BarGraph/BarGraph";
import RadarGraph from "../../components/RadarGraph/RadarGraph";
import RadialBarGraph from "../../components/RadialBarGraph/RadialBarGraph";
import LineGraph from "../../components/LineGraph/LineGraph";
import Card from "../../components/Card/Card";
import styles from "../../styles/profil.module.scss";

import calorieicon from "../../assets/calories-icon.png";
import proteinicon from "../../assets/protein-icon.png";
import carbsicon from "../../assets/carbs-icon.png";
import faticon from "../../assets/fat-icon.png";

/**
 * Page d'accueil du dashboard utilisateur.
 *
 * Ce composant récupère et affiche les données principales
 * d'un utilisateur à partir de l'identifiant présent dans l'URL :
 * - les informations utilisateur
 * - l'activité quotidienne
 * - les sessions moyennes
 * - les performances
 * - le score
 * - les cartes nutritionnelles
 *
 * @component
 * @returns {JSX.Element} La page d'accueil du dashboard utilisateur
 */
function Accueil() {
  /**
   * Identifiant de l'utilisateur récupéré depuis l'URL
   * @type {{ id: string | undefined }}
   */
  const { id } = useParams();

  /** @type {[Object|null, Function]} */
  const [user, setUser] = useState(null);

  /** @type {[Object, Function]} */
  const [userActivityData, setUserActivity] = useState({});

  /** @type {[Object|null, Function]} */
  const [userSessionsData, setUserSessions] = useState(null);

  /** @type {[Object|null, Function]} */
  const [userPerformanceData, setUserPerformance] = useState(null);

  /** @type {[boolean, Function]} */
  const [error, setError] = useState(false);

  /** @type {[boolean, Function]} */
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * Charge l'ensemble des données nécessaires au dashboard.
     *
     * @async
     * @function getData
     * @returns {Promise<void>}
     */
    async function getData() {
      try {
        const userData = await getUserById(id);
        setUser(userData);

        const activityData = await getUserActivity(id);
        setUserActivity(activityData);

        const sessionsData = await getUserSessions(id);
        setUserSessions(sessionsData);

        const performanceData = await getUserPerformance(id);
        setUserPerformance(performanceData);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [id]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>Utilisateur non trouvé ou API non disponible.</p>;
  }

  return (
    <>
      <section className={styles.userinfos}>
        <h1>
          Bonjour <span>{user.firstName}</span>
        </h1>
        <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
      </section>

      <section className={styles.dashboard}>
        <div className={styles.dashboard__bargraph}>
          <div className={styles.dashboard__bargraph_top}>
            <BarGraph data={userActivityData?.activities ?? []} />
          </div>

          <div className={styles.dashboard__bargraph_low}>
            <LineGraph data={userSessionsData?.sessions ?? []} />
            <div className={styles.dashboard__bargraph_low_performance}>
              <RadarGraph data={userPerformanceData?.formattedData ?? []} />
            </div>
            <RadialBarGraph score={user.scorePercent ?? 0} />
          </div>
        </div>

        <div className={styles.dashboard__synth}>
          <Card
            data={{
              quantity: user.calories,
              unit: "kCal",
              name: "Calories",
              macroType: "calories",
            }}
            icon={calorieicon}
          />
          <Card
            data={{
              quantity: user.protein,
              unit: "g",
              name: "Protéines",
              macroType: "proteines",
            }}
            icon={proteinicon}
          />
          <Card
            data={{
              quantity: user.carbs,
              unit: "g",
              name: "Glucides",
              macroType: "glucides",
            }}
            icon={carbsicon}
          />
          <Card
            data={{
              quantity: user.lipids,
              unit: "g",
              name: "Lipides",
              macroType: "lipides",
            }}
            icon={faticon}
          />
        </div>
      </section>
    </>
  );
}

export default Accueil;
