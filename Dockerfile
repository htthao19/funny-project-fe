#-----------------------------------------------
# Builder stage.
FROM node:20-alpine as builder

ENV NODE_ENV=production

WORKDIR /app

COPY . /app/
RUN npm install
RUN npm run build

#-----------------------------------------------
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
