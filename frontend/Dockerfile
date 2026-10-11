FROM nginx:alpine
RUN apk add --no-cache git curl
COPY certs/server.crt certs/server.key /etc/ssl/tienda/
COPY certs/ca.crt /usr/share/nginx/html/ca.crt
RUN git clone https://github.com/Kjacob14/tienda3b.git /tmp/repo && \
    cp /tmp/repo/frontend/index.html /tmp/repo/frontend/script.js /tmp/repo/frontend/style.css /usr/share/nginx/html/ && \
    cp /tmp/repo/frontend/nginx.conf /etc/nginx/conf.d/default.conf && \
    rm -rf /tmp/repo
RUN mkdir -p /usr/share/nginx/html/vendor/bootstrap && \
    curl -sSL https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css -o /usr/share/nginx/html/vendor/bootstrap/bootstrap.min.css && \
    curl -sSL https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js -o /usr/share/nginx/html/vendor/bootstrap/bootstrap.bundle.min.js
EXPOSE 80 443
