# Render Deployment Guide for Skill Swap Backend

This guide will help you deploy the Skill Swap backend to Render.

## Prerequisites

- [Render account](https://render.com/signup)
- [GitHub account](https://github.com)
- [MongoDB Atlas account](https://www.mongodb.com/atlas) (for database)
- Node.js 16+ installed locally

## Deployment Steps

### 1. Prepare Your Repository

Ensure your project is pushed to GitHub with the following structure:
```
Skill Swap/
├── Client/          # React frontend
├── Server/          # Node.js backend
├── Server/render.yaml  # Render configuration
└── package.json     # Root package.json
```

### 2. Set Up MongoDB Atlas

1. **Create MongoDB Atlas Cluster**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free cluster
   - Choose your preferred cloud provider and region

2. **Configure Database Access**
   - Create a database user with read/write permissions
   - Note down username and password

3. **Configure Network Access**
   - Add `0.0.0.0/0` to IP Access List (allows Render to connect)
   - Or add Render's IP ranges for better security

4. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

### 3. Deploy to Render

#### Option A: Deploy via Render Dashboard

1. **Create New Web Service**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"

2. **Connect Repository**
   - Connect your GitHub account
   - Select your Skill Swap repository

3. **Configure Service**
   - **Name**: `skillswap-backend` (or your preferred name)
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `Server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Environment Variables**
   Add these environment variables:
   ```
   NODE_ENV=production
   PORT=10000
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/SkillSwap?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=30d
   FRONTEND_URL=https://your-vercel-frontend-url.vercel.app
   COOKIE_SECRET=your_super_secret_cookie_key_here
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for build and deployment to complete

#### Option B: Deploy via render.yaml

1. **Push render.yaml to GitHub**
   - The `render.yaml` file is already configured
   - Push your changes to GitHub

2. **Create Service from YAML**
   - In Render dashboard, click "New +" → "Blueprint"
   - Select your repository
   - Render will automatically detect and use `render.yaml`

### 4. Configure Environment Variables

In your Render service settings:

1. Go to "Environment" tab
2. Add/update these variables:
   ```
   NODE_ENV=production
   PORT=10000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   FRONTEND_URL=https://your-vercel-frontend-url.vercel.app
   COOKIE_SECRET=your_cookie_secret_key
   ```

3. **Important**: Set `MONGO_URI`, `JWT_SECRET`, and `COOKIE_SECRET` as "Secret" variables

### 5. Health Check Configuration

The server includes a health check endpoint at `/api/health` that Render will use to:
- Verify the service is running
- Monitor service health
- Auto-restart if needed

### 6. Custom Domain (Optional)

1. Go to your service settings
2. Navigate to "Custom Domains"
3. Add your domain
4. Configure DNS records as instructed

## Environment Variables Reference

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `NODE_ENV` | Environment mode | Yes | `production` |
| `PORT` | Server port | Yes | `10000` |
| `MONGO_URI` | MongoDB connection string | Yes | `mongodb+srv://...` |
| `JWT_SECRET` | JWT signing secret | Yes | `your_secret_key` |
| `JWT_EXPIRE` | JWT expiration time | No | `30d` |
| `FRONTEND_URL` | Frontend URL for CORS | Yes | `https://app.vercel.app` |
| `COOKIE_SECRET` | Cookie signing secret | Yes | `your_cookie_secret` |

## Troubleshooting

### Build Errors

1. **Node Version**: Ensure Node.js 16+ is specified in `package.json`
2. **Dependencies**: Check all dependencies are in `package.json`
3. **Build Command**: Verify build command works locally

### Runtime Errors

1. **MongoDB Connection**: Check connection string and network access
2. **Port Issues**: Render automatically assigns ports
3. **Environment Variables**: Ensure all required variables are set

### Common Issues

1. **CORS Errors**: Verify `FRONTEND_URL` is correct
2. **Authentication**: Check JWT and cookie secrets
3. **Database**: Ensure MongoDB Atlas is accessible

## Performance & Scaling

1. **Free Tier**: 750 hours/month, sleeps after 15 minutes of inactivity
2. **Paid Plans**: Always-on services, custom domains, more resources
3. **Auto-scaling**: Available on paid plans

## Monitoring

- **Logs**: View in Render dashboard
- **Metrics**: Monitor CPU, memory, and response times
- **Health Checks**: Automatic health monitoring
- **Alerts**: Set up notifications for failures

## Security Best Practices

1. **Environment Variables**: Use Render's secret management
2. **MongoDB**: Restrict network access to Render IPs
3. **JWT Secrets**: Use strong, unique secrets
4. **CORS**: Limit to specific frontend domains

## Support

- [Render Documentation](https://render.com/docs)
- [Render Community](https://community.render.com)
- [Render Support](https://render.com/support)

## Next Steps

After deploying to Render:
1. Deploy your frontend to Vercel (see `VERCEL_DEPLOYMENT.md`)
2. Update Vercel environment variables with your Render backend URL
3. Test the complete application
4. Set up monitoring and alerts
5. Configure custom domains if needed

## Cost Considerations

- **Free Tier**: 750 hours/month, suitable for development/testing
- **Paid Plans**: Start at $7/month for always-on services
- **Database**: MongoDB Atlas free tier (512MB) is sufficient for small apps 