FROM node:lts-alpine

WORKDIR /Ariel/opt/

LABEL org.opencontainers.image.source https://github.com/AstrielDivision/Ariel

RUN apk update

COPY . .
RUN yarn install --immutable
RUN yarn build

RUN rm -rf src
RUN yarn cache clean

EXPOSE 4000

CMD ["yarn", "start"]
