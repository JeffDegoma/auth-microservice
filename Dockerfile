FROM node:15.2.1-alpine3.12

WORKDIR /app
COPY package.json .
COPY tsconfig.json .
RUN npm install --only=prod
COPY . .
EXPOSE 3000

CMD ["npm", "run", "start"]