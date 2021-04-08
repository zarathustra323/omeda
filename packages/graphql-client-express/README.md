# Omeda GraphQL Express Middleware
Express middleware for creating and using the Omeda GraphQL client

## Installation
```
yarn add @parameter1/omeda-graphql-client-express
```

## Usage
The middleware can be applied globally to Express, or on a per-route (or per-router) basis.

```js
const express = require('express');
const omedaGraphQL = require('@parameter1/omeda-graphql-client-express');

const app = express();

// the client will be globally available on `req.$omeda` and `res.locals.$omeda`
app.use(omedaGraphQL({
  uri: 'https://graphql.omeda.parameter1.com',
  brandKey: 'yourbrandkey',
  appId: 'your app id',
  inputId: 'your input id',
}));
```
