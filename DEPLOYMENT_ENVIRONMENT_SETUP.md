# 🚀 Environment Variables Setup Guide

This guide will help you set up the correct environment variables for your Skill Swap deployment.

## 🏗️ **Deployment Architecture**

Your Skill Swap application uses a **separated frontend/backend architecture**:

- **Frontend (React)**: Deployed on **Vercel** - handles UI, user interactions, and makes API calls
- **Backend (Node.js)**: Deployed on **Render** - handles API requests, database operations, and Socket.IO
- **Database**: MongoDB Atlas - stores user data and chat messages

**Why this architecture?**
- ✅ Better scalability and performance
- ✅ Independent deployments
- ✅ Cost-effective (both platforms offer free tiers)
- ✅ No need to serve static files from backend

## 🔧 **Frontend (Vercel) Environment Variables**

### **Required Variables:**
```
VITE_API_URL=https://your-render-backend-url.onrender.com
VITE_SOCKET_URL=https://your-render-backend-url.onrender.com
```

### **How to Set in Vercel:**
1. Go to your Vercel dashboard
2. Select your Skill Swap project
3. Go to **Settings** → **Environment Variables**
4. Add each variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-render-backend-url.onrender.com`
   - **Environment**: Production, Preview, Development
5. Repeat for `VITE_SOCKET_URL`
6. **Redeploy** your project

## 🔧 **Backend (Render) Environment Variables**

### **Required Variables:**
```
NODE_ENV=production
PORT=10000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
FRONTEND_URL=https://your-vercel-frontend-url.vercel.app
COOKIE_SECRET=your_cookie_secret
```

### **How to Set in Render:**
1. Go to your Render dashboard
2. Select your Skill Swap backend service
3. Go to **Environment** tab
4. Add each variable:
   - **Key**: `NODE_ENV`, **Value**: `production`
   - **Key**: `PORT`, **Value**: `10000`
   - **Key**: `MONGO_URI`, **Value**: Your MongoDB Atlas connection string
   - **Key**: `JWT_SECRET`, **Value**: A strong random string
   - **Key**: `JWT_EXPIRE`, **Value**: `30d`
   - **Key**: `FRONTEND_URL`, **Value**: Your Vercel frontend URL
   - **Key**: `COOKIE_SECRET`, **Value**: A strong random string
5. **Deploy** your service

## 🔍 **Troubleshooting Connection Issues**

### **Error: `net::ERR_CONNECTION_REFUSED` to localhost:5000**
**Cause**: Frontend is still trying to connect to local development server
**Solution**: 
1. ✅ Set `VITE_API_URL` in Vercel
2. ✅ Set `VITE_SOCKET_URL` in Vercel
3. ✅ Redeploy frontend

### **Error: `ENOENT: no such file or directory, stat '/opt/render/project/src/Client/dist/index.html'`**
**Cause**: Backend is trying to serve frontend static files that don't exist on Render
**Solution**: 
1. ✅ This error is now fixed in the code (static file serving removed)
2. ✅ Redeploy backend on Render
3. ✅ Ensure frontend and backend are deployed separately

### **Error: CORS issues**
**Cause**: Backend CORS not configured for frontend domain
**Solution**:
1. ✅ Set `FRONTEND_URL` in Render to your Vercel domain
2. ✅ Redeploy backend

### **Error: MongoDB connection failed**
**Cause**: Invalid or missing MongoDB connection string
**Solution**:
1. ✅ Verify `MONGO_URI` in Render
2. ✅ Check MongoDB Atlas network access
3. ✅ Ensure database user has correct permissions

## 📋 **Quick Deployment Checklist**

### **Frontend (Vercel):**
- [ ] Set `VITE_API_URL` to your Render backend URL
- [ ] Set `VITE_SOCKET_URL` to your Render backend URL
- [ ] Redeploy project

### **Backend (Render):**
- [ ] Set `NODE_ENV=production`
- [ ] Set `FRONTEND_URL` to your Vercel frontend URL
- [ ] Set `MONGO_URI` to your MongoDB Atlas connection
- [ ] Set `JWT_SECRET` and `COOKIE_SECRET`
- [ ] Deploy service

### **Test:**
- [ ] Frontend loads without localhost errors
- [ ] Backend health check works: `/api/health`
- [ ] User registration/login works
- [ ] Chat functionality works

## 🌐 **Example URLs**

### **Your URLs should look like:**
```
Frontend: https://skill-swap-frontend.vercel.app
Backend: https://skill-swap-backend.onrender.com
MongoDB: mongodb+srv://username:password@cluster.mongodb.net/skillswap
```

### **Environment Variables:**
```
VITE_API_URL=https://skill-swap-backend.onrender.com
VITE_SOCKET_URL=https://skill-swap-backend.onrender.com
FRONTEND_URL=https://skill-swap-frontend.vercel.app
```

## 🆘 **Need Help?**

If you're still having issues:
1. Check the browser console for specific error messages
2. Verify all environment variables are set correctly
3. Ensure both services are deployed and running
4. Check Render logs for backend errors
5. Check Vercel logs for frontend errors 