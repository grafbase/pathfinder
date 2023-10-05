<p align="center">
  <img width="1583" alt="Pathfinder" src="https://github.com/grafbase/pathfinder/assets/4585/8ab41ae3-81a9-4d0c-99ff-c46dd6adf422">
    <h3 align="center">Pathfinder</h3>
    <p align="center"><b>The missing GraphQL IDE</b></p>
    <p align="center"><sub><sup><b>Free, open-source and cross-platform</b></sup></sub></p>
    <img width="1000" src="https://github.com/grafbase/pathfinder/assets/4585/0eff5bcf-be3a-4028-beb2-6332c0ba19aa" alt="The Pathfinder desktop application" />
</p>

# Installation & Usage

```bash
pnpm add @pathfinder/react # or yarn add @pathfinder/react or npm install @pathfinder/react
```

The sole export from `@pathfinder/react` is a React component called Pathfinder. For our initial release, a limited set of props is allowed. You can see examples of props usage in the `pathfinder.stories.tsx` file.


# Local development
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
The primary development environment for Pathfinder is [ladle](https://ladle.dev/) and the Pathfinder stories are set up to use environment variables. Make a copy of the example file:

```bash
cd apps/ladle
cp .env.development.local.example .env.development.local
```

Once copied, you can open `.env.development.local` and add an endpoint, at a minimum, and auth header key/value if necessary.

## Build monaco workers
Building the necessary workers ahead of time absolves consuming code from having to fuss with build tool plugins. This is good.

```bash
pnpm react:build:workers
```

## Run ladle

```bash
pnpm ladle:serve
```

Ladle is at `http://localhost:61000/`.
