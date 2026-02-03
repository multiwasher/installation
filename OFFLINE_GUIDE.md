# 📱 Sistema Offline-First - Guia de Funcionamento

## Visão Geral

A Compliance Portal agora suporta **gravação de dados mesmo sem rede**. Quando não há conexão com a internet, todos os dados são armazenados localmente no dispositivo e sincronizados automaticamente quando a rede volta.

## 🎯 Funcionalidades

### 1. **Gravação Offline Automática**
- Quando offline, os dados são armazenados em **IndexedDB** (base de dados local do navegador)
- O utilizador vê uma mensagem de confirmação indicando que os dados foram guardados offline
- Sem perda de dados!

### 2. **Indicador de Status em Tempo Real**
- **Barra laranja no topo**: Indica que está em modo offline
  - "Modo Offline - Os dados serão sincronizados quando voltar online"
- **Card no canto inferior esquerdo**: Mostra o progresso da sincronização
  - "Sincronizando dados (3 de 5)"

### 3. **Sincronização Automática**
- Quando a rede volta, a app sincroniza automaticamente
- Progresso em tempo real: vê cada operação sendo sincronizada
- Notificações de sucesso/erro após sincronização

### 4. **Mensagens de Feedback**
- Notificações no canto superior direito informam o utilizador:
  - "📱 Guardado offline - Sincronizará quando voltar online"
  - "✅ Guardado com sucesso"
  - "✅ Sincronizado: 5/5"

## 🔧 Como Testar

### 1. **Simular Modo Offline (DevTools)**
```
1. Abrir DevTools (F12 ou Ctrl+Shift+I)
2. Ir para Network
3. Encontrar o dropdown "Throttling" (normalmente no lado esquerdo)
4. Seleccionar "Offline"
5. Agora a app está offline
```

Alternativamente:
```
1. DevTools → Network tab
2. Checkbox "Offline" (se disponível)
3. Ou desligar internet do dispositivo
```

### 2. **Testar Gravação Offline**
1. Colocar a app offline
2. Ir para "Expenses" → "+ NEW COST"
3. Preencher o formulário
4. Clicar "Save"
5. Verá: "📱 Guardado offline - Sincronizará quando voltar online"

### 3. **Testar Sincronização Automática**
1. Gravar alguns custos/dados offline
2. Voltar a conectar (remover a flag "Offline" ou ligar a internet)
3. A app mostra: "Card de sincronização" no canto inferior esquerdo
4. Vê o progresso: "1 de 3", "2 de 3", etc.
5. Quando terminar: "✅ Sincronizado: 3/3"

## 📊 Dados Suportados

Actualmente, os seguintes dados suportam sincronização offline:

- ✅ **Costs** (Despesas)
- ✅ **Compliance** (Conformidade/Instalações)
- ✅ **Flights** (Voos)
- 🔜 Mais em breve (outras operações podem ser adicionadas)

## 🔐 Segurança

- Dados armazenados localmente em **IndexedDB** (seguro e isolado)
- Sincronização apenas com Firebase (mesmo protocolo de autenticação)
- Sem exposição de credenciais
- Dados locais podem ser limpos pelo utilizador limpando cache do navegador

## 🚀 Detalhes Técnicos

### Arquitetura
```
Utilizador Offline
    ↓
saveDocumentOnline() [wrapper]
    ├─ Se Online → Firebase (normal)
    └─ Se Offline → IndexedDB (fila)
    ↓
Quando volta Online
    ↓
offlineManager.syncPendingData()
    ├─ Ler fila do IndexedDB
    ├─ Sincronizar cada item com Firebase
    └─ Remover da fila quando sincronizado
```

### Ficheiros Envolvidos
- **offline-manager.js**: Gerencia IndexedDB e sincronização
- **script.js**: Contém as funções wrapper `saveDocumentOnline` e `deleteDocumentOnline`
- **index.html**: UI para indicadores de status

## 📝 Exemplo de Uso no Código

```javascript
// Guardar com suporte offline (uso automático)
await window.saveDocumentOnline(
    [window.fbDoc(window.db, 'artifacts', window.appId, 'public', 'data', 'costs', costId)],
    costData,
    'saveCost'
);

// Apagar com suporte offline
await window.deleteDocumentOnline(
    [window.fbDoc(window.db, 'artifacts', window.appId, 'public', 'data', 'costs', costId)],
    'deleteCost'
);
```

## ⚠️ Limitações

1. **Sem acesso a dados remotos offline**
   - Pode gravar dados offline
   - Mas não pode ler dados que não foram já carregados
   - (Isto é normal e esperado)

2. **Sem sincronização de conflitos automática**
   - Se modificar o mesmo documento em 2 dispositivos simultaneamente
   - Último a sincronizar vence
   - Recomenda-se cuidado com edições simultâneas

## 🐛 Troubleshooting

### "Não vejo as operações offline na fila"
- DevTools → Application → IndexedDB → Somengil_Compliance → syncQueue
- Lá pode ver todas as operações pendentes

### "Sincronização não está a começar"
- Assegure-se que está realmente online
- Recarregue a página
- Abra DevTools para ver logs: `console.log` mostra detalhes

### "Dados gravados offline não aparecem no Firebase"
- Verifique se a sincronização terminou com sucesso
- Veja o card "Sincronizando dados" no canto inferior
- Pode forçar refresh: `Ctrl+R` ou `Cmd+R`

## 🎓 Melhorias Futuras

- [ ] Estratégia de merge para edições simultâneas
- [ ] Indicador visual de quantos itens estão aguardando sincronização
- [ ] Opção de sincronizar manualmente
- [ ] Histórico de sincronizações bem/mal-sucedidas
- [ ] Exportar dados offline para backup
- [ ] Suporte para mais operações (training, etc)

---

**Versão**: 1.0 | **Data**: Fevereiro 2026
