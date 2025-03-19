# Curso de Soporte Vital Básico y Avanzado

Documentación del Curso de Soporte Vital Básico y Avanzado basada en VitePress.

## Estructura del Proyecto

```text
/
├── docs/
│   ├── .vitepress/
│   │   └── config.ts     # Configuración de VitePress (incluye puerto 3000)
│   ├── introduccion/     # Contenido sobre introducción
│   ├── pcr/              # Contenido sobre PCR
│   ├── svb/              # Contenido sobre SVB
│   ├── guia.md           # Guía general
│   └── index.md          # Página principal
├── package.json          # Dependencias y scripts
└── tsconfig.json         # Configuración de TypeScript
```

## Comandos Disponibles

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando                 | Acción                                              |
| :---------------------- | :-------------------------------------------------- |
| `npm install`           | Instala las dependencias                            |
| `npm run docs:dev`      | Inicia el servidor de desarrollo en `localhost:3000`|
| `npm run docs:build`    | Construye el sitio para producción en `./dist/`     |
| `npm run docs:preview`  | Previsualiza la construcción antes de desplegar     |

## Cómo ejecutar el proyecto localmente

1. Instala las dependencias:
   ```
   npm install
   ```

2. Inicia el servidor de desarrollo:
   ```
   npm run docs:dev
   ```

3. Abre tu navegador en `http://localhost:3000`

## Personalización

Este proyecto utiliza VitePress v1.6.3 con las siguientes características:

- Navegación personalizada en español
- Buscador local integrado
- Índice de contenidos automático
- Puerto personalizado (3000)
- Apertura automática del navegador

## Construir para producción

Para construir el sitio para producción:

```
npm run docs:build
```

Los archivos generados estarán en el directorio `dist` y podrás previsualizar la construcción con:

```
npm run docs:preview
```

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
