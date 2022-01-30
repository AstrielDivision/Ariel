FROM node:17-buster-slim as base

WORKDIR /usr/src/app

RUN apt-get update && \
  apt-get upgrade -y --no-install-recommends && \
  apt-get install -y --no-install-recommends build-essential dumb-init python3 && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

COPY --chown=node:node yarn.lock .
COPY --chown=node:node package.json .
COPY --chown=node:node .yarnrc.yml .
COPY --chown=node:node .yarn/ .yarn/



ENTRYPOINT [ "dumb-init", "--" ]

FROM base as builder

COPY --chown=node:node src/ src/

ENV NODE_ENV="development"

COPY --chown=node:node prisma/ prisma/

RUN yarn install --immutable
RUN yarn prisma generate
RUN yarn build

RUN yarn cache clear

FROM base AS runner

ENV NODE_ENV="production"

COPY --chown=node:node --from=builder /usr/src/app/prisma/ prisma/

COPY --chown=node:node --from=builder /usr/src/app/build build/

COPY --chown=node:node --from=builder /usr/src/app/node_modules node_modules/

RUN chown node:node /usr/src/app/

# RUN yarn prisma migrate dev --name raven

USER node

CMD ["yarn", "start"]
