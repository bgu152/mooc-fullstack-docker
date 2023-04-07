FROM node:16

WORKDIR /usr/src/app

COPY . .

ENV MONGO_URL=mongodb://root:example@mongo:27017/?retryWrites=true&w=majority

RUN npm ci

RUN npm run build

CMD ["npm", "start"]