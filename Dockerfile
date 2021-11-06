FROM node:lts-alpine

WORKDIR /Ariel/opt/

RUN apk update

COPY . .
RUN yarn install --immutable
RUN yarn build

RUN rm -rf src
RUN yarn cache clean

ENTRYPOINT ["node", "."]
