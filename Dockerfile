#Autor: Jakub Kiełb

# Etap 1: Budowanie aplikacji
FROM node:alpine AS builder

WORKDIR /app

COPY package.json .

RUN npm install moment-timezone 
RUN npm install express

COPY server.js .

# Etap 2: Uruchomienie aplikacji
FROM node:alpine

WORKDIR /app

RUN apk add --update --no-cache curl && \
    rm -rf /etc/apk/cache

COPY --from=builder /app .

EXPOSE 3000

CMD ["node", "server.js"]

HEALTHCHECK --interval=10s --timeout=1s \
 CMD curl -f http://localhost:3000 || exit 1
