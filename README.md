# 🚀 Imagify – AI Text to Image Generator

Imagify is a **full-stack AI web application** that converts text prompts into high-quality images using powerful generative AI APIs.  
Users can simply enter a prompt and generate unique AI-created images within seconds.

The platform includes **secure authentication, credit-based usage, and Razorpay payments**, creating a smooth and scalable AI image generation experience.

# 🌐 Live Demo

🔗 **Live Project:**  
https://imagify-rust-xi.vercel.app/

🔗 **Backend API:**  
https://imagify-backend-nsij.onrender.com

# ✨ Features

- 🎨 **AI Image Generation** – Generate images from text prompts using AI APIs  
- 🔐 **JWT Authentication** – Secure user login and authentication system  
- 💳 **Credit-Based Usage** – Users receive free credits and can purchase more  
- 💰 **Razorpay Integration** – Secure payment gateway for buying credits  
- ⚡ **Smooth UI** – Animations implemented using Framer Motion  
- 📱 **Responsive Design** – Works across different devices  
- ☁️ **Cloud Deployment** – Frontend on Vercel, backend on Render
- 
# 🧠 How It Works

1. User enters a **text prompt**.
2. The frontend sends a request to the backend API.
3. Backend calls the **AI image generation API**.
4. The generated image is returned as **Base64 format**.
5. The frontend displays the generated image to the user.
6. Each generation deducts **1 credit** from the user's balance.

# 🏗️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Framer Motion
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

### AI APIs
- OpenAI API
- ClipDrop API

### Payments
- Razorpay

### Deployment
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)
- 
# 📂 Project Structure

```
Imagify
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   └── assets
│
├── server
│   ├── config
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middlewares
│   └── server.js
│
└── README.md
```

---

# ⚙️ Installation & Setup

### Clone the repository

```bash
git clone https://github.com/ankitaa2603/Imagify.git
cd Imagify
```

## Backend Setup

```bash
cd server
npm install
```

Create `.env`

```
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_secret
CLIPDROP_API=your_clipdrop_api_key
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

Run backend

```bash
npm start
```

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

# 🔐 Environment Variables

### Backend

```
MONGODB_URI
JWT_SECRET
CLIPDROP_API
RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
```

### Frontend

```
VITE_BACKEND_URL
```

# 💳 Payment Flow

1. User selects **Buy Credits**
2. Razorpay payment gateway opens
3. Payment is verified on the backend
4. Credits are added to the user account

---

# 📸 Example Prompt

```
A futuristic cyberpunk city at night with neon lights
```

The system generates a **unique AI image** from the prompt.

# 👨‍💻 Author

**Ankita Gupta**

GitHub  
https://github.com/ankitaa2603

LinkedIn  
https://www.linkedin.com/in/ankitaaguptaa
