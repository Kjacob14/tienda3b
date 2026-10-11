FROM mariadb:10.11
RUN apt-get update && \
    apt-get install -y --no-install-recommends galera-4 rsync lsof iproute2 socat procps && \
    rm -rf /var/lib/apt/lists/*
ENV MARIADB_ROOT_PASSWORD=password123
COPY galera.cnf /etc/mysql/conf.d/galera.cnf
COPY galera-start.sh /usr/local/bin/galera-start.sh
ADD https://raw.githubusercontent.com/Kjacob14/tienda3b/master/backend/db/init.sql /docker-entrypoint-initdb.d/init.sql
RUN chmod 755 /usr/local/bin/galera-start.sh && chmod 644 /docker-entrypoint-initdb.d/init.sql
EXPOSE 3306 4567 4568 4444
ENTRYPOINT ["/usr/local/bin/galera-start.sh"]
