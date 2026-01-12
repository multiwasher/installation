# PWA - Somengil Compliance Portal

A aplicação foi convertida numa **Progressive Web Application (PWA)**, permitindo:
- ✅ Instalação como app nativa no telemóvel/tablet
- ✅ Funcionamento offline com cache inteligente
- ✅ Acesso rápido desde o ecrã inicial
- ✅ Melhor performance e experiência do utilizador

## Ficheiros Criados/Modificados

### 1. **manifest.json**
- Metadados da aplicação (nome, descrição, ícones, cores)
- Configuração de display standalone
- Ícones e screenshots responsivos

### 2. **service-worker.js**
- Caching de recursos locais
- Estratégia "Cache First" para assets estáticos
- Estratégia "Network First" para Firebase (sempre sincronizar dados)
- Suporte a notificações push (futuro)
- Sincronização em background (futuro)

### 3. **index.html** (atualizado)
- Link ao `manifest.json`
- Metadados PWA para iOS
- Tema de cor consistente
- Script de registo do Service Worker

## Como Testar Localmente

### Opção 1: Localhost com HTTP
```bash
# Terminal 1: Servir ficheiros locais
cd /workspaces/installation
python3 -m http.server 8000

# Terminal 2: Abrir no navegador
# Abrir em http://localhost:8000
```

### Opção 2: HTTPS (necessário para PWA completa)
```bash
# Usar ferramentas como:
# - http-server com SSL
# - ngrok para expor localhost
# - Deployed em servidor com HTTPS
```

### Opção 3: DevTools do Chrome/Edge
1. Abrir **DevTools** (F12)
2. Ir a **Application** → **Manifest**
3. Verificar se manifest.json está carregado
4. Ir a **Service Workers** e verificar o registo

## Funcionalidades PWA Ativas

### ✅ Instalação
- **Android**: Botão "Instalar" no Chrome/Edge
- **iOS**: Botão "Partilhar" → "Adicionar a Ecrã Inicial" (com iOS 16.4+)
- **Desktop**: Ícone de instalação na barra de URL

### ✅ Cache Offline
- Quando offline, a app continua a funcionar
- Dados cacheados são usados automaticamente
- Firebase aguarda conexão para sincronizar

### ✅ Notificações Push (Futuro)
- Service Worker pode enviar notificações
- Usar `self.registration.showNotification()`

### ✅ Sincronização em Background (Futuro)
- Sincronizar dados quando volta online
- Usar `registration.sync.register('sync-compliance-data')`

## Testes Recomendados

### 1. Testar Caching
```javascript
// No DevTools Console:
caches.keys().then(names => console.log(names));
caches.open('somengil-compliance-v1').then(cache => 
  cache.keys().then(requests => console.log(requests))
);
```

### 2. Testar Offline
1. Abrir DevTools → **Network**
2. Marcar checkbox "Offline"
3. Recarregar página
4. Verificar se carrega do cache

### 3. Testar Instalação
1. Em Android Chrome: Clicar no ícone de instalação
2. Em iOS: Compartilhar → Adicionar a Ecrã Inicial
3. Abrir app e verificar que funciona

## Versionamento de Cache

Quando atualizar a app:
1. Aumentar versão em `service-worker.js`:
```javascript
const CACHE_NAME = 'somengil-compliance-v2'; // Mudar v1 → v2
```
2. O Service Worker automaticamente remove cache antigo
3. Novos usuarios têm a última versão

## Requisitos para Produção

- ✅ HTTPS obrigatório (exceto localhost)
- ✅ `manifest.json` válido
- ✅ `service-worker.js` registado
- ✅ Ícones em pelo menos 192x192px (opcional, usamos SVG)
- ✅ CORS configurado corretamente

## Troubleshooting

### Service Worker não registado
- Verificar se está em HTTPS ou localhost
- Verificar console do DevTools para erros
- Limpar cache do navegador (DevTools → Application → Clear storage)

### Manifesto não carregado
- Verificar se `manifest.json` existe na raiz
- Verificar MIME type (deve ser `application/json`)
- Verificar DevTools → Application → Manifest

### Cache não funciona
- Ir a DevTools → Network → marcar "Offline"
- Verificar se recursos estão em `STATIC_ASSETS`
- Limpar cache e recarregar

### Firebase offline
- Firebase não funciona completamente offline
- Dados são cacheados, sincronizados ao voltar online
- Para dados 100% offline, usar IndexedDB

## Melhorias Futuras

1. **IndexedDB para dados offline**
   - Armazenar dados Firestore localmente
   - Sincronizar automaticamente

2. **Notificações Push**
   - Backend envia alertas
   - User recebe notificações mesmo com app fechada

3. **Sincronização em Background**
   - Sincronizar dados com background sync
   - Submeter formulários quando volta online

4. **Ícones customizados**
   - Substituir ícones SVG por imagens PNG
   - Gerar em diferentes resoluções

## Referências

- [MDN - PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Web.dev - PWA Checklist](https://web.dev/pwa-checklist/)
- [MDN - Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [MDN - Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)

---

**Nota**: A app é totalmente funcional como PWA. Firebase continua a ser a fonte de verdade para dados. O cache garante acesso rápido e funcionamento básico offline.
