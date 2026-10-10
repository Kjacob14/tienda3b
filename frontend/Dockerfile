FROM nginx:alpine
RUN apk add --no-cache git curl openssl

# Codigo de la pagina, configuracion de nginx y certificados, todo desde GitHub
RUN git clone https://github.com/Kjacob14/tienda3b.git /tmp/repo && \
    cp /tmp/repo/frontend/index.html /tmp/repo/frontend/script.js /tmp/repo/frontend/style.css /usr/share/nginx/html/ && \
    cp /tmp/repo/frontend/nginx.conf /etc/nginx/conf.d/default.conf && \
    sh /tmp/repo/frontend/gen-cert.sh /etc/ssl/tienda && \
    cp /etc/ssl/tienda/ca.crt /usr/share/nginx/html/ca.crt && \
    rm -rf /tmp/repo

# Bootstrap local (la red de GNS3 no tiene internet)
RUN mkdir -p /usr/share/nginx/html/vendor/bootstrap && \
    curl -sSL https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css -o /usr/share/nginx/html/vendor/bootstrap/bootstrap.min.css && \
    curl -sSL https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js -o /usr/share/nginx/html/vendor/bootstrap/bootstrap.bundle.min.js

EXPOSE 80 443
