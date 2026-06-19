<div align="center">

# ⚡ ProEngine

### Smart Document Conversion & Compression Suite

A sleek, glassmorphic React dashboard for converting Word documents and images to PDF, compressing images on the fly, and managing your file history — backed by a secure Laravel API.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>

---

## 📖 About The Project

**ProEngine** is a client-side document processing engine wrapped in a modern, dark-themed UI. It lets authenticated users convert `.docx` files and images into PDFs, compress images directly in the browser, and keep track of every converted asset in a clean "System Registry" table — all communicating with a Laravel REST API for authentication and persistent file storage.

> ⚠️ **Note:** This repository contains the **frontend only**. A Laravel backend exposing the endpoints listed [below](#-expected-backend-api) must be running at `http://localhost:8000` for the app to function.

---

## ✨ Features

- 🔐 **Authentication** — Token-based Login / Register flow
- 📄 **Word → PDF** — Converts `.docx` files to PDF in-browser using Mammoth.js + html2pdf.js
- 🖼️ **Image → PDF** — Wraps any image into a styled PDF document
- 📉 **Image Compressor** — Client-side resizing & compression via the Canvas API
- 🗂️ **System Registry** — View, download, or delete previously converted files
- 🔔 **Toast Notifications** — Real-time feedback for every action
- 📊 **Live Upload Progress** — Animated progress bar during uploads
- 🎨 **Modern UI** — Glassmorphism, gradients, and smooth transitions powered by Framer Motion
- 📱 **Fully Responsive** — Works seamlessly across devices

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | [React 19](https://react.dev/) |
| Build Tool | [Vite](https://vite.dev/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Routing | [React Router DOM](https://reactrouter.com/) |
| HTTP Client | [Axios](https://axios-http.com/) |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Notifications | [React Hot Toast](https://react-hot-toast.com/) |
| DOCX Parsing | [Mammoth.js](https://github.com/mwilliamson/mammoth.js) |
| PDF Generation | [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) |

---

## 📂 Project Structure

```
pro-engine-react/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx          # Auth screen, Dashboard, Router
│   ├── App.css
│   ├── index.css         # Tailwind directives
│   └── main.jsx          # App entry point
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── eslint.config.js
└── package.json
```

---

## ⚙️ Prerequisites

- **Node.js** `>=18.x`
- **npm** (or yarn/pnpm)
- A running **Laravel backend** that implements the API contract below, served at `http://localhost:8000`

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/pro-engine-react.git
   cd pro-engine-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the dev server**
   ```bash
   npm run dev
   ```

4. **Open the app**

   Visit [http://localhost:5173](http://localhost:5173) in your browser.

   > Make sure your Laravel backend is already running on `http://localhost:8000`, otherwise login, registration, and file operations will fail.

---

## 🔌 Expected Backend API

The frontend is pre-wired (via Axios) to consume the following endpoints:

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/register` | Create a new user account |
| `POST` | `/api/login` | Authenticate and return a bearer token |
| `POST` | `/api/logout` | Invalidate the current session |
| `GET` | `/api/dashboard-data` | Fetch logged-in user info + conversion history |
| `POST` | `/api/save-client-pdf` | Upload a converted/compressed file |
| `GET` | `/api/download/:id` | Download a stored file |
| `DELETE` | `/api/delete/:id` | Permanently remove a stored file |

All authenticated requests send the token as `Authorization: Bearer <token>`.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## 🤝 Contributing

Contributions are welcome and appreciated!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 👤 Author

**Bilal**
🌐 Portfolio: [bilalcvmaker.lovestoblog.com](https://bilalcvmaker.lovestoblog.com)

---

<div align="center">

If you found this project useful, consider giving it a ⭐!

</div>
