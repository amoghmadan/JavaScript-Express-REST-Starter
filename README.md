# JavaScript-Express-REST-Starter
Kick-starter to your REST application.

## Setup
    npm i

## How to run?
    Development: npm run serve
    Build: npm run build
    Production: npm start

## Project Structure
    - src
        - index.js
        - App.js
        - controllers
            - person.controller.js
            - root.controller.js
        - models
            - person.model.js
        - routes
            - index.js
            - person.route.js
            - root.route.js
    - resources
        - development.json
        - prodcution.json

## Deploy
    npm i -g pm2
    pm2 --name <app_name_here> start npm -- start --watch-delay <seconds_here>

## Check Application Status
    pm2 ps
