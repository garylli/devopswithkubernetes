FROM node:alpine as base
WORKDIR /build
COPY ./package.json .
RUN npm install -y

FROM node:alpine AS server
ENV PORT=3000
WORKDIR /srv
COPY --from=base /build/package.json ./package.json
COPY --from=base /build/node_modules ./node_modules
COPY ./src ./src
ENTRYPOINT [ "npm", "start" ]