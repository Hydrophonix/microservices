FROM node:14.19

WORKDIR /app

COPY package.json .
RUN npm i
COPY . .

CMD [ "npm", "start" ]