FROM node:14.16-alpine as build
WORKDIR /app
ENV NODE_ENV production
ADD package.json yarn.lock /app/
ADD services/graphql /app/services/graphql
ADD packages /app/packages
RUN yarn --production --pure-lockfile
WORKDIR /app/services/graphql

FROM node:14.16-alpine
ENV NODE_ENV production
ENV PORT 80
COPY --from=build /app /app
WORKDIR /app/services/graphql
ENTRYPOINT [ "node", "src/index.js" ]
