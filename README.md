ZipLynk Pro – AI-Powered URL Shortener (MERN SaaS)

A modern, scalable URL shortener with user tiers (Free: 5 URLs, Pro: Unlimited), real-time analytics, QR generation, and AI-powered traffic summaries using Google Gemini API.
Designed as a SaaS platform with secure JWT authentication and optimized MongoDB access rules.

🚀 Tech Stack
Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Auth

Gemini API (AI summaries)

Frontend

React.js

Tailwind CSS

qrcode.react

Recharts (analytics)

Deployment

Frontend: Vercel

Backend: Render / Railway

📁 Folder Structure
Url-Shortner/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── service/
│   ├── utils/              # AI helpers (ai.js)
│   ├── connection.js
│   ├── server.js
│   ├── .env                # ignored from Git
│   └── package.json
├── client/
│   ├── public/
│   └── src/
│       ├── components/     # Navbar, charts, cards
│       ├── pages/          # Landing, Login, Dashboard, Analytics
│       ├── App.js
│       ├── index.js
│       └── index.css
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
├── README.md
└── .gitignore

🛠️ Local Setup
1. Install MongoDB

MongoDB installation guide:
https://www.mongodb.com/docs/manual/installation/

2. Clone & Install Dependencies
git clone <your-repo-ssh-url>
cd Url-Shortner
npm run install:all


(install:all should install backend + client packages.)

3. Environment Variables

Create a file:

backend/.env


Add:

MONGODB_URI=
JWT_SECRET=
GEMINI_API_KEY=
BASE_URL=http://localhost:8000


⚠️ .env is NOT pushed to Git.
It is protected via .gitignore + removed using:
git rm --cached backend/.env

4. Start Development
npm run dev


Backend → localhost:8000

Frontend → localhost:5173

5. Test the App

Signup → Login

Shorten URLs

Scan QR or open short links → watch analytics update in real time

Upgrade to Pro → test AI traffic summaries

📡 API Endpoints
Method	Endpoint	Description	Auth
POST	/api/user	Signup	❌
POST	/api/user/login	Login	❌
GET	/api/dashboard	Fetch user URLs + stats	✅ JWT
POST	/api/url/shorten	Create short URL	✅ JWT + tier limit
GET	/api/url/analytics/:id	Click analytics	✅ JWT
POST	/api/ai/summary	AI-generated insight	🔒 Pro + JWT
🖼️ Screenshots

Place screenshots inside /screenshots folder.

![Landing](screenshots/landing.png)
![Dashboard](screenshots/dashboard.png)

🚀 Deploy
Frontend — Vercel
cd client
npm run build


Upload build → or import Git repo → deploy.

Backend — Render / Railway

Push repository

Create new Web Service

Add environment variables (MONGODB_URI, JWT_SECRET, GEMINI_API_KEY)

Deploy

🔐 How to Avoid Pushing .env (IMPORTANT)

Add to .gitignore:

backend/.env


Remove from Git tracking:

git rm --cached backend/.env


Commit:

git commit -m "Remove .env from tracking"
