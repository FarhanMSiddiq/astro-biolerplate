# Astro Template

## 📌 Overview

Astro template dengan **PostgreSQL** sebagai database dan **daisyUI** untuk UI, mendukung fitur berikut:

- ✅ Login
- ✅ CRUD User
- ✅ CRUD Role
- ✅ CRUD Permission
- ✅ Assign User, Role, dan Permission

## 🛠 Tech Stack

- **Node.js**: v20.18.2
- **pnpm**: v10.2.1
- **Astro**: v5.2.5
- **UI**: daisyUI
- **Database**: PostgreSQL

## 🚀 Project Structure

Di dalam proyek Astro Anda, Anda akan melihat folder dan file berikut:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Untuk mempelajari lebih lanjut tentang struktur folder dalam proyek Astro, silakan merujuk ke [panduan struktur proyek](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

Semua perintah dijalankan dari root proyek melalui terminal:

| Perintah                   | Aksi                                                        |
| :------------------------- | :---------------------------------------------------------- |
| `pnpm install`             | Menginstal dependensi                                       |
| `pnpm run dev`             | Menjalankan server pengembangan di `localhost:4321`         |
| `pnpm run build`           | Membangun situs produksi ke `./dist/`                       |
| `pnpm run preview`         | Pratinjau build secara lokal sebelum dideploy               |
| `pnpm run astro ...`       | Menjalankan perintah CLI seperti `astro add`, `astro check` |
| `pnpm run astro -- --help` | Mendapatkan bantuan penggunaan Astro CLI                    |

## Migration

Kita menggunakan TypeORM untuk migrasi. Jika Anda ingin mempelajari lebih lanjut, silakan kunjungi https://typeorm.io/

```bash
# Create migration
pnpm run migration:create {nama}
# Run to build migration
pnpm run migration:build
# Run migration
pnpm run migration:run
# Rollback migration
pnpm run migration:rollback
```

## 🚀 Getting Started

### 1️⃣ Install Dependencies

```sh
pnpm install
```

### 2️⃣ Setup Database

1. Jalankan command:

```bash
docker-compose -f docker-compose.yml up -d
```

2. setelah database terinstall di docker, setup dan running migration dengan command :

```bash
# Build migration
pnpm run migration:build
# Run migration
pnpm run migration:run
```

3. setup .env untuk koneksi database

### 3️⃣ Run Development Server

```sh
pnpm run dev
```

Akses di `http://localhost:4321`

### 4️⃣ Build for Production

```sh
pnpm run build
```

### 5️⃣ Start Production Server

```sh
pnpm run preview
```

## 🐳 Run For Docker

```bash
# Build Docker
docker build --no-cache -t astro-template .
# Docker Run
docker run --env-file=.env -dp 4321:4321 astro-template
```
