FROM node:lts-alpine AS BUILD_IMAGE

RUN mkdir -p /home/node/build/node_modules && chown -R node:node /home/node/build

WORKDIR /home/node/build

COPY --chown=node:node package.json yarn.* ./

USER node

RUN yarn

COPY --chown=node:node . .

RUN yarn build

FROM node:lts-alpine

RUN mkdir -p /home/node/api/node_modules && chown -R node:node /home/node/api

WORKDIR /home/node/api

COPY --chown=node:node --from=BUILD_IMAGE /home/node/build/dist ./dist
COPY --chown=node:node --from=BUILD_IMAGE /home/node/build/node_modules ./node_modules
COPY --chown=node:node --from=BUILD_IMAGE /home/node/build/.env ./.env

EXPOSE 3333


CMD ["node", "./dist/server.js"]
