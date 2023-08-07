FROM node:14

WORKDIR /app

COPY package.json package-lock.json ./
COPY public/ ./public
COPY src/ ./src

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]