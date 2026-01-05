# Deployment Checklist for HalalCheck AI

## Pre-Deployment Steps

### 1. Environment Variables Setup
- [ ] Create MongoDB Atlas account and cluster
- [ ] Get MongoDB connection string
- [ ] Generate JWT secret key (use: `openssl rand -base64 32`)
- [ ] Get Google Gemini API key from Google AI Studio
- [ ] Test all environment variables locally

### 2. Security Review
- [ ] Verify JWT_SECRET is strong (32+ characters)
- [ ] Confirm MongoDB connection string uses SSL/TLS
- [ ] Ensure no sensitive data in repository
- [ ] Review admin credentials security policy

### 3. Database Setup
- [ ] Create database named `halalcheck` in MongoDB Atlas
- [ ] Verify collections are created automatically on first use:
  - `users` collection
  - `history` collection
- [ ] Set up MongoDB Atlas network access (allow Vercel IPs or 0.0.0.0/0)
- [ ] Create database user with read/write permissions

### 4. Code Review
- [ ] Remove any console.log debug statements
- [ ] Verify all API routes have proper authentication
- [ ] Test admin-only routes reject non-admin users
- [ ] Confirm disabled users cannot log in

## Vercel Deployment

### 1. Repository Setup
- [ ] Push code to GitHub repository
- [ ] Ensure `.env.local` is in `.gitignore`
- [ ] Verify `.env.example` is committed

### 2. Vercel Project Setup
- [ ] Import project from GitHub in Vercel dashboard
- [ ] Configure project settings:
  - Framework Preset: Next.js
  - Root Directory: ./
  - Build Command: npm run build (default)
  - Output Directory: .next (default)

### 3. Environment Variables in Vercel
- [ ] Go to Project Settings → Environment Variables
- [ ] Add the following variables:
  - `MONGODB_URI` (Production, Preview, Development)
  - `JWT_SECRET` (Production, Preview, Development)
  - `GEMINI_API_KEY` (Production, Preview, Development)
- [ ] Verify all variables are correctly formatted

### 4. Deploy
- [ ] Click "Deploy" button
- [ ] Wait for build to complete
- [ ] Check deployment logs for errors

## Post-Deployment Testing

### 1. Authentication Testing
- [ ] Test hardcoded admin login (admin@gmail.com / admin123)
- [ ] Test user registration
- [ ] Test user login
- [ ] Verify JWT tokens are set correctly
- [ ] Test logout functionality

### 2. Admin Features Testing
- [ ] Access admin dashboard
- [ ] View admin statistics
- [ ] Create a new user (both roles)
- [ ] Disable a user account
- [ ] Enable a previously disabled user
- [ ] Delete a user account
- [ ] Verify disabled user cannot log in

### 3. User Features Testing
- [ ] Perform ingredient analysis
- [ ] View analysis results
- [ ] Check analysis history
- [ ] Verify user data isolation (create second user, check they only see their data)

### 4. AI Integration Testing
- [ ] Test ingredient query with valid input
- [ ] Verify Gemini API responses
- [ ] Check analysis history is saved correctly
- [ ] Test with various ingredient types

### 5. Performance & Security
- [ ] Test page load times
- [ ] Verify HTTPS is enabled
- [ ] Check API response times
- [ ] Test with multiple concurrent users
- [ ] Verify no sensitive data in browser console
- [ ] Check HTTP-only cookie is set correctly

## Monitoring & Maintenance

### 1. Setup Monitoring
- [ ] Monitor MongoDB Atlas usage and performance
- [ ] Track Gemini API quota and usage
- [ ] Set up Vercel analytics
- [ ] Monitor error rates in Vercel logs

### 2. Regular Maintenance
- [ ] Review disabled user accounts weekly
- [ ] Monitor platform usage statistics
- [ ] Check for unusual activity patterns
- [ ] Update dependencies regularly
- [ ] Review and rotate JWT secret periodically

## Troubleshooting

### Common Issues

**Database Connection Errors**
- Verify MongoDB connection string is correct
- Check network access settings in MongoDB Atlas
- Ensure database user has proper permissions

**Authentication Issues**
- Verify JWT_SECRET is set correctly
- Check cookie settings (httpOnly, secure, sameSite)
- Ensure token expiration is appropriate

**AI Analysis Failures**
- Verify GEMINI_API_KEY is valid
- Check API quota hasn't been exceeded
- Review error messages in Vercel logs

## Support

For issues or questions:
- Check Vercel deployment logs
- Review MongoDB Atlas logs
- Contact Vercel support at vercel.com/help
- Review Google AI Studio documentation

---

**Ready for Production**: Once all checklist items are complete, your HalalCheck AI platform is ready for production use.
