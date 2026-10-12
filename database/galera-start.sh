#!/bin/bash
MI_IP=$(hostname -I | awk '{print $1}')
NODOS="192.168.20.4 192.168.20.5"

vivo() {
  for n in $NODOS; do
    [ "$n" = "$MI_IP" ] && continue
    timeout 2 bash -c "echo > /dev/tcp/$n/3306" 2>/dev/null && return 0
  done
  return 1
}

if ! vivo && [ "$MI_IP" != "192.168.20.4" ]; then
  for i in $(seq 1 30); do
    vivo && break
    sleep 3
  done
fi

if vivo; then
  ARGS="--wsrep_cluster_address=gcomm://192.168.20.4,192.168.20.5"
else
  ARGS="--wsrep-new-cluster"
  if [ "$MI_IP" = "192.168.20.4" ] && [ -f /var/lib/mysql/grastate.dat ]; then
    sed -i 's/safe_to_bootstrap: 0/safe_to_bootstrap: 1/' /var/lib/mysql/grastate.dat
  fi
fi

rm -f /var/lib/mysql/tc.log
exec docker-entrypoint.sh mariadbd $ARGS --wsrep_node_address=$MI_IP
