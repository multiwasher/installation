# Documentação de Estilos - Primeiro Ecrã (Login)

## Visão Geral
O primeiro ecrã da aplicação é um painel de login com design moderno, gradientes Somengil e componentes responsivos. O ecrã utiliza uma combinação de CSS customizado e Tailwind CSS.

---

## Estrutura Principal

### Container Login
- **Classe**: `view-login`
- **Classes Tailwind**: `min-h-screen flex items-center justify-center p-4 bg-white`
- **Dimensões**: Altura mínima da tela, centralizado no viewport
- **Padding**: 1rem (16px)
- **Background**: Branco puro

### Card Principal
- **Classe**: `login-gradient` com `shadow-2xl border border-black/20`
- **Largura**: 480px máximo
- **Padding**: 2.5rem (40px)
- **Border Radius**: 1.5rem (24px)
- **Sombra**: `shadow-2xl` (Tailwind)
- **Borda**: Leve, 1px preta com 20% transparência

---

## Gradientes

### Login Gradient (Fundo Principal)
```css
.login-gradient {
    background: radial-gradient(circle at center, rgba(81, 184, 234, 1) 0%, rgba(0, 0, 0, 1) 100%);
}
```
- **Tipo**: Radial (circular)
- **Centro**: Azul Somengil claro `#51b8ea`
- **Borda**: Preto puro `#000000`
- **Efeito**: Degradê do centro para as extremidades

### Emblema Outer (Borda do Badge)
```css
.emblema-outer {
    display: inline-block;
    padding: 2px;
    border-radius: 0.5rem;
    background: linear-gradient(90deg, rgba(81, 184, 234, 1) 0%, rgba(27, 71, 148, 1) 100%);
}
```
- **Tipo**: Linear (horizontal)
- **Cor Esquerda**: Azul claro `#51b8ea`
- **Cor Direita**: Azul escuro `#1b4794`
- **Padding**: 2px
- **Border Radius**: 0.5rem (8px)

### Emblema Inner (Fundo do Badge)
```css
.emblema-inner {
    padding: 12px 50px;
    border-radius: 0.4rem;
    background-color: black;
}
```
- **Background**: Preto puro
- **Padding**: 12px vertical, 50px horizontal
- **Border Radius**: 0.4rem (6px)
- **Texto**: Branco, extrabold, 18px, maiúsculas, tracking de 0.25em

---

## Componentes Específicos

### Logo Somengil
- **Altura**: 5.6rem (89.6px)
- **Margin**: Centered com `mx-auto`, `mb-2` (8px bottom)

### Badge "Compliance Portal"
- **Padding**: 3rem vertical (48px)
- **Centralização**: `flex justify-center`
- **Estrutura**: `emblema-outer` > `emblema-inner`
- **Texto**: Branco, extrabold, uppercase, tracking `[0.25em]`

### Linha Divisória (HR)
- **Cor**: `border-black/30` (30% opacity)
- **Margin**: `mb-8` (32px bottom)

### Título "Welcome"
- **Classe Tailwind**: `text-white text-xl font-black uppercase tracking-tight`
- **Tamanho**: 1.25rem (20px)
- **Peso**: 900 (black)
- **Cor**: Branco puro
- **Transformação**: Maiúsculas
- **Letter Spacing**: Tight (comprimido)

### Subtítulo "Secure Session"
- **Classe Tailwind**: `text-white/50 text-[10px] font-bold uppercase tracking-widest`
- **Tamanho**: 10px
- **Peso**: 700 (bold)
- **Cor**: Branco com 50% transparência
- **Transformação**: Maiúsculas
- **Letter Spacing**: Widest (espaçado)
- **Margin**: `mb-8` (32px bottom)

---

## Seletor de Idioma

### Botões de Idioma
- **Classe**: `lang-btn`
- **Tamanho**: 10px, font-black, uppercase, tracking-widest
- **Padding**: 1.5px vertical, 0.75rem (12px) horizontal
- **Border**: 1px `border-white/20`
- **Border Radius**: Arredondado
- **Background**: `bg-white/10` (branco com 10% opacidade)
- **Cor**: Branco
- **Transição**: Todas as propriedades suave

---

## Formulário de Login

