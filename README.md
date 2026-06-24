# Space Tracker API

A RESTful API for managing space objects using Node.js, Express, MySQL, Docker, and Sequelize ORM.

## Resources

- Galaxies
- Stars
- Planets
- StarsPlanets join table

## Model Fields

Each main resource includes:

- name
- size
- description

## Relationships

- Galaxy has many Stars
- Star belongs to Galaxy
- Star belongs to many Planets
- Planet belongs to many Stars
- StarsPlanets links Stars and Planets

## Run Project

docker compose up

Open a second terminal:

./bin/node

## API Routes

GET /galaxies
GET /galaxies/:id
POST /galaxies
PUT /galaxies/:id
DELETE /galaxies/:id

GET /stars
GET /stars/:id
POST /stars
PUT /stars/:id
DELETE /stars/:id

GET /planets
GET /planets/:id
POST /planets
PUT /planets/:id
DELETE /planets/:id

GET /stars-planets
POST /stars-planets
DELETE /stars-planets/:id