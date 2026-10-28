# CSPACE_ART

Site do artista CSPACE_ART: galeria de obras, biografia, Coleção Safira e área administrativa para publicar e editar o conteúdo.

## O que o site faz

- **Home** (`/`): carrossel de destaques e galeria de obras.
- **Biografia** (`/biography`): texto e foto do artista.
- **Coleção Safira** (`/safira-collection`): obras da coleção, carregadas em páginas de 5 itens.
- **Área administrativa** (`/auth/login`): login com e-mail e senha. Depois de autenticado, é possível criar, editar e excluir slides do carrossel, obras da galeria, itens da Coleção Safira e a biografia.

As rotas de escrita exigem um token JWT. O token fica no `localStorage` do navegador.

## Tecnologias

**Frontend** (`arts-frontend`)

- React 19 e Vite
- React Router
- Ant Design e Less
- Axios

**Backend** (`backend`)

- Node.js com Express
- Prisma e MariaDB (MySQL)
- JWT e bcrypt
- Cloudinary e Multer para upload de imagens

## Como rodar

Pré-requisitos: Node.js, um banco MariaDB ou MySQL e uma conta no Cloudinary.

### 1. Backend

```bash
cd backend
npm install
```

Crie o arquivo `backend/.env` (ele não deve ir para o Git):

```env
DATABASE_URL="mysql://USUARIO:SENHA@localhost:3306/NOME_DO_BANCO"
JWT_SECRET="uma-chave-secreta-longa"
CLOUDINARY_CLOUD_NAME="seu-cloud-name"
CLOUDINARY_API_KEY="sua-api-key"
CLOUDINARY_API_SECRET="seu-api-secret"
```

Gere o cliente do Prisma, aplique as migrations e suba a API:

```bash
npx prisma generate
npx prisma migrate dev
npm run dev
```

A API sobe em `http://localhost:8081`.

### 2. Frontend

Em outro terminal:

```bash
cd arts-frontend
npm install
npm run dev
```

O Vite abre o site em `http://localhost:5173`. O endereço da API está fixo em `arts-frontend/src/helper/axios-instance.js` (`http://localhost:8081`).

Build de produção:

```bash
npm run build
npm run preview
```

## API

Base: `http://localhost:8081`

| Método | Rota | Acesso |
| --- | --- | --- |
| `POST` | `/auth/login` | Público. Corpo: `{ "email", "password" }` |
| `GET` | `/artworks` | Público. Lista as obras da Home |
| `GET` | `/artworks/:id` | Público |
| `POST` | `/artworks` | Autenticado. Campo de arquivo: `image` |
| `PUT` | `/artworks/:id` | Autenticado |
| `DELETE` | `/artworks/:id` | Autenticado |
| `GET` | `/artworks/biography` | Público |
| `PUT` | `/artworks/biography/:id` | Autenticado. Campo de arquivo: `image` |
| `GET` | `/artworks/safira-collection` | Público. Query: `limit`, `cursor` |
| `POST` | `/artworks/safira-collection` | Autenticado |
| `PUT` | `/artworks/safira-collection/:id` | Autenticado |
| `DELETE` | `/artworks/safira-collection/:id` | Autenticado |
| `GET` | `/carousel` | Público |
| `POST` | `/carousel` | Autenticado |
| `PUT` | `/carousel/:id` | Autenticado |
| `DELETE` | `/carousel/:id` | Autenticado |

Nas rotas autenticadas, envie o header `Authorization: Bearer <token>`.

## Estrutura

```
arts-frontend/     Interface (páginas, componentes e tema)
backend/           API Express
backend/prisma/    Schema e migrations
backend/src/       Rotas, controllers e middlewares
```

## Observações

- Não versione `backend/.env`. Credenciais de banco, JWT e Cloudinary ficam só nesse arquivo.
- O cliente gerado do Prisma (`backend/generated/prisma`) também fica fora do Git. Rode `npx prisma generate` depois de clonar.
- É preciso existir um usuário na tabela `unique_user` (senha com hash bcrypt) para entrar na área administrativa.
