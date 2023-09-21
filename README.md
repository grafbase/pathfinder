<p align="center">
  <img width="1583" alt="Pathfinder" src="https://github.com/grafbase/pathfinder/assets/4585/8ab41ae3-81a9-4d0c-99ff-c46dd6adf422">
    <h3 align="center">Pathfinder</h3>
    <p align="center"><b>The missing GraphQL IDE</b></p>
    <p align="center"><sub><sup><b>Free, open-source and cross-platform</b></sup></sub></p>
    <img width="1000" src="https://github.com/grafbase/pathfinder/assets/14347895/462f08ac-c8fd-42ab-9f4b-e1be4520c6af" alt="The Pathfinder desktop application" />
</p>

## Clone the repository

```bash
git clone https://github.com/grafbase/pathfinder.git
```

## Install packages

```bash
cd pathfinder
pnpm i
```

## Update .env

```bash
cd apps/ladle
cp .env.development.local.example .env.development.local
```

Once copied, you can open `.env.development.local` and add an api key and an endpoint.

## Run ladle

```bash
pnpm ladle:serve
```

Ladle is at `http://localhost:61000/`.
