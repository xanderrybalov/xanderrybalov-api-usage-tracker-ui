```md
# 📊 API Usage Tracker UI

**Frontend interface for the API metering SaaS platform.**  
Built with [Vite](https://vitejs.dev/), [React](https://reactjs.org/), and [Material UI](https://mui.com/). Connects to a Fastify + PostgreSQL backend to track API usage, billing, and Stripe events.

---

## 🚀 Features

- 🔐 Email-based registration with auto-generated `apiKey`
- 📈 Dashboard with event logging and usage history
- 💳 Billing portal (Stripe Checkout & Customer Portal)
- ⚡️ Live webhook event tracking (Stripe)
- 📦 Responsive UI with Material UI & custom theming
- 🔧 Axios-based API layer

---

## ⚙️ Getting started

### 1. Clone & install dependencies

```bash
git clone https://github.com/your-org/api-usage-tracker-ui.git
cd api-usage-tracker-ui
npm install
````

### 2. Configure environment

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:3000
```

> Make sure the backend is running locally at that address.

### 3. Run the development server

```bash
npm run dev
```

Frontend will be available at:
➡️ `http://localhost:5173`

---

## 🔌 API Integration

All API requests are handled via `axios` in `api/client.ts`.
Backend endpoints expected:

* `POST /register` → `{ email }` → returns `{ apiKey }`
* `POST /usage` → `{ apiKey, eventType }`
* `GET /usage?apiKey=...` → returns usage list
* `POST /billing/portal` → redirects to Stripe portal
* `GET /webhook/logs` → returns Stripe event logs

---

## 🧠 Dev Notes

* Registration via email creates user and `apiKey`
* Key is stored in `localStorage` and passed to all requests
* Dashboard auto-filters by current `apiKey`
* Light authentication logic is handled in `AuthForm.tsx`

---

## 🛠️ TODO

* [ ] Add dark mode toggle
* [ ] Group events by type in Dashboard
* [ ] Add charts (`@mui/x-charts`)
* [ ] Role-based admin interface
* [ ] Unit tests with Vitest or Jest

---

## 📄 License

MIT — © 2025 Xander Rybalov
