FROM node:16
WORKDIR /usr/src/app
COPY . .
# ENV REDIS_URL=redis://localhost:3457 MONGO_URL=mongodb://the_username:the_password@localhost:3456/the_database
ENV REDIS_URL=redis://localhost:6379 MONGO_URL=mongodb://the_username:the_password@localhost:27017/the_database
RUN npm install
CMD ["npm", "start"]