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

COPY apps/executor-service ./apps/executor-service
COPY libs/nestjs ./libs/nestjs
COPY libs/pulsar ./libs/pulsar

RUN npm install --legacy-peer-deps

RUN npx nx build executor-service

FROM node:18-slim AS runner

WORKDIR /apps

COPY --from=builder /workspace/package.json ./
COPY --from=builder /workspace/apps/executor-service/package.json ./apps/executor-service/package.json
COPY --from=builder /workspace/libs/pulsar/package.json ./libs/pulsar/package.json
COPY --from=builder /workspace/package-lock.json ./

ENV NODE_ENV=production

RUN npm ci --legacy-peer-deps

COPY --from=builder /workspace/dist ./dist

CMD ["node", "dist/apps/executor-service/main"]
