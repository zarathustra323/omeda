# Parameter1 Omeda Integrations

## Packages

### Redis API Client Caching
- Provides Redis caching of Omeda API client responses using the `ioredis` package
- `packages/api-cache-ioredis`

### Omeda API Client
- NodeJS API client for making requests to Omeda's REST API
- `packages/api-client`

### GraphQL Client
- A server-side Apollo GraphQL client factory for accessing the Omeda GraphQL service
- `packages/graphql-client`

### MongoDB
- Provides repositories for reading and writing Omeda API data from and to MongoDB
- `packages/mongodb`

## Services

### GraphQL Server
- A fully-featured GraphQL API server that uses Omeda's REST API and data from MongoDB
- `services/graphql`
