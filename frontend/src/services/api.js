import axios from "axios";
import { ModelFactory } from "../Factory/ModelFactory.js";
import {
  mockedUserInfo,
  mockedUserActivities,
  mockedUserSessions,
  mockedUserPerformances,
} from "../mockedData/data";

/**
 * Variable d'environnement permettant d'activer les données mockées
 * @type {boolean}
 */
const mockedData = import.meta.env.VITE_REACT_MOCK_CONFIG === "true";

/**
 * URL de l'API backend
 * @constant {string}
 */
const API_URL = "http://localhost:3000";

/**
 * Récupère les informations principales d'un utilisateur
 *
 * @async
 * @function getUserById
 * @param {number} id - Identifiant de l'utilisateur
 * @returns {Promise<User>} Instance du modèle User
 * @throws {Error} Si l'utilisateur est introuvable ou erreur API
 */
export async function getUserById(id) {
  try {
    let data;

    if (mockedData) {
      data = mockedUserInfo.find((user) => user.id === Number(id));
    } else {
      const response = await axios.get(`${API_URL}/user/${id}`);
      data = response.data.data;
    }

    if (!data) {
      throw new Error(`Utilisateur ${id} introuvable`);
    }

    return ModelFactory.create("user", data);
  } catch (error) {
    console.error("Erreur getUserById :", error);
    throw error;
  }
}

/**
 * Récupère l'activité quotidienne d'un utilisateur
 *
 * @async
 * @function getUserActivity
 * @param {number} id - Identifiant de l'utilisateur
 * @returns {Promise<Activity>} Instance du modèle Activity
 * @throws {Error} Si les données sont introuvables
 */
export async function getUserActivity(id) {
  try {
    let data;

    if (mockedData) {
      data = mockedUserActivities.find(
        (activity) => activity.userId === Number(id),
      );
    } else {
      const response = await axios.get(`${API_URL}/user/${id}/activity`);
      data = response.data.data;
    }

    if (!data) {
      throw new Error(`Activité de l'utilisateur ${id} introuvable`);
    }

    return ModelFactory.create("activity", data);
  } catch (error) {
    console.error("Erreur getUserActivity :", error);
    throw error;
  }
}

/**
 * Récupère la durée moyenne des sessions d'un utilisateur
 *
 * @async
 * @function getUserSessions
 * @param {number} id - Identifiant de l'utilisateur
 * @returns {Promise<Sessions>} Instance du modèle Sessions
 * @throws {Error} Si les sessions sont introuvables
 */
export async function getUserSessions(id) {
  try {
    let data;

    if (mockedData) {
      data = mockedUserSessions.find(
        (session) => session.userId === Number(id),
      );
    } else {
      const response = await axios.get(
        `${API_URL}/user/${id}/average-sessions`,
      );
      data = response.data.data;
    }

    if (!data) {
      throw new Error(`Sessions de l'utilisateur ${id} introuvables`);
    }

    return ModelFactory.create("sessions", data);
  } catch (error) {
    console.error("Erreur getUserSessions :", error);
    throw error;
  }
}

/**
 * Récupère les performances d'un utilisateur
 *
 * @async
 * @function getUserPerformance
 * @param {number} id - Identifiant de l'utilisateur
 * @returns {Promise<Performance>} Instance du modèle Performance
 * @throws {Error} Si les performances sont introuvables
 */
export async function getUserPerformance(id) {
  try {
    let data;

    if (mockedData) {
      data = mockedUserPerformances.find(
        (performance) => performance.userId === Number(id),
      );
    } else {
      const response = await axios.get(`${API_URL}/user/${id}/performance`);
      data = response.data.data;
    }

    if (!data) {
      throw new Error(`Performances de l'utilisateur ${id} introuvables`);
    }

    return ModelFactory.create("performance", data);
  } catch (error) {
    console.error("Erreur getUserPerformance :", error);
    throw error;
  }
}
