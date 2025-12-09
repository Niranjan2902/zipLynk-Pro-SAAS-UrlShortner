📘 ZipLynk Pro – AI-Powered MERN URL Shortener

A full-stack SaaS URL shortener featuring user tiers (Free: 5 URLs, Pro: Unlimited), real-time analytics, QR generation, and AI-powered traffic insights using Gemini API. Built for scale with secure JWT auth, MongoDB access rules, and a responsive React + Tailwind UI.

🧱 Project Structure
Url-Shortner/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── service/
│   ├── utils/             # AI helpers (ai.js)
│   ├── connection.js
│   ├── server.js
│   ├── .env               # (ignored in Git)
│   └── package.json
├── client/
│   ├── public/
│   └── src/
│       ├── components/    # Navbar, charts, cards
│       ├── pages/         # Landing, Login, Dashboard, Analytics
│       ├── App.js
│       ├── index.js
│       └── index.css
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
├── README.md
└── .gitignore

🚀 Tech Stack
Frontend

React.js

Tailwind CSS

qrcode.react

Recharts (analytics)

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

AI

Gemini API – generates human-readable traffic summaries for Pro users only

Deployment

Frontend: Vercel

Backend: Render / Railway / VPS

🛠️ Local Setup
1. Install MongoDB

Official guide: https://www.mongodb.com/docs/manual/installation/

2. Clone + Install All Dependencies
git clone <repo-url>
cd Url-Shortner
npm run install:all


(Ensure your root package.json has an install:all script running both client & backend Installs.)

3. Environment Variables

Inside backend/, create:

backend/.env


Add:

MONGODB_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_key
BASE_URL=http://localhost:8000


⚠️ Never push .env to GitHub.
See explanation below.

4. Start Development
npm run dev


Backend: http://localhost:8000

Frontend: http://localhost:5173

5. Test the App

Sign up → login → create short URLs

Scan QR / visit link → analytics updates in dashboard

Pro account → test AI summary generation

📡 API Endpoints
Method	Route	Description	Auth
POST	/api/user	Signup	None
POST	/api/user/login	Login	None
GET	/api/dashboard	User stats + URLs	JWT
POST	/api/url/shorten	Create short link	JWT + Tier limit
GET	/api/url/analytics/:id	Click analytics	JWT
POST	/api/ai/summary	AI insights (Gemini)	Pro + JWT
