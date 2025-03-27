# 1-qadam: Tugunli bazaviy tasvirdan foydalanamiz
FROM node:18-alpine AS builder

# Ishchi katalogni yaratamiz va unga o'tamiz
WORKDIR /app

# package.json va package-lock.json fayllarini nusxalaymiz
COPY package.json package-lock.json ./

# Paketlarni majburan o'rnatamiz
RUN npm install --force

# Next.js ilovasining barcha kodini konteyner ichiga nusxalaymiz
COPY . .

# Next.js ilovasini build qilamiz
RUN npm run build

# 2-qadam: Yengil tasvirni yaratamiz
FROM node:18-alpine AS runner

# Ishchi katalogni yaratamiz va unga o'tamiz
WORKDIR /app

# `node_modules` va `.next` kataloglarini builder qismidan nusxalaymiz
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Xizmatni boshlash uchun muhit o'zgaruvchilarini belgilaymiz
ENV NODE_ENV=production
ENV PORT=3000

# Konteyner ochiq porti
EXPOSE 3000

# Next.js ilovasini ishga tushiramiz
CMD ["node_modules/.bin/next", "start"]