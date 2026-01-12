#!/bin/bash

# Script para iniciar o servidor de desenvolvimento
# Uso: ./start-server.sh [porta]

PORT=${1:-8000}

echo "🚀 Iniciando servidor HTTP na porta $PORT..."
echo "📱 Aceda a http://localhost:$PORT"

cd "$(dirname "$0")"
python3 -m http.server $PORT
