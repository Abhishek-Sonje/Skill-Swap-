# Multi-stage build for production
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY Client/package*.json ./Client/
COPY Server/package*.json ./Server/

# Install dependencies
RUN npm run install:all

# Copy source code
COPY . .

# Build client
RUN npm run build:client

# Production stage
FROM node:18-alpine AS production

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY Server/package*.json ./Server/

# Install only production dependencies
RUN cd Server && npm ci --only=production

# Copy built client and server
COPY --from=builder /app/Client/dist ./Client/dist
COPY --from=builder /app/Server ./Server

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change ownership
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose port
EXPOSE 5000

# Set environment
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"] 