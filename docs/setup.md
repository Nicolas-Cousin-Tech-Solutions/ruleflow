# 🧪 RuleFlow – Environnement DevContainer

## 🚀 Lancer le projet

```bash
git clone https://github.com/Nicolas-Cousin-Tech-Solutions/ruleflow.git
cd ruleflow
code .
```

VS Code va te proposer : “Reopen in Container” → ✅

## ⚙️ Technologies installées

- .NET 8 SDK (via image devcontainer)
- Node.js LTS + Yarn
- F# + Ionide
- TypeScript, Tailwind
- PostgreSQL (via Docker Compose)

## 📁 Structure

```
apps/
  frontend/      ← Next.js 15
  engine-api/    ← F# Giraffe (à venir)
prisma/
.devcontainer/
  docker-compose.yml
```

## 💡 Commandes utiles

```bash
cd apps/frontend
yarn dev
```

Tu peux ensuite accéder à `http://localhost:3000`