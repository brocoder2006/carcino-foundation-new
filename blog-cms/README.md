# ApexPulse — Premium Headless Blog CMS

ApexPulse is a production-oriented, full-stack **Headless Content Management System (CMS) for blog publishing**. It features a decoupled architecture with a **Python Django + Django REST Framework** backend API server and a high-performance **Next.js App Router (TypeScript)** frontend application.

---

## 🌟 Key Features

### 🖥️ Public-Facing Blog Site
- **Server Components (SSR/ISR)** for fast rendering and optimal SEO performance.
- **Dynamic Category & Tag Filtering**, real-time search, and pagination.
- **Article Detail Pages** with Tiptap AST node parsing, estimated reading times, author metadata, related articles, and OpenGraph/canonical metadata.

### 🎨 Custom Editorial Admin Dashboard
- **Modern SaaS Dashboard**: Custom-built UI (not Django Admin), focused on usability, visual hierarchy, and performance.
- **Real-Time Analytics**: Genuine backend metrics tracking total posts, published articles, drafts, and scheduled items.
- **Rich-Text Editor (Tiptap Integration)**:
  - Custom toolbar supporting Headings (H1, H2, H3), Bold, Italic, Underline, Bullet/Numbered Lists, Blockquotes, Code Blocks, Links, and Image uploads.
  - Image preview, replacement, and Cloudinary media upload integration.
  - Live preview drawer and structured JSON storage in PostgreSQL.
- **Role-Based Access Control (RBAC)**:
  - `ADMIN`: Full system control, role permissions, and user account management.
  - `EDITOR`: Full content management, publishing, scheduling, category/tag CRUD.
  - `AUTHOR`: Restricted to creating and managing their own articles.
- **Revision History**: Automatic snapshot creation on post edits with one-click restore.
- **Automated Publication Scheduling**: Idempotent scheduling background tasks and CLI commands.

---

## 🏗️ Technology Stack

### Backend
- **Python 3.10+ / Django 5.1+**
- **Django REST Framework (DRF)**
- **PostgreSQL** (with SQLite fallback for local development)
- **Pillow** (Image validation and processing)
- **Cloudinary SDK** (Media storage)
- **WhiteNoise & Gunicorn** (Production serving)

### Frontend
- **Next.js 14+ (App Router, React 18, TypeScript)**
- **Tailwind CSS & shadcn/ui design tokens**
- **Tiptap Rich-Text Editor (`@tiptap/react`)**
- **Lucide Icons**
- **Zod & React Hook Form**

---

## 📁 Directory Structure

```text
blog-cms/
├── backend/
│   ├── config/             # Django project settings, URLs, WSGI
│   ├── accounts/           # Custom User model (UUID, Admin/Editor/Author roles)
│   ├── blog/               # Post, Category, Tag, PostRevision models & APIs
│   │   └── management/     # CLI commands (publish_scheduled_posts, seed_data)
│   ├── requirements.txt
│   ├── manage.py
│   ├── build.sh            # Render production build script
│   └── .env.example
├── frontend/
│   ├── app/
│   │   ├── (public)/       # Public blog site (Home, All Articles, Detail, Category, Search)
│   │   ├── (auth)/         # Login page
│   │   └── dashboard/      # Custom Admin Dashboard (Overview, Posts, Editor, Categories, Tags, Authors, Settings)
│   ├── components/
│   │   ├── blog/           # Public UI components
│   │   ├── dashboard/      # Sidebar, Header, Admin UI components
│   │   └── editor/         # Tiptap rich-text editor component
│   ├── lib/
│   │   ├── api.ts          # Typed REST API client
│   │   ├── auth.tsx        # Authentication context & state
│   │   ├── types.ts        # TypeScript interfaces
│   │   └── utils.ts        # Date formatters, Tiptap AST parser, reading time
│   ├── package.json
│   ├── tailwind.config.js
│   └── .env.example
├── README.md
└── .gitignore
```

---

## ⚡ Quick Start & Local Setup

### 1. Backend Setup (Django)

```bash
cd backend

# 1. Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 2. Install requirements
pip install -r requirements.txt

# 3. Apply database migrations
python manage.py migrate

# 4. Seed initial accounts & demo posts
python manage.py seed_data

# 5. Run Django REST API server
python manage.py runserver
```

> The REST API server will run at `http://127.0.0.1:8000/api/v1/`.

### 🔑 Pre-Configured Demo Accounts (From Seed):

| Role | Username | Password | Permissions |
|---|---|---|---|
| **Admin** | `admin` | `admin123` | Full control, User & Role Management, All Posts |
| **Editor** | `editor` | `editor123` | Publish, Schedule, Edit All Posts, Category/Tag CRUD |
| **Author** | `author` | `author123` | Create & Edit Own Posts |

---

### 2. Frontend Setup (Next.js)

```bash
cd frontend

# 1. Install dependencies
npm install

# 2. Copy environment file
cp .env.example .env.local

# 3. Start Next.js development server
npm run dev
```

> Open `http://localhost:3000` to view the public blog site.
> Open `http://localhost:3000/login` to log into the custom editorial dashboard.

---

## 🧪 Running Automated Tests

### Backend Unit Tests (Django)

```bash
cd backend
./venv/bin/python manage.py test
```

> Runs 14 comprehensive tests covering custom user roles, login/logout, post privacy, slug collisions, author isolation, and scheduled publishing.

### Frontend Production Build Check (Next.js)

```bash
cd frontend
npm run build
```

---

## ⏰ Scheduled Posts Publishing

To publish articles scheduled for a specific date/time, execute the management command:

```bash
cd backend
python manage.py publish_scheduled_posts
```

In production, set up a cron job or Celery task to run `python manage.py publish_scheduled_posts` every 5–15 minutes.

---

## 🚀 Deployment Guide

### 1. Backend Deployment (Render & Neon PostgreSQL)

1. **Database (Neon PostgreSQL)**:
   - Create a project on [Neon.tech](https://neon.tech).
   - Copy the Connection String URL (`postgresql://user:password@ep-xxx.neon.tech/neondb?sslmode=require`).

2. **Web Service (Render)**:
   - Connect your repository on [Render.com](https://render.com).
   - Select **Web Service**, environment **Python**.
   - Build Command: `./build.sh`
   - Start Command: `gunicorn config.wsgi:application`
   - Set Environment Variables:
     - `DATABASE_URL`: Your Neon connection string.
     - `SECRET_KEY`: Long random string.
     - `DEBUG`: `False`
     - `ALLOWED_HOSTS`: `your-app.onrender.com`
     - `CORS_ALLOWED_ORIGINS`: `https://your-frontend.vercel.app`
     - `CSRF_TRUSTED_ORIGINS`: `https://your-frontend.vercel.app`
     - `CLOUDINARY_CLOUD_NAME`: (Optional for persistent media uploads)
     - `CLOUDINARY_API_KEY`: (Optional)
     - `CLOUDINARY_API_SECRET`: (Optional)

---

### 2. Frontend Deployment (Vercel)

1. Import your project directory into [Vercel](https://vercel.com).
2. Set Root Directory to `frontend`.
3. Set Environment Variables:
   - `DJANGO_API_URL`: `https://your-app.onrender.com`
   - `NEXT_PUBLIC_DJANGO_API_URL`: `https://your-app.onrender.com`
   - `NEXT_PUBLIC_SITE_URL`: `https://your-frontend.vercel.app`
4. Deploy!

---

## 📄 License & Credits

Built as an enterprise-grade Headless Blog CMS using **Django REST Framework** and **Next.js App Router**.
