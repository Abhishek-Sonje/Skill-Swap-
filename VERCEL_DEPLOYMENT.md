# Vercel Deployment Guide for Skill Swap

This guide will help you deploy the Skill Swap frontend to Vercel.

## Prerequisites

- [Vercel account](https://vercel.com/signup)
- [GitHub account](https://github.com)
- Node.js 16+ installed locally

## Deployment Steps

### 1. Prepare Your Repository

Make sure your project is pushed to GitHub with the following structure:
```
Skill Swap/
├── Client/          # React frontend
├── Server/          # Node.js backend
├── vercel.json      # Vercel configuration
└── package.json     # Root package.json
```

### 2. Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard

1. **Import Project**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**
   - **Framework Preset**: Vite
   - **Root Directory**: `./Client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. **Environment Variables**
   Add these environment variables:
   ```
   VITE_API_URL=https://your-render-backend-url.onrender.com
   VITE_SOCKET_URL=https://your-render-backend-url.onrender.com
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

#### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd Client
   vercel
   ```

4. **Follow the prompts**
   - Link to existing project or create new
   - Set build settings
   - Deploy

### 3. Configure Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Configure DNS records as instructed

### 4. Environment Variables Setup

In your Vercel project settings:

1. Go to "Settings" → "Environment Variables"
2. Add:
   ```
   VITE_API_URL=https://your-render-backend-url.onrender.com
   VITE_SOCKET_URL=https://your-render-backend-url.onrender.com
   ```
3. Select "Production" environment
4. Save

### 5. Automatic Deployments

Vercel automatically deploys when you:
- Push to your main branch
- Create a pull request
- Merge a pull request

## Troubleshooting

### Build Errors

1. **Node Version**: Ensure Node.js 16+ is specified in `package.json`
2. **Dependencies**: Check all dependencies are in `package.json`
3. **Build Command**: Verify build command works locally

### Environment Variables

1. **Not Loading**: Ensure variables start with `VITE_`
2. **Build Time**: Variables are embedded at build time
3. **Restart**: Redeploy after adding new variables

### Common Issues

1. **404 on Refresh**: Vercel handles this automatically with the `vercel.json` config
2. **API Calls**: Ensure backend URL is correct and accessible
3. **CORS**: Backend must allow your Vercel domain

## Performance Optimization

1. **Build Optimization**: Vite automatically optimizes builds
2. **CDN**: Vercel provides global CDN
3. **Caching**: Automatic caching for static assets

## Monitoring

- **Analytics**: View in Vercel dashboard
- **Logs**: Check function logs for errors
- **Performance**: Monitor Core Web Vitals

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Vercel Support](https://vercel.com/support)

## Next Steps

After deploying to Vercel:
1. Deploy your backend to Render (see `RENDER_DEPLOYMENT.md`)
2. Update environment variables with your Render backend URL
3. Test the complete application
4. Set up monitoring and alerts 