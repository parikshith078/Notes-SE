FROM node:lts-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY . .

RUN pnpm install

RUN pnpm run build

USER node:node

CMD [ "node", "build/index.js" ]
