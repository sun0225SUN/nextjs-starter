## Tech Stack

- Framework: [Next.js](https://nextjs.org)
- Language - [TypeScript]()
- Styling: [Tailwind CSS](https://tailwindcss.com)
- UI Library: [shadcn/ui](https://ui.shadcn.com)
- State Management - [Zustand](https://zustand-demo.pmnd.rs)
- Database: [Postgres](https://www.postgresql.org)
- ORM: [Prisma](https://prisma.io)
- Auth - [Better Auth](https://www.better-auth.com)
- Schema Validations - [Zod](https://zod.dev)
- formatter and linter - [Biome](https://biomejs.dev)
- Git hooks - [Husky](https://lefthook.dev)

## Local Development

### Environment Variables

Create a `.env` file at the project root and copy the following content:

```bash
# Prisma Database Configuration
DATABASE_URL="postgresql://postgres:password@localhost:5432/nextjs-starter-template"

# Better Auth Configuration
BETTER_AUTH_SECRET="ShF5vSuOm5xWCgnuqvHsx6lj7VhceIlkT9NebI0QO0w="
BETTER_AUTH_URL="http://localhost:3000"
```

### Start the database and initialize

```bash
./start-database.sh
```

```bash
bun run db:push
```

### Install dependencies

```bash
bun install
```

### Run the development server

```bash
bun run dev
```

Open: `http://localhost:3000`