<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Basic Api that could be used for parking
- User signup / User login
- Create parking with differents fees (aswell as free periods)
- Create Tiket linked to a parking
- Ticket price check


## Installation

```bash
$ yarn install
```

## Environment variable
.env file to create at the root of the project:

```bash
DATABASE_URL="postgresql://postgres:123@localhost:5434/iem?schema=public"
JWT_SECRET="shhhThatsASecret"
```
.env.test file to create at the root of the project:
```bash
DATABASE_URL="postgresql://postgres:123@localhost:5435/iem?schema=public"
JWT_SECRET="shhhThatsASecret"
```


## Setup and start database for development (Require Docker)

```bash
$ yarn db:dev:restart
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Setup and start database for test (Require Docker)

```bash
$ yarn db:test:restart
```

## Test

```bash

# e2e tests
$ yarn test:e2e

```


## Api Doc
<br/>

### Auth: 

| Méthode http | Url | Méthod|Return| Commentaire |
| ----------- | ------| ------ |------|-----|
| POST | /auth/signup | Require : email, password| User object | Create a new user|
| POST | /auth/signin | Require : email, password | Access token | Log the user in |
<br/>

## All following routes requires Access_Token in header as Authorisation: Bearer {access_token}
<br/>

### Parking: 

| Méthode http | Url | Méthod|Return| Commentaire |
| ----------- | ------| ------ |------|-----|
| GET | /parkings | | Parkings list | Get all parkings existing in database|
| GET | /parkings/:id | :id = parking id | Parking object | Get parking by id |
| POST | /parkings |Requires: { name: string, location: string, availableSlots: number, totalSlots: number, freeLengthInMin: number, pricePerHour: number } | Parking object | Create a new parking|
| PATCH | /parkings/:id | :id = parking id / Requires: Any keys from parking object| Parking object | Update a parking |
| DELETE | /parkings/:id | :id = parking id |  | Delete parking by id |
<br/>

### Ticket: 

| Méthode http | Url | Méthod|Return| Commentaire |
| ----------- | ------| ------ |------|-----|
| GET | /tickets | | tickets list | Get all tickets existing in database|
| GET | /tickets/:id | :id = ticket id | ticket object | Get ticket by id |
| GET | /tickets/price/:id | :id = ticket id | ticket object | Get the current price of the ticket |
| POST | /tickets |Requires: { parkingID: number } | Ticket object | Create a new ticket|
| PATCH | /tickets/:id | :id = ticket id / | Goodbye message | Update the ticket once paid, set paid to "true" |
| DELETE | /tickets/:id | :id = parking id |  | Delete ticket by id |