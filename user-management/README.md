# Painel de Gestão de Usuários

Aplicação React para gerenciamento de usuários com operações de CRUD (Criar, Ler, Atualizar, Excluir).

## Tecnologias Utilizadas

- **React 18** com Hooks e componentes funcionais
- **TypeScript** para tipagem estática
- **Redux Toolkit** para gerenciamento de estado global
- **Material-UI (MUI)** para componentes visuais
- **Axios** para integração com API REST
- **Vitest + React Testing Library** para testes automatizados
- **ESLint + Prettier** para qualidade e padronização de código
- **Vite** como bundler de desenvolvimento

## Funcionalidades

- Listagem de usuários com filtro por nome e ordenação por colunas
- Cadastro de novos usuários com validação de campos
- Edição de usuários existentes
- Exclusão com diálogo de confirmação
- Dark Mode com persistência da preferência do usuário
- Error Boundary para captura de erros em tempo de execução
- Code Splitting com React.lazy e Suspense
- Memoização com useMemo, useCallback e React.memo
- Acessibilidade com atributos ARIA e navegação por teclado

## Pré-requisitos

- Node.js 18+
- npm 9+

## Instalação
```bash
git clone <url-do-repositorio>
cd user-management
npm install
```

## Execução
```bash
npm run dev
```

A aplicação abre em `http://localhost:5173`

## Testes
```bash
npm run test
```

## Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Gera build de produção |
| `npm run test` | Executa testes automatizados |
| `npm run lint` | Verifica código com ESLint |
| `npm run format` | Formata código com Prettier |

## Estrutura do Projeto
```
src/
├── components/    # Componentes reutilizáveis
├── pages/         # Páginas da aplicação
├── store/         # Redux (estado global)
├── services/      # Chamadas à API
├── types/         # Interfaces TypeScript
└── tests/         # Testes automatizados
```

## Decisões Técnicas

- **Vitest** em vez de Jest: compatível com a API do Jest e nativo do Vite, oferecendo melhor performance e configuração simplificada.
- **JSONPlaceholder** como API: não exige setup adicional. As operações de CRUD são gerenciadas no estado global via Redux. A troca para uma API real seria transparente alterando apenas o service.
- **Redux Toolkit** em vez de Context API: melhor para gerenciar estado complexo com operações assíncronas (createAsyncThunk) e oferece DevTools integrado.
```

---

