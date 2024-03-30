FROM node:20-alpine as build

WORKDIR /api

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build


FROM node:20-alpine

WORKDIR /api

ENV NODE_ENV=production
ENV PORT=80

COPY package.json yarn.lock ./

RUN yarn install --production=true --frozen-lockfile

COPY --from=build /api/build ./

EXPOSE 80

CMD ["node", "index.js"]
