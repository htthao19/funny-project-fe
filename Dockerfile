#-----------------------------------------------
# Builder stage.
FROM node:20-alpine as builder

ENV NODE_ENV=production

WORKDIR /app

COPY . /app/
RUN npm install
RUN npm run build

#-----------------------------------------------
# # Runner stage.
# FROM node:20-alpine

# ENV NODE_ENV=production

# COPY --from=builder /app/package.json ./
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/build ./build

# EXPOSE 3000

# CMD ["npm", "start"]

# Use NGINX as the web server
FROM nginx:alpine

# Copy built React app to Nginx HTML directory
COPY --from=builder /app/build /var/www

# Copy Nginx configuration to properly handle React Router routes
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
