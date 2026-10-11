FROM mariadb:10.11
RUN apt-get update && \
    apt-get install -y --no-install-recommends nginx libnginx-mod-stream galera-arbitrator-4 && \
    rm -rf /var/lib/apt/lists/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY start.sh /usr/local/bin/start.sh
RUN chmod 755 /usr/local/bin/start.sh
EXPOSE 3306 4567
ENTRYPOINT ["/usr/local/bin/start.sh"]
