FROM node:stretch-slim

WORKDIR /Ariel/app/

LABEL org.opencontainers.image.source https://github.com/AstrielDivision/Ariel

RUN apt-get update -y --no-install-recommends && \
  apt-get upgrade -y --no-install-recommends && \
  apt-get install -y --no-install-recommends dumb-init build-essential python3

COPY --chown=node:node . .

ENTRYPOINT [ "dumb-init", "--" ]

RUN yarn install --immutable
RUN yarn build

RUN rm -rf src
RUN yarn cache clean

USER node

CMD ["yarn", "start"]
