# AppDirector

## Навигация

- Контроль
  - Мониторинг (вывод последних обновлений версии)
  - Реестр (поиск стендов/приложений/организаций)
- Управление
  - Приложения
  - Организации 
- Администрирование
  - Пользователи
  - История действий

## Сущности

### Приложение (apps)

- id
- title
- description
- extended (JSON)

### Стенд (stands)

- id
- stand_category_id
- app_id
- title
- description
- org_id
- extended (JSON)

### Категория Стенда (stand_categories)

- id
- title
- alias
- description
- extended (JSON)

### Организация (orgs)

- id
- title
- description
- alias
- extended (JSON)

### Пользователь (users)

- id
- email
- password
- full_name
- description
- avatar
- role (VIEWER | MODERATOR | ADMINISTRATOR)
- extended (JSON)

### Проверяльщики (inspectors)

- id
- stand_id
- settings (JSON)

### Результаты проверок (checks)

- id
- inspector_id
- created_at
- updated_at
- checks_count
- result
- successful (bool)
