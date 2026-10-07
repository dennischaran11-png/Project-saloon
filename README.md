# LumiSalon — Smart Salon Queue Management System

A modern, responsive web application for managing salon walk-in customers, live service queues, staff assignments, estimated wait times, and business analytics.

---

## 🌟 Key Features

### 1. 🔐 Authentication & Session
- Elegant branded login page with salon styling.
- Pre-filled demo credentials:
  - **Email**: `admin@lumisalon.com`
  - **Password**: `admin123`
- Show/Hide password toggle & remember me preference.

### 2. 📊 Live Dashboard & Real-Time Analytics
- **Live KPI Metric Cards**:
  - Total Customers Today
  - Waiting Customers Count
  - Currently In-Service Count
  - Available Staff Capacity
  - Completed Services
  - Average Wait Time (Dynamic calculation)
- **Interactive Charts** powered by Chart.js:
  - *Today's Service Mix* (Interactive doughnut chart)
  - *Hourly Customer Flow Trend* (Smooth line chart)
- Quick-access Live Queue widget and Staff Status roster.

### 3. ⏱️ Real-Time Queue Management
- **Status Lifecycle Workflow**:
  - `Waiting` ➔ `Called` ➔ `In Service` ➔ `Completed` (or `Cancelled`)
- **Priority Tiering**: Normal, Priority, and VIP flags.
- **Smart Wait Time Estimator**: Dynamically calculates estimated wait times based on pending service duration and active staff capacity.
- **Quick Staff Assignment**: One-click staff modal to assign available stylists.
- **Filtering & Search**: Instant filter by status (All, Waiting, Called, In Service, Completed) and search by customer name/phone/ticket.
- **Responsive Views**: Full data table on desktop, card layout on mobile.

### 4. 👥 Customer Registry & Profiles
- Customer directory with visit count, favorite service, total revenue contribution, and last visit date.
- Instant search and direct "Add to Queue" action.

### 5. 💇 Services Catalog & Management
- Categorized services: Hair, Skin, Nails, Wellness, Bridal Makeup.
- Manage service durations, pricing in INR (₹), and active/inactive status.
- Add / Edit / Delete service modals.

### 6. 🧑‍💼 Staff Roster & Workload
- Multi-status staff management (`Available`, `Busy`, `On Break`, `Offline`).
- Track services served today and current assigned ticket.
- Add / Edit staff modal with specialization tags.

### 7. 📈 Service History & Business Reports
- Detailed transaction log with customer, service, assigned stylist, duration, revenue, and 5-star ratings.
- Reports view featuring:
  - Daily revenue metrics and average ticket size.
  - Category breakdown chart.
  - Peak hours analysis line chart.
  - Date range filters (Today, This Week, This Month).

### 8. 📺 Waiting Area TV / Display Mode
- High-contrast kiosk view suitable for salon lobby screens.
- Live ticking digital clock.
- "Now Serving" prominent ticket card.
- Upcoming queue ticker with next customer numbers.

### 9. 📱 Customer "Track My Queue" Portal
- Customers can enter their Ticket ID (e.g. `Q-104`) to view:
  - Live status badge.
  - Estimated wait time remaining.
  - Queue position and number of people ahead.
  - Visual 4-step journey progress bar (`Joined` ➔ `Waiting` ➔ `In Service` ➔ `Done`).

### 10. ⚙️ Settings & Customization
- Salon open / closed toggle switch.
- Theme selector (Light / Dark / Warm Beige).
- Live accent color picker (Champagne Gold, Rose, Emerald, Slate Blue, Amber).

---

## 🚀 How to Run Locally

No build tools or installations are required! The application is built with vanilla HTML5, CSS3, and modern JavaScript.

### Option 1: Direct File Launch
Simply double-click `index.html` or open it in any web browser:
```
file:///c:/Users/ASUS/Desktop/saloon project/index.html
```

### Option 2: Live Server / HTTP Server
If you have Python installed:
```powershell
python -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

---

## 🎨 Design System & Palette: "Mystical Fairy Tale"

- **Mystic Charcoal Black** (`#1E2026`): Luxury dark panels, typography, and contrast kiosk screens.
- **Crimson Velvet Burgundy** (`#8B1E19` / `#A82D27`): Signature brand accent, buttons, badges, highlights, and primary chart curves.
- **Warm Ivory Cream** (`#FAF4EB` / `#F7F2E9`): Soft, elegant backgrounds and card surfaces with subtle borders.
- **Typography**: Google Fonts (*Inter* for UI readability, *Playfair Display* for luxury salon branding).
- **Icons**: FontAwesome 6.5.
- **Visuals**: Glassmorphism, subtle shadows, refined micro-transitions, and responsive mobile-first grid layouts.
