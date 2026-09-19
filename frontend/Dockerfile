FROM nginx:alpine
RUN apk add --no-cache git curl
RUN git clone https://github.com/Kjacob14/tienda3b.git /tmp/repo && \
    cp -r /tmp/repo/frontend/* /usr/share/nginx/html/ && \
    rm -rf /tmp/repo
# Baja Bootstrap durante la construcción (aquí SÍ hay internet) y lo deja
# empaquetado dentro de la imagen, para que el contenedor no dependa de un
# CDN externo cuando corra dentro de la red aislada de GNS3.
RUN mkdir -p /usr/share/nginx/html/vendor/bootstrap && \
    curl -sSL https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css -o /usr/share/nginx/html/vendor/bootstrap/bootstrap.min.css && \
    curl -sSL https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js -o /usr/share/nginx/html/vendor/bootstrap/bootstrap.bundle.min.js
