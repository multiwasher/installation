// Service Worker para Somengil Compliance Portal
// Versão 5.0 - Caching e funcionamento offline

const CACHE_NAME = 'somengil-compliance-v9';
const STATIC_ASSETS = [
  './',
  './index.html',
  './script.js',
  './style.css',
  './translations.js',
  './manifest.json',
  './icon-192.svg',
  './icon-256.svg',
  './icon-512.svg'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Cache aberto:', CACHE_NAME);
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[Service Worker] Erro ao fazer cache de alguns recursos:', err);
      });
    })
  );
  self.skipWaiting();
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Ativando...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Estratégia de rede simples
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorar requisições não-GET
  if (request.method !== 'GET') {
    return;
  }

  // Ignorar requisições de chrome-extension e outros esquemas especiais
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Estratégia: Cache First para recursos estáticos, Network First para dados
  if (url.hostname.includes('firestore.googleapis.com') ||
      url.hostname.includes('firebase.googleapis.com') ||
      url.hostname.includes('identitytoolkit.googleapis.com') ||
      url.hostname.includes('cdn.') ||
      url.hostname.includes('cdnjs.')) {
    // Network First para APIs e CDNs
    event.respondWith(
      fetch(request.clone()).then((response) => {
        // Validar resposta
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        // Clone a resposta: um para cache, outro para o browser
        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });

        return response;
      }).catch(() => {
        // Se falhar, tentar cache
        return caches.match(request).catch(() => {
          return new Response(
            JSON.stringify({ error: 'Offline' }),
            { status: 503, headers: { 'Content-Type': 'application/json' } }
          );
        });
      })
    );
    return;
  }

  // Cache First para recursos locais
  event.respondWith(
    caches.match(request).then((response) => {
      // Se estiver em cache, retornar
      if (response) {
        return response;
      }

      // Se não estiver em cache, tentar rede
      return fetch(request.clone()).then((response) => {
        // Validar resposta
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        // Clone a resposta: um para cache, outro para o browser
        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });

        return response;
      }).catch(() => {
        // Se offline, servir página offline
        if (request.destination === 'document') {
          return caches.match('./index.html');
        }
      });
    })
  );
});

// Notificações push
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push recebido');
  const options = {
    body: event.data ? event.data.text() : 'Nova notificação',
    icon: 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"%3E%3Crect width="192" height="192" fill="%231a1a1a"/%3E%3Ctext x="96" y="120" font-size="80" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial"%3ECP%3C/text%3E%3C/svg%3E',
    badge: 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"%3E%3Crect width="192" height="192" fill="%231a1a1a"/%3E%3Ctext x="96" y="120" font-size="80" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial"%3ECP%3C/text%3E%3C/svg%3E',
    tag: 'compliance-notification'
  };

  event.waitUntil(
    self.registration.showNotification('Somengil Compliance', options)
  );
});

// Clique em notificações push
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notificação clicada');
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (let i = 0; i < clientList.length; i++) {
        if (clientList[i].url === './' && 'focus' in clientList[i]) {
          return clientList[i].focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('./');
      }
    })
  );
});

console.log('[Service Worker] Carregado com sucesso');
