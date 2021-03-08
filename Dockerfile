# node stage
FROM node:latest

WORKDIR /app

COPY . .

RUN npm install

RUN npm knex migrate:latest

RUN npm knex seed:run

EXPOSE 5000

CMD [ "npm", "start" ]
