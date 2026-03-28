
# Task Manager App

🌐 **Live Demo:** https://icn-test-phi.vercel.app/

- [Login](https://icn-test-phi.vercel.app/login)
- [Register](https://icn-test-phi.vercel.app/register)
- [Dashboard](https://icn-test-phi.vercel.app/dashboard)

A simple web-based task manager application for managing to-do lists (CRUD), with user authentication and form validation. Built using Next.js, React, Zustand, React Query, and Tailwind CSS.

## 🚀 Tech Stack
- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Zustand** (state management, persist auth)
- **React Query** (data fetching & caching)
- **Axios** (HTTP client)
- **Formik + Yup** (form & validation)
- **Sonner** (toast notification)

## ⚙️ Install and Run

1. **Clone repository**
	```bash
	git clone <repo-url>
	cd icn-test
	```

2. **Install dependencies**
	```bash
	npm install
	# atau
	yarn install
	```

3. **Create file environment**
	- Copy `.env.local.example` to `.env.local` if available, or ensure the following variables exist:
	  ```env
	  NEXT_PUBLIC_API_URL=https://icn-api.vercel.app
	  ```

4. **Run development server**
	```bash
	npm run dev
	# or
	yarn dev
	```
	open [http://localhost:3000](http://localhost:3000) in browser.
    open (http://localhost:3000/login) for login page to access dashboard.

5. **Build for production**
	```bash
	npm run build
	npm start
	```

## 📚 Main
- Register & Login user
- Persist login (token in localStorage)
- CRUD Task (Create, Read, Update, Delete)
- Validasi form (Formik + Yup)
- Notification (Sonner)
- UI minimalis & responsive (Tailwind)

---

> For questions or contributions, please create an issue or pull request in this repository.
