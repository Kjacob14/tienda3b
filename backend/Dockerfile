FROM node:20-alpine
RUN apk add --no-cache git openssl

# Codigo del API y certificado TLS, todo desde GitHub
RUN git clone https://github.com/Kjacob14/tienda3b.git /app_repo && \
    sh /app_repo/backend/gen-cert.sh /etc/ssl/tienda

WORKDIR /app_repo/backend
RUN npm install --omit=dev
ENV DB_HOST=192.168.20.10
EXPOSE 3000
CMD ["node", "server.js"]
