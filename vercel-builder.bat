@echo off

REM Install the Prisma CLI
npm install prisma --save-dev

REM Generate the Prisma Client
npx prisma generate

REM Build the Next.js application
npm run build
