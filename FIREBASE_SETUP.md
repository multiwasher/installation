# Somengil Compliance Portal - Setup Firebase

## Configuração das Regras Firestore

Para que a aplicação funcione corretamente, é necessário configurar as regras de segurança do Firebase Firestore.

### Passos:

1. **Aceda ao Firebase Console**: https://console.firebase.google.com/
2. **Selecione o projeto**: `somengil-compliance`
3. **Vá a Firestore Database → Segurança**
4. **Copie o conteúdo do ficheiro `firestore.rules`**
5. **Cole nas regras do Firestore Console**
6. **Clique em "Publicar"**

### Conteúdo das Regras:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir acesso anónimo para leitura e escrita em caminhos públicos
    match /artifacts/{appId}/public/{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Acesso por autenticação
    match /artifacts/{appId}/{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Acesso padrão negado
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### Autorizar domínio do GitHub Codespaces

Se estiver a testar no GitHub Codespaces:

1. Vá a **Authentication → Settings → Authorized domains**
2. Adicione o seu domínio (ex: `literate-orbit-97rx4965q5vqfx77r-3000.app.github.dev`)

## Logins Disponíveis

| Senha | Utilizador | Cargo |
|-------|-----------|-------|
| **123** | Tiago | TECH |
| **456** | Diogo | TECH |
| **112** | GESTÃO | ADMIN |
| **999** | VOOS | ADMIN |
