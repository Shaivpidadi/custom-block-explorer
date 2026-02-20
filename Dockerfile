FROM node:18

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

ARG VITE_PROVIDER='http://127.0.0.1:8545'
ARG VITE_WS_PROVIDER='ws://localhost:8545'
ENV VITE_PROVIDER=$VITE_PROVIDER
ENV VITE_WS_PROVIDER=$VITE_WS_PROVIDER

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
