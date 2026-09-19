FROM nginx:alpine
RUN apk add --no-cache git
RUN git clone https://github.com/Kjacob14/tienda3b.git /tmp/repo && \
    cp -r /tmp/repo/frontend/* /usr/share/nginx/html/ && \
    rm -rf /tmp/repo
EXPOSE 80
