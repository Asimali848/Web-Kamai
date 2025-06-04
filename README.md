
# 🧭 Quest-Board

**Quest-Board** is a task management frontend built with **React**. It enables uploaders to post tasks, users to complete them, and admins to review submissions. Approved tasks reward users with points, encouraging accountability and engagement through a rewarding experience.

---

## 🚀 Features

- 📥 Uploaders submit tasks for users
- ✅ Admins approve or reject completed tasks
- 🎮 Users earn points for approved tasks
- 🔄 Smooth workflow with a gamified touch
- 🔐 Modular components ready for backend integration

---

## 📦 Tech Stack

- **React** (Frontend UI)
- **React Router** for navigation
- **Tailwind CSS** or custom styling
---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Abdul-Ikram/Quest-Board-FrontEnd.git
cd Quest-Board-FrontEnd
```

### 2. Install Dependencies

Make sure you have [Node.js](https://nodejs.org/) installed.

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Or if using Create React App:

```bash
npm start
```
----------

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
----------
## 📌 Contributing

Pull requests are welcome! Please ensure any changes follow the current coding style and include relevant updates.
