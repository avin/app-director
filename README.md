# AppDirector

## Install

```sh
npm install
npm run build
```

## Навигация

- Контроль
  - Мониторинг (вывод последних обновлений версии)
  - Реестр (поиск стендов/приложений/организаций)
- Управление
  - Приложения 
  - Организации
  - Стенды
- Администрирование
  - Пользователи
  - История действий

## Сущности

### Приложение (application)

- id
- title
- description
- properties (JSON)

### Стенд (stand)

- id
- stand_category_id
- app_id
- title
- description
- org_id
- properties (JSON)

### Категория Стенда (stand_category)

- id
- title
- alias
- description
- properties (JSON)

### Организация (organization)

- id
- title
- description
- alias
- properties (JSON)

### Пользователь (user)

- id
- email
- password
- full_name
- description
- role (VIEWER | MODERATOR | ADMINISTRATOR)
- properties (JSON)

### Проверяльщики (inspector)

- id
- stand_id
- properties (JSON)

### Результаты проверок (check)

- id
- inspector_id
- created_at
- updated_at
- checks_count
- result
- successful (bool)
