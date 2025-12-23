# ⚠️ INSTRUÇÕES DE DEPLOY - CRÍTICO PARA CORS

## Problema Atual
Erro CORS: **"Response to preflight request doesn't pass access control check"**
- O Google Apps Script não está reconhecendo a função `doOptions()`
- Necessário: **NOVO deployment** (não atualização de existente)

## ✅ Passo 1: Copiar Código Atualizado
1. Abra [google-apps-script-compliance.js](google-apps-script-compliance.js)
2. **Selecione TODO o código** (Ctrl+A)
3. **Copie** (Ctrl+C)

## ✅ Passo 2: Aceda ao Google Apps Script
1. Abra https://script.google.com/
2. Selecione o projeto **installation-compliance**
3. Clique em **Code.gs** (ou o ficheiro principal)

## ✅ Passo 3: Limpar e Colar Código
1. **Selecione TUDO** (Ctrl+A) - Incluindo todas as funções
2. **Apague** (Delete)
3. **Cole o código novo** (Ctrl+V)
4. **Guarde** (Ctrl+S)
5. Aguarde alguns segundos para guardar completamente

## ✅ Passo 4: IMPORTANTE - NOVO Deployment (não atualizar!)
1. Clique em **"Deploy"** (canto superior direito)
2. **SELECIONE "New deployment"** ⚠️ (NÃO atualizar existente)
3. Clique em **engrenagem** → selecione **"Web app"**
4. Configure:
   - **Execute as**: Seu email
   - **Who has access**: "Anyone"
5. Clique **"Deploy"**
6. **Autorize** se pedido
7. Copie o **novo URL** que aparece na janela

## ✅ Passo 5: Atualizar URLs no Frontend
Se o URL mudou (muito provável):
- [index.html](index.html#L232) - linha 232 e 2274
- [script.js](script.js#L12) - linha 12

**Procure por:** `GOOGLE_SHEET_API_URL = "`  
**Substitua o URL antigo pelo novo**

## ✅ Passo 6: Testar no Navegador
1. Abra a aplicação
2. Login: "GESTÃO 112"
3. Clique **"Ver Todos os Equipamentos"**
4. Abra Console (F12)

### Se vir ✓ "INICIANDO FETCH" mas sem erro CORS:
- A função `doOptions()` está funcionando
- Se ainda não ver dados, o Sheet está vazio
- Crie um equipamento primeiro na aba "Criar Checklist"

### Se vir ainda erro CORS:
- Apague o deployment anterior em Deploy History
- Verifique que fez "New deployment" e não "Update"
- Aguarde 2-3 minutos para propagação

## 🔧 Verificação Final
No Google Apps Script, clique em **"Executions"** (lado esquerdo) para ver se:
- ✓ `doOptions()` foi chamado (log: "doOptions() chamado")
- ✓ `doPost()` foi chamado
- ✓ Sem erros de autorização

## URL Atual (se mudou após deploy)
Copie do Google Apps Script após o novo deployment.

