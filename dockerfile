FROM  node:18.12 as base

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i

COPY . .



