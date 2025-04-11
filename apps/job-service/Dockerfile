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

COPY apps/job-service ./apps/job-service
COPY libs/graphql ./libs/graphql
COPY libs/grpc ./libs/grpc
COPY libs/nestjs ./libs/nestjs
COPY libs/pulsar ./libs/pulsar

RUN npm install --legacy-peer-deps

RUN apt-get update && apt-get install -y protobuf-compiler

RUN npx nx build job-service

FROM node:18-slim AS runner

WORKDIR /apps

COPY --from=builder /workspace/package.json ./
COPY --from=builder /workspace/apps/job-service/package.json ./apps/job-service/package.json
COPY --from=builder /workspace/libs/graphql/package.json ./libs/graphql/package.json
COPY --from=builder /workspace/libs/grpc/package.json ./libs/grpc/package.json
COPY --from=builder /workspace/libs/pulsar/package.json ./libs/pulsar/package.json
COPY --from=builder /workspace/package-lock.json ./

ENV NODE_ENV=production

RUN npm ci --legacy-peer-deps

COPY --from=builder /workspace/dist ./dist

CMD ["node", "dist/apps/job-service/main"]
