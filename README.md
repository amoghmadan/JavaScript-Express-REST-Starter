# JavaScript-Express-REST-Starter

Kick-starter to your REST application.

`Node`, `Express`, `SQLite`, `CLI` and more.

## Introduction

The project is a skeleton for an experss application and the way I like to configure it.

This structure is in no way a perfect fit all the projects, but might be a great fit for most big applications.

It contains login, logout and details for accounts, using custom token generation. The CLI provides user creation using commands and password change functionality as well.

## How to setup?

- Clone this project. PS: Delete the package-lock.json. You might want to rename the name & author in package.json and maintainer in Dockerfile.
- Run: -
  ```bash
  npm i --location=project
  ```
- Add an environemnt file `.env` to the root of the project and set your DATABASE_URL. Typically: -
  ```
  DATABASE_URL = sqilte:///<PATH>/db.sqlite3
  ```
- Create an admin user: -
  ```bash
  npm run dev createsuperuser
  ```
- Run the development server: -
  ```bash
  npm run dev bootstrap
  ```
