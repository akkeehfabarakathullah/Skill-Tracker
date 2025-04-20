# 📚 Skiil Learning Tracker App

A simple and elegant web app that helps users track learning progress, set goals, and monitor achievements. Built with **React**, this app integrates authentication, a customizable dashboard, and skill-tracking functionalities—all wrapped in a modern UI with dark mode support.

---

## ✨ Features

- 🔐 **User Authentication** – Secure login and registration using JWT tokens.
- 📊 **Dashboard** – Personalized dashboard to track progress, goals, and achievements.
- 🧠 **Skill Tracking** – Manage and monitor skills across learning areas.
- ⚙️ **Settings** – Update profile information and preferences.
- 🌗 **Dark Mode** – Easily toggle between dark and light themes.

---

## 🛠️ Technologies Used

- ⚛️ **React** – Frontend library for building interactive UIs.
- 🛣️ **React Router** – Client-side routing for SPA navigation.
- 🗂️ **Zustand / React Context** – Lightweight state management.
- 🎨 **Tailwind CSS** – Utility-first styling for a beautiful interface.
- ⚡ **Vite** – Next-gen frontend tooling and fast development.

---

## 🚀 Getting Started

Follow these steps to get the app running locally:

### 📋 Prerequisites

Make sure you have:

- **Node.js** (v16+)
- **npm** or **Yarn**

### 📦 Installation

1. **Clone the repo**:

   ```bash
   git clone https://github.com/your-username/learning-tracker.git
   cd learning-tracker
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the dev server**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Visit the app** at `http://localhost:3000` 🎉

---

## 🗂️ Project Structure

```bash
src/
├── components/
│   ├── Auth.jsx         # Login / Signup UI
│   ├── Dashboard.jsx    # Main user dashboard
│   ├── Sidebar.jsx      # Navigation panel
│   ├── ThemeToggle.jsx  # Light/Dark mode toggle
│
├── store/
│   ├── authStore.js     # Zustand store for auth
│   ├── themeStore.js    # Zustand store for theme
└── App.jsx              # Root component
```

---

## 🔐 Usage Guide

### ✨ Authentication

- Users can **sign up** and **log in** securely.
- After login, users are redirected to their **dashboard**.
- Logging out brings users back to the login screen.

### 🧠 Dashboard

- Track skills, view goals, and monitor learning progress.
- This is the main landing page after login.

### 🌙 Theme Toggle

- Easily switch between **dark** and **light** themes from the header.

---

## 🌍 Deployment

To deploy on platforms like **Netlify**, **Vercel**, or **Heroku**:

1. **Build your app**:

   ```bash
   npm run build
   ```

2. **Deploy the `dist/` folder** to your chosen platform.

---

## 🧩 Troubleshooting

### Common issues:

- ❌ *Missing dependencies?*
  ```bash
  npm install
  ```
- ❌ *Port already in use?*
  ```bash
  npm run dev -- --port 3001
  ```

---

## 🤝 Contributing

We welcome contributions! 🛠️

### How to contribute:

1. Fork the repo.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -am "Add your feature"
   ```
4. Push your branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Create a pull request.

---

## 📝 License

Distributed under the **MIT License**. See `LICENSE` for more details.

---

> Designed to keep learners focused, goal-driven, and always improving. 💪🚀
