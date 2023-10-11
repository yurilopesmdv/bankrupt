FROM node:20.7.0-alpine

WORKDIR /app/bankrupt

COPY . .

RUN npm install

CMD ["npm", "run", "dev"]