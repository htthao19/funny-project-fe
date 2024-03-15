#-----------------------------------------------
# Builder stage.
FROM node:20-alpine as builder

ENV NODE_ENV=production

WORKDIR /app

COPY . /app/
RUN npm install
RUN npm run build

#-----------------------------------------------
# Runner stage.
FROM node:20-alpine

ENV NODE_ENV=production

COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]