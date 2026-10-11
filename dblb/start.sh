#!/bin/bash
MI_IP=$(hostname -I | awk '{print $1}')
(
  while true; do
    garbd --address gcomm://192.168.20.4,192.168.20.5 --group tienda_cluster --options "base_host=$MI_IP"
    sleep 5
  done
) &
exec nginx -g 'daemon off;'
