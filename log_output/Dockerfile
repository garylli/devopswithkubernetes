FROM node:alpine AS base
WORKDIR /srv
COPY ./package.json ./pnpm-lock.yaml ./
RUN npm install -y

FROM node:alpine AS server
WORKDIR /srv
COPY --from=base /srv/node_modules ./node_modules
COPY --from=base /srv/package.json ./package.json
COPY ./src ./src
ENTRYPOINT [ "npm", "start" ]