FROM node:18-slim as builder

WORKDIR /workspace

COPY package*.json ./
COPY nx.json ./
COPY tsconfig*.json ./
COPY jest.config.ts ./
COPY jest.preset.js ./
COPY .eslintrc.json ./
COPY eslint.config.mjs ./
COPY webpack.*.config.js ./

COPY apps/auth-service ./apps/auth-service
COPY libs/graphql ./libs/graphql
COPY libs/grpc ./libs/grpc
COPY libs/nestjs ./libs/nestjs
COPY libs/prisma ./libs/prisma

RUN npm install --legacy-peer-deps

RUN apt-get update && apt-get install -y protobuf-compiler

RUN npx nx build auth-service

FROM node:18-slim AS runner

WORKDIR /apps

COPY --from=builder /workspace/package.json ./
COPY --from=builder /workspace/apps/auth-service/package.json ./apps/auth-service/package.json
COPY --from=builder /workspace/libs/graphql/package.json ./libs/graphql/package.json
COPY --from=builder /workspace/libs/grpc/package.json ./libs/grpc/package.json
COPY --from=builder /workspace/libs/prisma/package.json ./libs/prisma/package.json
COPY --from=builder /workspace/package-lock.json ./

ENV NODE_ENV=production

RUN npm ci --legacy-peer-deps

COPY --from=builder /workspace/node_modules/@prisma-clients/auth-service/ ./node_modules/@prisma-clients

COPY --from=builder /workspace/dist ./dist

CMD ["node", "dist/apps/auth-service/main"]
