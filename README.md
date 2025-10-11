## Next.js

npx create-next-app@latest --skip-install --tailwind --app --ts dc01

## shadcn

npx shadcn@latest init

addsdn button input tooltip dialog form separator scroll-area

## Prisma

pi prisma tsx -D
pi @prisma/client @prisma/extension-accelerate

npx prisma init --output lib/generated/prisma

```textplain
# prisma.schema
generator client {
  provider = "prisma-client-js"
  output   = "../lib/generated/prisma"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

npx run prisma:generate
npx run prisma:push

## Clerk
