# Backend

## Dev migration

```sh
# Apply migrations
npx dotenv -e ./.env.stage.dev typeorm migration:run

# Revert last migration
npx dotenv -e ./.env.stage.dev typeorm migration:revert
```
