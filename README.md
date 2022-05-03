# Node.js app for the World Texting Foundation, also known as WTF.

## Getting started

### Prerequisites

Your system needs a fairly recent version of [Docker](https://www.docker.com/products/docker-desktop/).

### Installing

To start the project we'll simply run:

`docker-compose up`

## Available enpoints
- **`GET /acronym?from=0&limit=10&search=:search`**
  - `search is required`
  - `from is defaulted by 10`
  - `limit is defaulted by 10`
- **`GET /acronym/info`**
- **`GET /acronym/:id`**
- **`GET /acronym/random?amount=3`**
  - `amount us defaulted by 10`
- **`POST /acronym`**
- **`PUT /acronym/:acronym`**
- **`DELETE /acronym/:acronym`**

## Available auth endpoints
- **`GET /auth/:email`**
  - `Endpoint to generate Json Web Token`
  - `Provide email address`

## Bugs
PR's are welcome!