### Container do Formulário
- **Classe**: `space-y-5` (gap de 1.25rem entre itens)
- **Largura Máxima**: 320px
- **Centralização**: `mx-auto`
- **Alinhamento Texto**: Esquerda

### Campos de Input
- **Container**: `relative` (para posicionamento do ícone)

#### Input de Username/Password
- **Classe**: `form-input` (customizado em style.css)
- **Background**: `bg-white`
- **Cor**: `text-slate-900`
- **Border Radius**: `rounded-xl` (1rem / 16px)
- **Padding**: `p-3.5 pl-12` (esquerda com espaço para ícone)
- **Font**: Semibold
- **Outline**: None
- **Box Shadow**: `shadow-inner`

#### Ícones (Lucide)
- **Posição**: Absoluta, esquerda a 4px, centrada verticalmente
- **Cor**: `text-slate-400`
- **Tamanho**: `w-4 h-4` (16px)
- **Transform**: Centralizado com `-translate-y-1/2`

---

## Paleta de Cores

| Nome | Hex | Uso |
|------|-----|-----|
| Azul Somengil Light | #51b8ea | Gradientes, acentos |
| Azul Somengil Dark | #1b4794 | Gradientes, acentos |
| Preto | #000000 | Fundo, texto |
| Branco | #ffffff | Texto, inputs |
| Slate 400 | #cbd5e1 | Ícones input |
| Slate 500 | #64748b | Texto secundário |
| Slate 900 | #0f172a | Texto principal input |

---

## Tipografia

### Font Family
- **Principal**: Inter (importada do Google Fonts)
- **Fallback**: Sans-serif
- **Pesos Usados**: 300, 400, 600, 700, 800

### Escalas de Tamanho no Login
- **Logo**: 5.6rem (89.6px)
- **Título**: 1.25rem (20px)
- **Subtítulo/Placeholders**: 10px
- **Normal**: 0.875rem (14px)

---

## Espaçamento

| Propriedade | Valor | Pixels |
|------------|-------|--------|
| Card Padding | 2.5rem | 40px |
| Logo Margin Bottom | mb-2 | 8px |
| Badge Padding | 3rem | 48px |
| HR Margin Bottom | mb-8 | 32px |
| Título Margin Bottom | Implícito | ~8px |
| Subtítulo Margin Bottom | mb-8 | 32px |
| Form Space Between | space-y-5 | 20px |
| Input Padding | p-3.5 | 14px |
| Input Left Padding | pl-12 | 48px |
| Gap Botões Idioma | gap-3 | 12px |

---

## Efeitos e Transições

### Hover nos Botões de Idioma
- **Propriedades**: Todas
- **Duração**: `transition-all`

### Responsividade (Mobile)

#### Media Query: max-width: 768px
```css
.emblema-outer {
    margin-left: 10px;
    margin-right: 10px;
}

.emblema-inner {
    padding: 8px 20px;  /* Reduzido de 12px 50px */
}

.emblema-inner p {
    font-size: 0.9rem !important;
    letter-spacing: 0.15em !important;
}
```

**Ajustes:**
- Margens horizontais no badge: 10px
- Padding do badge reduzido: 8px vertical, 20px horizontal
- Tamanho do texto reduzido: 0.9rem (14.4px)

---

## Sombras

### Card Principal
- **Tailwind**: `shadow-2xl`
- **Valor Real**: `0 25px 50px -12px rgba(0, 0, 0, 0.25)`

### Componentes Internos
- Sem sombras adicionais (integradas ao card)

---

## Estados e Interatividade

### Formulário
- Não há validação visual implementada no primeiro ecrã
- Inputs têm `:focus` com outline none
- Placeholders em slate-400

---

## Notas de Implementação

1. **Gradiente Radial**: O fundo do card usa gradiente radial, criando efeito 3D com azul no centro
2. **Badge Aninhado**: O emblema usa duas divs para criar efeito de borda gradiente
3. **Responsividade**: O card se adapta para mobile com ajustes no padding do badge
4. **Ícones**: Usam biblioteca Lucide, inlinados com `data-lucide`
5. **Mobile First**: Card responde bem em telas pequenas com padding reduzido

---

## Referência de Classes CSS Customizadas

```css
.login-gradient { background: radial-gradient(...) }
.emblema-outer { background: linear-gradient(...) }
.emblema-inner { background-color: black }
.lang-btn { ... }
.form-input { ... }
```

