# 📝 Bolzaa Studio

**Professional Video Script Creation Platform** for content creators, filmmakers, and YouTube producers.

> Automate your script creation process with AI-powered templates and professional frameworks.

---

## 🌟 Features

✅ Pre-built video script templates  
✅ UPI payment integration  
✅ Email notifications & verification  
✅ Google Drive integration for script delivery  
✅ Professional dashboard  
✅ Mobile-responsive design  

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + Shadcn/ui
- **Animations:** Framer Motion
- **Routing:** React Router v6
- **Icons:** Lucide React
- **Notifications:** Sonner

### Backend
- **Server:** Express.js (Node.js)
- **Email:** Nodemailer (Gmail SMTP)
- **Middleware:** CORS, Compression
- **Payment:** UPI Integration

---

## 📋 Prerequisites

- **Node.js** 18 or higher
- **npm** or **yarn**
- **Gmail Account** with App Password (for email notifications)
- **UPI ID** (for payment integration)

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables

**Backend** (`backend/.env.local`):
```env
ADMIN_EMAIL=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password
PORT=3001
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:8080,http://localhost:8081,http://localhost:3000
```

**Frontend** (`frontend/.env.local`):
```env
VITE_API_BASE_URL=http://localhost:3001
VITE_UPI_ID=your-upi-id@bank
VITE_ADMIN_EMAIL=your-email@gmail.com
```

### 3. How to Get Gmail App Password
1. Go to [Google Account](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification** (enable if not already)
3. Go to **App passwords**
4. Select **Mail** and **Windows Computer**
5. Copy the 16-character password

### 4. Run Development Server

**Frontend Only:**
```bash
npm run dev
```

**Backend Only:**
```bash
npm run server
```

**Frontend + Backend (Recommended):**
```bash
npm run dev:full
```

### 5. Build for Production
```bash
npm run build
```

### 6. Preview Production Build
```bash
npm run preview
```

---

## 📁 Project Structure

```
.
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── pages/           # Page components
│   │   ├── components/      # Reusable components
│   │   ├── lib/             # Utilities & helpers
│   │   ├── hooks/           # Custom React hooks
│   │   └── App.tsx          # Main app component
│   ├── vite.config.ts       # Vite configuration
│   ├── tailwind.config.ts   # Tailwind CSS config
│   └── tsconfig.app.json    # TypeScript config
│
├── backend/                  # Express.js backend
│   ├── server.ts            # Main server file
│   ├── .env.local           # Environment variables (not committed)
│   └── .env.example         # Template for .env.local
│
├── package.json             # Root dependencies
├── tsconfig.json            # Root TypeScript config
├── .gitignore               # Git ignore patterns
└── README.md                # This file
```

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend dev server (port 5173) |
| `npm run server` | Start backend server (port 3001) |
| `npm run dev:full` | Run both frontend & backend concurrently |
| `npm run build` | Build frontend for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |

---

## 📧 Email Configuration

The platform sends emails via Gmail SMTP for:
- Payment verification notifications
- Contact form submissions
- Order confirmations

**Important:** Use Gmail App Password, not your regular password!

---

## 💳 Payment Integration

Supports **UPI payments** via:
- Google Pay
- PhonePe
- Paytm
- BHIM

Payment flow:
1. User selects a plan
2. Manually transfers amount via UPI
3. Uploads payment screenshot
4. Backend verifies and sends verification email
5. Admin confirms payment → Scripts sent to Google Drive

---

## 🚢 Deployment

### Frontend: Vercel
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy automatically on push

### Backend: Railway / Render
1. Create project on Railway/Render
2. Connect GitHub repository
3. Add environment variables in dashboard
4. Deploy

**Update ALLOWED_ORIGINS** after deployment with your live domains.

---

## 🔒 Security

✅ `.env.local` never committed to Git  
✅ Passwords stored as environment variables  
✅ CORS properly configured  
✅ Payment verification with transaction IDs  
✅ Screenshot validation  

---

## 📝 API Endpoints

### POST `/api/verify-transaction`
Verify UPI payment screenshot and transaction ID

**Request:**
```json
{
  "transactionId": "T12345...",
  "amount": 499,
  "email": "user@example.com",
  "screenshotBase64": "data:image/png;base64,..."
}
```

### POST `/api/send-email`
Send contact form or order confirmation emails

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Order Confirmation",
  "message": "..."
}
```

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Create a feature branch
2. Make your changes
3. Test locally
4. Submit a pull request

---

## 📄 License

Copyright © 2024 Bolzaa Studio. All rights reserved.

---

## 📞 Support

**Email:** bolzaa277@gmail.com  
**Instagram:** [@bolzaa277](https://instagram.com/bolzaa277)

---

## 🎯 Roadmap

- [ ] Database integration (MongoDB)
- [ ] Admin dashboard
- [ ] Advanced analytics
- [ ] AI script generation
- [ ] Mobile app

---

**Made with ❤️ by Bolzaa Team**