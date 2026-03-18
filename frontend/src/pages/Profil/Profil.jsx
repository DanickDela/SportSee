import { useNavigate } from "react-router-dom";
import styles from "../../styles/profil.module.scss";

/**
 * Page de sélection d'utilisateur.
 *
 * Permet de choisir entre les deux profils disponibles
 * avant d'accéder au dashboard.
 *
 * @returns {JSX.Element}
 */
function UserSelect() {
  const navigate = useNavigate();

  const users = [
    { id: 12, label: "Utilisateur 1", name: "Karl Dovineau" },
    { id: 18, label: "Utilisateur 2", name: "Cecilia Ratorez" },
  ];

  const handleSelectUser = (id) => {
    navigate(`/user/${id}`);
  };

  return (
    <main className={styles.userSelect}>
      <div className={styles.userSelect__container}>
        <h1 className={styles.userSelect__title}>Choisissez un utilisateur</h1>
        <p className={styles.userSelect__subtitle}>
          Sélectionnez un profil pour afficher le dashboard.
        </p>

        <div className={styles.userSelect__cards}>
          {users.map((user) => (
            <button
              key={user.id}
              type="button"
              className={styles.userCard}
              onClick={() => handleSelectUser(user.id)}
            >
              <span className={styles.userCard__label}>{user.label}</span>
              <span className={styles.userCard__name}>{user.name}</span>
              <span className={styles.userCard__id}>ID : {user.id}</span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

export default UserSelect;
