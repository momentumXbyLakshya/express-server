FROM node:lts-alpine

WORKDIR /app

COPY package*.json .
COPY tsconfig.json .

RUN npm install --omit=dev

COPY dist ./dist

EXPOSE 8080

ENTRYPOINT ["node", "dist/index.js"]