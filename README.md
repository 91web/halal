# HalalCheck AI - Halal Compliance Intelligence Platform

A professional, enterprise-grade platform for AI-powered Halal ingredient compliance analysis using Google Gemini 1.5 Pro and MongoDB. This platform is built for international standards, ensuring trust and transparency in the global Halal industry.

## Features

### User Features
- **AI-Powered Analysis**: Real-time Halal compliance checking using Google Gemini 1.5 Pro.
- **Guest Access**: Immediate ingredient analysis for non-registered users (saved to database).
- **Analysis History**: Secure personal dashboard for registered users to track and manage their analysis history.
- **Evidence-Based Results**: Citations from Islamic jurisprudence (Fiqh) and food science standards (JAKIM, GSO).
- **Secure Authentication**: JWT-based authentication with bcrypt password hashing and HTTP-only cookies.

### Admin Features
- **Admin Governance Dashboard**: Monitor platform-wide activity and compliance ratings.
- **User Management**: Enable, disable, or delete user accounts based on policy compliance.
- **Create User**: Admins can create new users with specific roles (User or Admin).
- **Password Management**: Admins can set or reset passwords for any user account.
- **Activity Monitoring**: Real-time feed of all platform analyses.

## Hardcoded Admin Credentials

For initial setup and maintenance:
- **Email**: `admin@gmail.com`
- **Password**: `admin123`

## Environment Setup

Create a `.env` file in the root directory and add the following:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
GEMINI_API_KEY=your_google_gemini_api_key
```

### Getting Your Keys
1. **MongoDB**: Get a connection string from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. **JWT Secret**: Generate a 32-character string (e.g., `openssl rand -base64 32`).
3. **Gemini API**: Obtain your key from [Google AI Studio](https://aistudio.google.com/).

## Deployment

The application is optimized for deployment on **Vercel**. Simply push to GitHub and connect your repository to Vercel, ensuring all environment variables are added in the Vercel dashboard.

## Security & Standards
- **MUI Only**: Built exclusively with professional Material Design patterns.
- **Next.js**: Utilizing the latest App Router and Server Actions.
- **LinkedIn Aesthetic**: Professional blue and white color palette for an international standard feel.
