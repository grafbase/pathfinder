# pathfinder

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
