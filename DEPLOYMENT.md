# Skill Swap - Deployment Guide

This guide covers deploying the Skill Swap application, with a focus on **Vercel** (frontend) and **Render** (backend).

## 🚀 Recommended Deployment: Vercel + Render

For the best deployment experience, we recommend:
- **Frontend**: Deploy to [Vercel](https://vercel.com) (free tier available)
- **Backend**: Deploy to [Render](https://render.com) (free tier available)
- **Database**: Use [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier available)

**Quick Start:**
1. See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for frontend deployment
2. See [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md) for backend deployment

## Prerequisites

- Node.js 16+ and npm 8+
- MongoDB (local or cloud service like MongoDB Atlas)
- Git

## Environment Setup

### 1. Server Environment Variables

Create a `.env` file in the `Server/` directory:

```bash
# Copy the example file
cp Server/env.example Server/.env

# Edit the .env file with your production values
```

Required variables:
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Set to "production"
- `MONGO_URI`: Your MongoDB connection string
- `JWT_SECRET`: Strong secret for JWT tokens
- `COOKIE_SECRET`: Strong secret for cookies
- `FRONTEND_URL`: Your frontend domain

### 2. Client Environment Variables

Create a `.env.local` file in the `Client/` directory:

```bash
# Copy the example file
cp Client/env.example Client/.env.local

# Edit the .env.local file with your production values
```

Required variables:
- `VITE_API_URL`: Your backend API URL
- `VITE_SOCKET_URL`: Your backend socket URL

## Deployment Options

### Option 1: Traditional VPS/Server Deployment

#### 1. Build the Application

```bash
# Install dependencies
npm run install:all

# Build the client
npm run build

# The built files will be in Client/dist/
```

#### 2. Deploy to Server

```bash
# Copy files to your server
scp -r . user@your-server:/path/to/app

# SSH into your server
ssh user@your-server

# Navigate to app directory
cd /path/to/app

# Install production dependencies
cd Server && npm ci --only=production

# Start the server
npm start
```

#### 3. Use PM2 for Process Management

```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start Server/server.js --name "skill-swap"

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### Option 2: Docker Deployment

#### 1. Build and Run with Docker Compose

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

#### 2. Deploy with Docker

```bash
# Build the production image
docker build -t skill-swap .

# Run the container
docker run -d \
  -p 5000:5000 \
  -e NODE_ENV=production \
  -e MONGO_URI=your_mongodb_uri \
  -e JWT_SECRET=your_jwt_secret \
  -e COOKIE_SECRET=your_cookie_secret \
  --name skill-swap-app \
  skill-swap
```

### Option 3: Cloud Platform Deployment

#### Heroku

1. Install Heroku CLI
2. Create a new Heroku app
3. Set environment variables in Heroku dashboard
4. Deploy:

```bash
heroku create your-app-name
heroku config:set NODE_ENV=production
heroku config:set MONGO_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set COOKIE_SECRET=your_cookie_secret
git push heroku main
```

#### Railway

1. Connect your GitHub repository
2. Set environment variables in Railway dashboard
3. Deploy automatically on push

#### Render

1. Connect your GitHub repository
2. Set environment variables
3. Configure build command: `npm run build`
4. Configure start command: `npm start`

## Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong, unique secrets for JWT and cookies
- [ ] Configure MongoDB with authentication
- [ ] Set up SSL/TLS certificates
- [ ] Configure reverse proxy (nginx/Apache) if needed
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy
- [ ] Test all functionality in production environment

## Security Considerations

1. **Environment Variables**: Never commit `.env` files to version control
2. **JWT Secrets**: Use strong, random secrets
3. **CORS**: Configure CORS to only allow your frontend domain
4. **MongoDB**: Use authentication and restrict network access
5. **HTTPS**: Always use HTTPS in production
6. **Rate Limiting**: Consider implementing rate limiting for API endpoints

## Troubleshooting

### Common Issues

1. **Port already in use**: Change the port in environment variables
2. **MongoDB connection failed**: Check connection string and network access
3. **CORS errors**: Verify FRONTEND_URL is correct
4. **Build failures**: Ensure Node.js version is compatible

### Logs

```bash
# View server logs
docker-compose logs server

# View client logs
docker-compose logs client

# View MongoDB logs
docker-compose logs mongodb
```

## Support

For deployment issues, check:
1. Environment variables are set correctly
2. MongoDB is accessible
3. Ports are not blocked by firewall
4. All dependencies are installed 