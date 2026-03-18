import { User } from "../models/User";
import Activity from "../models/Activity";
import Sessions from "../models/Sessions";
import Performance from "../models/Performance";
/**
 * Factory permettant de créer les instances de modèles
 * à partir de données brutes.
 *
 * Centralise l'instanciation des modèles afin de :
 * - éviter la duplication de code
 * - uniformiser la création des objets
 * - faciliter la maintenance et l'évolution
 */
export class ModelFactory {
  /**
   * Crée une instance de modèle en fonction du type fourni.
   *
   * @param {"user"|"activity"|"sessions"|"performance"} type - Type du modèle à instancier
   * @param {Object} data - Données brutes issues de l'API ou du mock
   *
   * @returns {User|Activity|Sessions|Performance} Instance du modèle correspondant
   *
   * @throws {Error} Si le type de modèle est inconnu
   *
   * @example
   * const user = ModelFactory.create("user", data);
   * const activity = ModelFactory.create("activity", data);
   */
  static create(type, data) {
    switch (type) {
      case "user":
        return new User(data);

      case "activity":
        return new Activity(data);

      case "sessions":
        return new Sessions(data);

      case "performance":
        return new Performance(data);

      default:
        throw new Error(`Type de modèle inconnu : ${type}`);
    }
  }
}
