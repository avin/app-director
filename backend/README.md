# Add-Director Backend

## Dev migrations

```sh
## !!! Before run migrations - build src !!!
npm run build

## Create migration
npm run typeorm:cli migration:create -- -n FooBar

## Apply migrations
npm run typeorm:cli migration:run

## Revert last migration
npm run typeorm:cli migration:revert
```
