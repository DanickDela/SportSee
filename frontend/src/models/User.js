/**
 * Modèle représentant un utilisateur.
 *
 * Cette classe permet de :
 * - sécuriser les données provenant de différentes sources
 * - normaliser les propriétés (ex : todayScore / score)
 * - fournir des getters simples pour l'affichage UI
 */
export class User {
  /**
   * Crée une instance de User.
   *
   * @param {Object} [data={}] - Données brutes utilisateur
   * @param {number|null} [data.id=null] - Identifiant utilisateur
   * @param {Object} [data.userInfos={}] - Informations personnelles
   * @param {string} [data.userInfos.firstName=""] - Prénom
   * @param {string} [data.userInfos.lastName=""] - Nom
   * @param {number|null} [data.userInfos.age=null] - Âge
   * @param {number} [data.todayScore] - Score journalier (selon certaines sources)
   * @param {number} [data.score] - Score utilisateur (autre format possible)
   * @param {Object} [data.keyData={}] - Données nutritionnelles
   * @param {number} [data.keyData.calorieCount=0] - Calories
   * @param {number} [data.keyData.proteinCount=0] - Protéines
   * @param {number} [data.keyData.carbohydrateCount=0] - Glucides
   * @param {number} [data.keyData.lipidCount=0] - Lipides
   *
   * @description
   * Certaines sources utilisent `todayScore`, d'autres `score`.
   * Cette classe unifie ces données dans une propriété `_score`.
   */
  constructor(data = {}) {
    const { id = null, userInfos = {}, todayScore, score, keyData = {} } = data;

    const { firstName = "", lastName = "", age = null } = userInfos;

    const {
      calorieCount = 0,
      proteinCount = 0,
      carbohydrateCount = 0,
      lipidCount = 0,
    } = keyData;

    /** @private @type {number|null} */
    this._id = id;

    /** @private @type {string} */
    this._firstName = firstName;

    /** @private @type {string} */
    this._lastName = lastName;

    /** @private @type {number|null} */
    this._age = age;

    /**
     * Score unifié (entre 0 et 1)
     * @private
     * @type {number}
     */
    this._score = todayScore ?? score ?? 0;

    /** @private @type {number} */
    this._calories = calorieCount;

    /** @private @type {number} */
    this._protein = proteinCount;

    /** @private @type {number} */
    this._carbs = carbohydrateCount;

    /** @private @type {number} */
    this._lipids = lipidCount;
  }

  /** @returns {number|null} Identifiant utilisateur */
  get id() {
    return this._id;
  }

  /** @returns {string} Prénom */
  get firstName() {
    return this._firstName;
  }

  /** @returns {string} Nom */
  get lastName() {
    return this._lastName;
  }

  /** @returns {number|null} Âge */
  get age() {
    return this._age;
  }

  /**
   * Score brut (entre 0 et 1)
   * @returns {number}
   */
  get score() {
    return this._score;
  }

  /**
   * Score en pourcentage
   * @returns {number}
   */
  get scorePercent() {
    return this._score * 100;
  }

  /** @returns {number} Calories */
  get calories() {
    return this._calories;
  }

  /** @returns {number} Protéines */
  get protein() {
    return this._protein;
  }

  /** @returns {number} Glucides */
  get carbs() {
    return this._carbs;
  }

  /** @returns {number} Lipides */
  get lipids() {
    return this._lipids;
  }

  /**
   * Nom complet de l'utilisateur
   * @returns {string}
   */
  get fullName() {
    return `${this._firstName} ${this._lastName}`;
  }
}
