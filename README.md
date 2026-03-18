# 🏋️‍♂️ SportSee

SportSee est une application de suivi d’activité sportive permettant de visualiser les performances d’un utilisateur à travers différents graphiques interactifs.

---

## 📸 Aperçu

- Dashboard utilisateur
- Graphiques d'activité quotidienne
- Sessions moyennes
- Performances (radar)
- Score utilisateur

---

## 🛠️ Technologies utilisées

- React
- React Router
- Recharts
- SCSS (architecture modulaire)
- Axios

---

## 📦 Installation

### 1. Cloner le projet

```bash
git clone https://github.com/DanickDela/sportsee.git
cd sportsee

⚙️ Configuration

Le projet peut fonctionner avec :

🔹 Données mockées
VITE_REACT_MOCK_CONFIG=true
🔹 API backend
VITE_REACT_MOCK_CONFIG=false


📡 API

Le backend doit être lancé sur :
http://localhost:3000

Endpoints utilisés :
/user/:id
/user/:id/activity
/user/:id/average-sessions
/user/:id/performance

🧠 Architecture

Services : appels API / mock
ModelFactory : transformation des données en objets métier
Components : composants UI réutilisables
Pages : logique des pages (Profil)

📊 Fonctionnalités

Affichage dynamique selon l'utilisateur (/user/:id)
Gestion des erreurs API
Mode mock / API
Graphiques personnalisés (tooltip, cursor…)

👨‍💻 Auteur
Danick Delaroche

