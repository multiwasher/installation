/**
 * Offline Manager for Somengil Compliance Portal
 * Gestiona armazenamento local de dados quando offline
 * Sincroniza automaticamente quando volta online
 */

class OfflineManager {
    constructor() {
        this.db = null;
        this.isOnline = navigator.onLine;
        this.syncQueue = [];
        this.init();
    }

    async init() {
        try {
            // Abrir/criar IndexedDB
            const request = indexedDB.open('Somengil_Compliance', 1);

            request.onerror = () => {
                console.error('Erro ao abrir IndexedDB:', request.error);
            };

            request.onsuccess = () => {
                this.db = request.result;
                console.log('✅ IndexedDB inicializado');
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Criar object store para fila de sincronização
                if (!db.objectStoreNames.contains('syncQueue')) {
                    const store = db.createObjectStore('syncQueue', { keyPath: 'id', autoIncrement: true });
                    store.createIndex('timestamp', 'timestamp', { unique: false });
                    store.createIndex('status', 'status', { unique: false });
                }

                console.log('✅ Object Stores criados');
            };

            // Detetar mudanças de conectividade
            window.addEventListener('online', () => this.handleOnline());
            window.addEventListener('offline', () => this.handleOffline());

        } catch (err) {
            console.error('Erro ao inicializar OfflineManager:', err);
        }
    }

    handleOnline() {
        console.log('🟢 App voltou online!');
        this.isOnline = true;
        this.hideOfflineIndicator();
        this.showStatusNotification('Online - Sincronizando dados...', 'info');
        this.syncPendingData();
    }

    handleOffline() {
        console.log('🔴 App passou para offline');
        this.isOnline = false;
        this.showOfflineIndicator();
        this.showStatusNotification('Modo Offline - Dados guardam localmente', 'warning');
    }

    /**
     * Mostrar indicador de modo offline
     */
    showOfflineIndicator() {
        const indicator = document.getElementById('offline-indicator');
        if (indicator) {
            indicator.classList.remove('hidden');
            lucide.createIcons();
        }
    }

    /**
     * Esconder indicador de modo offline
     */
    hideOfflineIndicator() {
        const indicator = document.getElementById('offline-indicator');
        if (indicator) {
            indicator.classList.add('hidden');
        }
    }

