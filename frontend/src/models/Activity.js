/**
 * Modèle Activity
 *
 * Transforme les données d'activité utilisateur
 * pour les rendre exploitables dans le BarChart.
 */
class Activity {
  /**
   * @param {Object} data - Données brutes API
   * @param {number} data.userId
   * @param {Array} data.sessions
   */
  constructor(data) {
    this._userId = data.userId;

    this._sessions = data.sessions.map((session, index) => ({
      day: index + 1,
      kilogram: session.kilogram,
      calories: session.calories,
    }));
  }

  /** ID utilisateur */
  get userId() {
    return this._userId;
  }

  /** Sessions formatées */
  get activities() {
    return this._sessions;
  }
}

export default Activity;
