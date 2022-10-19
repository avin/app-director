# Instruction to run app with Docker

Rename `back-env.stage.prod.example` to `back-env.stage.prod`

Update secret parameters (see `CHANGE_ME` strings)

Build app (first time only or after source updates):

```sh
docker-compose -f ./docker-compose-build.yml up --build
```

Run app:

```sh
docker-compose -f ./docker-compose-run.yml up --build
```