    /**
     * Guardar operação na fila para sincronização
     */
    async queueOperation(operation, data) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('IndexedDB não está inicializado'));
                return;
            }

            const transaction = this.db.transaction(['syncQueue'], 'readwrite');
            const store = transaction.objectStore('syncQueue');

            const queueItem = {
                operation,
                data,
                timestamp: new Date().toISOString(),
                status: 'pending',
                retries: 0
            };

            const request = store.add(queueItem);

            request.onsuccess = () => {
                console.log('✅ Operação enfileirada:', operation);
                resolve(queueItem);
            };

            request.onerror = () => {
                reject(new Error('Erro ao guardar na fila'));
            };
        });
    }

    /**
     * Sincronizar dados quando volta online
     */
    async syncPendingData() {
        if (!this.isOnline || !this.db) {
            console.warn('Não é possível sincronizar: offline ou DB indisponível');
            return;
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['syncQueue'], 'readonly');
            const store = transaction.objectStore('syncQueue');
            const index = store.index('status');
            const range = IDBKeyRange.only('pending');
            const request = index.getAll(range);

            request.onsuccess = async () => {
                const pendingItems = request.result;
                console.log(`📤 Sincronizando ${pendingItems.length} operações...`);

                if (pendingItems.length === 0) {
                    resolve();
                    return;
                }

                // Mostrar indicador de sincronização
                const syncIndicator = document.getElementById('sync-indicator');
                if (syncIndicator) {
                    syncIndicator.classList.remove('hidden');
                }

                let successCount = 0;
                let failCount = 0;

                for (let i = 0; i < pendingItems.length; i++) {
                    const item = pendingItems[i];
                    
                    // Atualizar contador
                    const counter = document.getElementById('sync-counter');
                    if (counter) {
                        counter.textContent = `${i + 1} de ${pendingItems.length}`;
                    }

                    try {
                        await this.executeSyncItem(item);
                        await this.removeFromQueue(item.id);
                        successCount++;
                    } catch (err) {
                        console.error('Erro ao sincronizar:', err);
                        failCount++;
                        await this.updateQueueItemStatus(item.id, 'failed', item.retries + 1);
                    }
                }

                // Esconder indicador
                if (syncIndicator) {
                    syncIndicator.classList.add('hidden');
                }

                this.showStatusNotification(
                    `✅ Sincronizado: ${successCount}/${pendingItems.length}`,
                    failCount === 0 ? 'success' : 'warning'
                );

                resolve({ successCount, failCount });
            };

            request.onerror = () => {
                reject(new Error('Erro ao ler fila de sincronização'));
            };
        });
    }

    /**
     * Executar operação de sincronização
     */
    async executeSyncItem(item) {
        const { operation, data } = item;

        switch (operation) {
            case 'saveCompliance':
                return await window.fbSetDoc(
                    window.fbDoc(window.db, 'artifacts', window.appId, 'public', 'data', 'compliance', data.id),
                    data.payload
                );

            case 'saveCost':
                return await window.fbSetDoc(
                    window.fbDoc(window.db, 'artifacts', window.appId, 'public', 'data', 'costs', data.id),
                    data.payload
                );

            case 'saveFlight':
                return await window.fbSetDoc(
                    window.fbDoc(window.db, 'artifacts', window.appId, 'public', 'data', 'flights', data.id),
                    data.payload
                );

            case 'deleteCompliance':
                return await window.fbDeleteDoc(
                    window.fbDoc(window.db, 'artifacts', window.appId, 'public', 'data', 'compliance', data.id)
                );

            case 'deleteCost':
                return await window.fbDeleteDoc(
                    window.fbDoc(window.db, 'artifacts', window.appId, 'public', 'data', 'costs', data.id)
                );

            case 'deleteFlight':
                return await window.fbDeleteDoc(
                    window.fbDoc(window.db, 'artifacts', window.appId, 'public', 'data', 'flights', data.id)
                );

            default:
                throw new Error(`Operação desconhecida: ${operation}`);
        }
    }

    /**
     * Remover item da fila após sincronização bem-sucedida
     */
    removeFromQueue(id) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('IndexedDB não está inicializado'));
                return;
            }

            const transaction = this.db.transaction(['syncQueue'], 'readwrite');
            const store = transaction.objectStore('syncQueue');
            const request = store.delete(id);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(new Error('Erro ao remover da fila'));
        });
    }

    /**
     * Atualizar status de um item na fila
     */
    updateQueueItemStatus(id, status, retries = 0) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('IndexedDB não está inicializado'));
                return;
            }

            const transaction = this.db.transaction(['syncQueue'], 'readwrite');
            const store = transaction.objectStore('syncQueue');
            const request = store.get(id);

            request.onsuccess = () => {
                const item = request.result;
                item.status = status;
                item.retries = retries;
                const updateRequest = store.put(item);

                updateRequest.onsuccess = () => resolve();
                updateRequest.onerror = () => reject(new Error('Erro ao atualizar status'));
            };

            request.onerror = () => reject(new Error('Erro ao obter item'));
        });
    }

    /**
     * Mostrar notificação de status
     */
    showStatusNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-[9998] max-w-xs ${
            type === 'success' ? 'bg-green-500' :
            type === 'warning' ? 'bg-orange-500' :
            type === 'error' ? 'bg-red-500' :
            'bg-blue-500'
        } text-white font-semibold text-sm`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Auto-remove após 5 segundos
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    /**
     * Obter status de conectividade
     */
    getStatus() {
        return {
            isOnline: this.isOnline,
            navigator: navigator.onLine
        };
    }

    /**
     * Obter contagem de operações pendentes
     */
    async getPendingCount() {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                resolve(0);
                return;
            }

            const transaction = this.db.transaction(['syncQueue'], 'readonly');
            const store = transaction.objectStore('syncQueue');
            const index = store.index('status');
            const range = IDBKeyRange.only('pending');
            const request = index.count(range);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(new Error('Erro ao contar pendentes'));
        });
    }
}

// Inicializar globalmente
window.offlineManager = new OfflineManager();
