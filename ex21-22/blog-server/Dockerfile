FROM node:16

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node  . .
USER node
RUN npm install

# ENV MONGO_URL=mongodb://root:example@mongo:27017/?retryWrites=true&w=majority



# RUN npm install\
#         && npm install typescript -g

RUN npm run build

# RUN touch test.txt

# CMD ["node", "./dist/index.js"]

CMD ["npm", "run", "start"]