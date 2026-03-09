# Painel de Gestão de Usuários

🔗 **Demo:** [https://test-react-five-lake.vercel.app](https://test-react-five-lake.vercel.app)

Aplicação React moderna para gerenciamento de usuários com operações de CRUD completas, desenvolvida como desafio técnico.

## Tecnologias

| Categoria | Tecnologia |
|-----------|------------|
| Framework | React 18 com Hooks e componentes funcionais |
| Linguagem | TypeScript |
| Estado Global | Redux Toolkit (createAsyncThunk) |
| Server State | React Query (TanStack Query) |
| UI | Material-UI (MUI) |
| HTTP | Axios |
| Testes | Jest + React Testing Library |
| Linting | ESLint + Prettier |
| Build | Vite |
| CI/CD | GitHub Actions |
| Documentação | Storybook |
| Deploy | Vercel |

## Funcionalidades

**CRUD Completo**
- Listagem de usuários em tabela com nome, e-mail e status
- Filtro por nome em tempo real
- Ordenação por colunas (nome e e-mail)
- Cadastro de novos usuários com validação de campos obrigatórios
- Edição de usuários existentes via modal
- Exclusão com diálogo de confirmação

**Diferenciais Implementados**
- Dark Mode persistente com detecção de preferência do sistema (useMediaQuery)
- React Query com cache, invalidation e atualização otimista
- ErrorBoundary personalizado para captura de erros em tempo de execução
- Code Splitting e Lazy Loading com React.lazy() e Suspense
- Memoização com useMemo, useCallback e React.memo
- Acessibilidade (a11y) com atributos ARIA e navegação por teclado
- Storybook com componente DeleteDialog documentado
- CI/CD no GitHub Actions (lint, testes e build automatizados)
- Deploy automático no Vercel

## Pré-requisitos

- Node.js 18+
- npm 9+

## Instalação

```bash
git clone https://github.com/Jportov/test-react.git
cd test-react/user-management
npm install
```

## Execução

```bash
npm run dev
```

Acesse `http://localhost:5173`

## Testes

```bash
npm run test
```

Os testes cobrem:
- Renderização da listagem de usuários
- Filtro por nome na tabela
- Validação de campos obrigatórios no formulário
- Criação de novo usuário com simulação de clique no botão "Salvar"
- Atualização de estado global (Redux)
- Integração completa com React Query
- Alternância de Dark Mode

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run test` | Testes automatizados (Jest) |
| `npm run lint` | Verificação ESLint |
| `npm run format` | Formatação com Prettier |
| `npm run storybook` | Documentação de componentes |

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── UserTable.tsx      # Tabela com filtro e ordenação
│   ├── UserForm.tsx       # Formulário de criação/edição
│   ├── DeleteDialog.tsx   # Diálogo de confirmação
│   ├── ThemeProvider.tsx  # Contexto de Dark Mode
│   ├── ErrorBoundary.tsx  # Captura de erros
│   └── __stories__/       # Stories do Storybook
├── pages/               # Páginas da aplicação
│   ├── UserPage.tsx         # Versão com Redux Toolkit
│   └── UserPageWithQuery.tsx # Versão com React Query
├── store/               # Estado global (Redux)
│   ├── index.ts           # Configuração da store
│   └── userSlice.ts       # Slice de usuários com thunks
├── services/            # Comunicação com API
│   ├── userService.ts     # Chamadas REST (axios)
│   ├── queryClient.ts     # Configuração do React Query
│   └── useUsers.ts        # Hooks customizados (React Query)
├── types/               # Interfaces TypeScript
│   └── User.ts            # Tipos User e CreateUserDTO
└── tests/               # Testes automatizados
    ├── setup.ts
    ├── UserTable.test.tsx
    ├── UserForm.test.tsx
    ├── DeleteDialog.test.tsx
    ├── UserPage.integration.test.tsx
    └── UserPageWithQuery.integration.test.tsx
```

## Decisões Técnicas

**JSONPlaceholder como API:** Não exige setup adicional por parte do avaliador. As operações de CRUD são gerenciadas no estado global. A troca para uma API com persistência seria transparente, alterando apenas o arquivo de service.

**Redux Toolkit + React Query:** Implementei ambas as abordagens para demonstrar conhecimento das duas. O Redux gerencia estado do cliente (UI), enquanto o React Query é especializado em server state (cache, refetch, invalidação). A aplicação principal utiliza React Query, com a versão Redux mantida como referência e coberta por testes.

**Conventional Commits:** Histórico de commits organizado seguindo o padrão semântico (feat, fix, test, docs, chore, ci) para facilitar rastreabilidade e geração de changelogs.
