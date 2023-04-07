FROM node:16

WORKDIR /usr/src/app

COPY . .

ENV MONGO_URL=mongodb://root:example@mongo:27017/?retryWrites=true&w=majority

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

# npm run dev is the command to start the application in development mode
CMD ["npm", "run", "dev"]