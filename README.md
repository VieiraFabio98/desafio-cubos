# 🚀 Como rodar o projeto

Siga os passos abaixo para configurar e iniciar o ambiente completo usando **Docker Compose**.

---

## 📦 1. Subir os containers

BACKEND

Crie o arquivo .env
Colar as seguintes variaveis:

API_PORT=3333
DB_PORT=5432
DB_USERNAME=cubos_user
DB_PASSWORD=123456
DB_NAME=cubos_db

---

Relacionadas com AWS:
AWS_BUCKET_NAME=
AWS_BUCKET_REGION=sa-east-1
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=


execute no terminal:
```bash
yarn
docker compose up -d
yarn migration:run
yarn seed:run
```


FRONTEND
yarn
yarn dev


