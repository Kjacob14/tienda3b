#!/bin/sh
# Genera una CA propia (autofirmada) y el certificado de tienda.lab firmado por ella.
# Uso: sh gen-cert.sh [carpeta_destino]   (por defecto /etc/ssl/tienda)
set -e
DIR="${1:-/etc/ssl/tienda}"
mkdir -p "$DIR"
cd "$DIR"

# CA propia: esta es la unica que el cliente (webterm) tiene que instalar
openssl genrsa -out ca.key 2048
openssl req -x509 -new -key ca.key -days 365 -out ca.crt \
  -subj "/C=MX/ST=Mexico/L=Toluca/O=LaboratorioTI/CN=CA LaboratorioTI" \
  -addext "basicConstraints=critical,CA:TRUE" \
  -addext "keyUsage=critical,keyCertSign,cRLSign"

# 1. Llaves asimetricas del servidor (RSA 2048): privada y publica
openssl genrsa -out server.key 2048
openssl rsa -in server.key -pubout -out server.pub

# 2. Solicitud de certificado (CSR) con el dominio de la pagina
openssl req -new -key server.key -out server.csr \
  -subj "/C=MX/ST=Mexico/L=Toluca/O=LaboratorioTI/CN=tienda.lab"

# 3 y 4. La CA firma el CSR y entrega el certificado del servidor
printf "subjectAltName=DNS:tienda.lab\nbasicConstraints=CA:FALSE\nkeyUsage=digitalSignature,keyEncipherment\nextendedKeyUsage=serverAuth\n" > ext.cnf
openssl x509 -req -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial \
  -days 365 -out server.crt -extfile ext.cnf

chmod 600 server.key ca.key
