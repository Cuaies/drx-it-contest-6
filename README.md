# NodeJS Scaffolding

NodeJs Scaffolding is the structured setup of a project, ensuring maintainability and scalability by organizing files, configuring dependencies, and streamlining development workflows.

## Table Of Contents

- [Installation](#installation)
- [Getting Started](#getting-started)
- [Customization](#customization)
  - [Converting to a Monorepo](#converting-to-a-monorepo)

## Installation

In order to properly set it up, follow these steps:

- Create your own repository using this template. [More info →](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template#about-repository-templates)
- Modify the `name` field within `package.json` with a desired value.
- After renaming, install the project dependencies & update `package-lock.json` using the following command:

  ```sh
  $ npm i
  ```

With the dependencies installed, your project is now set up and ready to use. Follow the next steps to configure and run the application. If you encounter any issues, ensure you are using the correct Node.js version and that your package manager is up to date.

For troubleshooting or further setup, refer to the project documentation or reach out.

## Getting Started

Start the application by running the following command:

```sh
$ npm run start
```

To enable watch mode, use the execute the following line:

```sh
$ npm run start:dev
```

These will execute the entry point, located at `src/main.ts`.

## Customization

This section provides guidance on how to tailor the scaffolding to suit your project’s specific needs. Whether you're adapting it for a monorepo structure, adding new dependencies, or adjusting the configuration, you'll find all the steps here to help you customize the project to your requirements.

### Converting to a Monorepo

While this scaffolding is designed to be flexible, you may choose to expand it into a monorepo setup as your project grows. For detailed instructions on how to convert your project to a monorepo, check out the [Monorepo Setup Guide](#).
