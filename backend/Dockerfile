FROM node:20-alpine
RUN apk add --no-cache git
RUN git clone https://github.com/Kjacob14/tienda3b.git /app_repo
WORKDIR /app_repo/backend
RUN npm install --production
EXPOSE 3000
CMD ["node", "server.js"]
