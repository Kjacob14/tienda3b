#!/bin/sh
# Genera el certificado TLS del backend (los pasos de los apuntes).
# Uso: sh gen-cert.sh [carpeta_destino]   (por defecto /etc/ssl/tienda)
set -e
DIR="${1:-/etc/ssl/tienda}"
mkdir -p "$DIR"
cd "$DIR"

# 1. Llaves asimetricas (RSA 2048): privada y publica
openssl genrsa -out server.key 2048
openssl rsa -in server.key -pubout -out server.pub

# 2. Solicitud de certificado (CSR)
openssl req -new -key server.key -out server.csr \
  -subj "/C=MX/ST=Mexico/L=Toluca/O=LaboratorioTI/CN=api.tienda.lab"

# 3 y 4. Autofirma y certificado final
printf "subjectAltName=DNS:api.tienda.lab,IP:192.168.20.2\nbasicConstraints=CA:FALSE\nextendedKeyUsage=serverAuth\n" > ext.cnf
openssl x509 -req -days 365 -in server.csr -signkey server.key \
  -out server.crt -extfile ext.cnf

chmod 600 server.key
