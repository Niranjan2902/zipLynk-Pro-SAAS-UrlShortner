```markdown
# ZipLynk Pro – AI-Powered SaaS URL Shortener (MERN Stack)

A modern, scalable URL shortener with **Free** (5 links) and **Pro** (unlimited + AI insights) tiers. Features real-time analytics dashboard, client-side QR codes, and **Google Gemini AI** that instantly turns raw click data into clear, human-readable traffic summaries (Pro-only).

## Features
- JWT-secured authentication & role-based access
- Free tier: max 5 URLs | Pro tier: unlimited + AI summaries
- Real-time analytics (clicks, devices, referrers, countries, growth charts)
- Instant QR code generation (zero backend load)
- Pro-exclusive AI traffic insights powered by Google Gemini
- Responsive dashboard built with Tailwind & Recharts

## Tech Stack
**Frontend**
- React 18 + Vite
- Tailwind CSS
- Recharts (analytics)
- qrcode.react
- Lucide React icons

**Backend**
- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT authentication
- Google Gemini API (AI summaries)

**Deployment**
- Frontend → Vercel
- Backend → Render / Railway


## Local Development Setup

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/Url-Shortner.git
cd Url-Shortner

# 2. Install dependencies (both frontend & backend)
npm run install:all
# (or manually: cd backend && npm i ; cd ../client && npm i)

# 3. Create backend/.env (copy from example)
cp backend/.env.example backend/.env
```

### Required Environment Variables (`backend/.env`)
```env
PORT=8000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_strong_secret_here
GEMINI_API_KEY=your_google_gemini_api_key
BASE_URL=http://localhost:5173
```

### Run in development
```bash
npm run dev
# → Backend: http://localhost:8000
# → Frontend: http://localhost:5173
```

## Production Deployment

**Frontend (Vercel)**
```bash
cd client
npm run build
```
Then deploy the `client/dist` folder to Vercel (auto-detected).

**Backend (Render / Railway)**
1. Push code to GitHub
2. Create new Web Service on Render
3. Set the same environment variables as above
4. Build command: `npm install`
5. Start command: `node backend/server.js`

**Important**: Never commit `backend/.env` → it's already ignored via `.gitignore`

## API Endpoints (selected)

| Method | Endpoint                  | Description                  | Auth Required       |
|--------|---------------------------|------------------------------|---------------------|
| POST   | `/api/user/register`      | Signup                       | –                   |
| POST   | `/api/user/login`         | Login                        | –                   |
| GET    | `/api/dashboard`          | User URLs + stats            | JWT                 |
| POST   | `/api/url/shorten`        | Create short URL             | JWT + plan limit    |
| GET    | `/api/url/analytics/:id`  | Detailed analytics           | JWT                 |
| POST   | `/api/ai/summary`         | Gemini AI traffic summary    | Pro JWT only        |

