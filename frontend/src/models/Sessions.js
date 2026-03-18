/**
 * Modèle Sessions
 *
 * Transforme les données de sessions utilisateur
 * pour les rendre exploitables dans le LineChart.
 */
const days = ["L", "M", "M", "J", "V", "S", "D"];

class Sessions {
  /**
   * @param {Object} data - Données brutes API
   * @param {number} data.userId
   * @param {Array} data.sessions
   */
  constructor(data) {
    this._userId = data.userId;

    this._sessions = data.sessions.map((session) => ({
      day: days[session.day - 1],
      sessionLength: session.sessionLength,
    }));
  }

  /** ID utilisateur */
  get userId() {
    return this._userId;
  }

  /** Sessions formatées */
  get sessions() {
    return this._sessions;
  }
}

export default Sessions;
