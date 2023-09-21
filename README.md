<p align="center">
  <img width="1583"  alt="Pathfinder Logo" alt="Group 1890493-2" src="https://github.com/grafbase/pathfinder/assets/14347895/57a6c505-0624-475d-9f40-854ead751b6d">
    <h3 align="center">Pathfinder</h3>
    <p align="center"><b>The missing GraphQL IDE</b></p>
    <p align="center"><sub><sup><b>Free, open-source and cross-platform</b></sup></sub></p>
    <img width="1000" src="https://github.com/grafbase/pathfinder/assets/14347895/462f08ac-c8fd-42ab-9f4b-e1be4520c6af" alt="An image of Pathfinder" />
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
