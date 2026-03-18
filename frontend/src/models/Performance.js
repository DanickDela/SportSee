/**
 * Dictionnaire de traduction des types de performance.
 * Convertit les libellés API (anglais) en français.
 * @constant
 * @type {Object.<string, string>}
 */
const KIND_LABELS = {
  cardio: "Cardio",
  energy: "Énergie",
  endurance: "Endurance",
  strength: "Force",
  speed: "Vitesse",
  intensity: "Intensité",
};

/**
 * Modèle représentant les performances d'un utilisateur.
 *
 * Cette classe :
 * - transforme les données brutes de l'API
 * - convertit les types de performance en libellés lisibles (FR)
 * - prépare les données pour les graphiques (RadarChart)
 */
class Performance {
  /**
   * Crée une instance de Performance.
   *
   * @param {Object} data - Données brutes de performance
   * @param {number} data.userId - Identifiant utilisateur
   * @param {Object.<number, string>} data.kind - Mapping des types (ex: 1 → "cardio")
   * @param {Array<Object>} data.data - Liste des performances
   * @param {number} data.data[].value - Valeur de performance
   * @param {number} data.data[].kind - Identifiant du type
   *
   * @description
   * L'API fournit les types de performance en anglais.
   * Ce modèle les convertit en français via un dictionnaire interne.
   */
  constructor(data = {}) {
    /** @private @type {number|null} */
    this._userId = data.userId ?? null;

    /**
     * Données transformées pour le graphique
     * @private
     * @type {Array<{value: number, kind: string}>}
     */
    this._data = (data.data ?? []).map((item) => {
      const kindLabel = data.kind?.[item.kind];

      return {
        value: item.value ?? 0,
        kind: KIND_LABELS[kindLabel] ?? kindLabel ?? "",
      };
    });
  }

  /**
   * Identifiant utilisateur
   * @returns {number|null}
   */
  get userId() {
    return this._userId;
  }

  /**
   * Données de performance formatées
   * @returns {Array<{value: number, kind: string}>}
   */
  get data() {
    return this._data;
  }

  /**
   * Données inversées pour affichage graphique
   *
   * @returns {Array<{value: number, kind: string}>}
   *
   * @description
   * Une copie du tableau est créée avec `slice()` afin
   * d'éviter toute mutation des données originales.
   * L'ordre est inversé pour correspondre à l'affichage du RadarChart.
   */
  get formattedData() {
    return this._data.slice().reverse();
  }
}

export default Performance;
