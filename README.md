# 🍽️ Hush Lush Restaurant & Authentication Web App

> A functional, pixel-precise, responsive web application faithfully converting Figma UI designs into an interactive dining and ordering platform.

---

## 🚀 Live Demo & Repository

- **GitHub Repository**: Ready to push to `https://github.com/<your-username>/hush-lush-restaurant-app`
- **Live Deployment**: Ready for immediate deployment via [Vercel](https://vercel.com) or [Netlify](https://netlify.com) using standard Vite configuration.
- **Interactive Local Preview**: Can be run locally via `npm run dev` or opened directly in any modern web browser.

---

## 🔑 Test Credentials (Mock Authentication)

You can authenticate using the pre-configured demo account or by clicking the **"Fill Demo Credentials"** button on the login screen:

| Field | Value | Notes |
| :--- | :--- | :--- |
| **Email** | `demo@hushlush.com` | Standard test account |
| **Password** | `Password123` | Minimum 6 chars, alphanumeric |
| **Guest Access** | Tap **"Sign as Guest"** | Instant passwordless access to Table 13 |
| **Social Login** | Facebook, Telegram, Google | 1-Click mock OAuth integration |

*Note: Any standard RFC-compliant email and password of 6+ characters will also successfully authenticate for testing flexibility.*

---

## 📱 Features Completed

### Task 1 — Implement the Login Screen
- [x] **Figma-Accurate Monogram**: Red stylized intertwined "HL" logo with feathered wing flourish.
- [x] **Branding Typography**: Bold serif "Hush Lush" with red uppercase "ADVERTISING & TECHNOLOGIES".
- [x] **Partner Headline**: *"Warely Pass Grants Access to Log in at any of Our Partnered Restaurants."*
- [x] **Input Fields**: "Email" (Mail ID) and "Password" with rounded input containers, placeholder text, and active states.
- [x] **Password Visibility Toggle**: Interactive eye / eye-off toggle icon.
- [x] **Input Mode Switcher**: "Use Mobile Number Instead" / "Use Email-ID Instead" toggle link.
- [x] **Divider**: Styled "Or" text divider.
- [x] **Social Login Row**: Brand-accurate icons for Facebook, Telegram, and Google.
- [x] **Terms & Privacy**: "By ordering, You have Read and Agreement to Our Terms of Use and Privacy Policy" with interactive legal modals.
- [x] **Primary Action**: Full-width crimson red "Submit" button with hover, active, and loading spinner states.
- [x] **Footer**: "Powered By Hush Lush" with subtle geometric background watermark.

### Task 2 — Email and Password Validation
- [x] **Email Format Validation**: RFC 5322 regex validation checking domain, `@` symbol, and empty state.
- [x] **Password Validation**: Enforces minimum 6 characters and alphanumeric complexity.
- [x] **Real-time Feedback**: Field-level validation on blur and on submit with clear red badges and assistive text.
- [x] **Whitespace Trimming**: Automatic trimming of accidental leading/trailing spaces.
- [x] **Loading & Disabled States**: Prevents duplicate submissions during authentication latency.

### Task 3 — Authentication Logic
- [x] **State Management**: Robust `AuthContext` managing authentication tokens, session data, and user profile.
- [x] **Session Persistence**: Persists user session in `localStorage` across page reloads.
- [x] **Logout Workflow**: Complete logout action in Account screen returning to the login gate.
- [x] **Simulated Network Latency**: Realistic 600ms network response with loading spinner.
- [x] **Social SSO**: Mock OAuth logins for Facebook, Telegram, and Google.

### Task 4 — Guest Access
- [x] **One-Click Bypass**: "Sign as Guest" instantly logs user in as a guest diner assigned to Table 13 (4 PAX).
- [x] **Guest Badge**: Clear "GUEST" tag in user profile with option to upgrade or register an account.
- [x] **Full Ordering Privileges**: Guests can browse, search, customize dishes, and send orders to the kitchen.

### Task 5 — Implement the Restaurant Home Screen
- [x] **Figma Header**:
  - Elevated white card badge displaying the red HL logo.
  - Interactive table indicator: **"Table 13 (4 PAX)"** with table & party-size switcher modal.
  - Search button opening real-time fuzzy search overlay.
- [x] **Hero Promotional Banner**:
  - Appetizing crispy flying chicken nuggets / tenders with warm golden embers.
  - Elegant cursive script: *"UAE New Year Promo"*.
  - Subtitle: *"From March 1 to April 1"*.
  - 5-dot carousel indicator with active elongated white pill.
  - Auto-play carousel with additional seasonal banners.
- [x] **Horizontal Category Pills**:
  - Scrollable categories: "For You", "Chicken Chop", "Fish", "Burger", "Briyani", "Platters", "Beverages".
  - Active red pill state (`#E52E2E`) with smooth filtering of menu cards.
- [x] **2-Column Food Card Grid**:
  - **103 Black Pepper Chicken Chop** ($6.90)
  - **Chicken Dum Briyani** ($10.02)
  - **Mandi Kozhi Porichu Briyani** ($14.50)
  - **Chicken Spicy Tikka Masala** ($12.80)
  - **Crispy Golden Zinger Burger** ($8.50)
  - **Mediterranean Grilled Fish Fillet** ($13.20)
  - Floating `+` quick-add button on each photo.
  - Card footer with light pink background (`#FFF5F5`), bold red price, and red arrow `->`.
- [x] **Floating Action Button (Cart)**:
  - Translucent circular dark button with shopping cart icon and dynamic badge counter.
- [x] **Cart Drawer & Checkout**:
  - Slide-in side drawer displaying selected dishes, notes, and quantities.
  - Live calculation of Subtotal, UAE VAT (5%), and Total.
  - "Place Table Order" action that dispatches to kitchen with live status tracking.
- [x] **Bottom Navigation Bar**:
  - 4 tabs: **Outlet**, **Menu**, **Account**, **More**.
  - Red active tab indicator and branding footer bar.

### Task 6 — Micro-Interactions and Animations
- [x] Smooth slide-in and fade-in animations on modals and drawers.
- [x] Floating `+` button bounce and checkmark confirmation on tap.
- [x] Cart badge scale pop when items are added.
- [x] Toast notifications alerting users to cart updates and waiter requests.
- [x] Eye toggle animation for password field.
- [x] Interactive device frame switcher (📱 Mobile Frame vs 💻 Fluid Responsive).

### Task 7 — Code Quality and Responsiveness
- [x] **Modular Architecture**: Clean separation between presentation components, state contexts, data layers, and utility helpers.
- [x] **TypeScript**: 100% typed interfaces for all models and props.
- [x] **Comprehensive Test Suite**: Vitest unit tests verifying email/password validation and cart/tax calculations.
- [x] **Responsive**: Optimized for mobile phones (375px - 430px), tablets, and desktop displays.

---

## 🛠️ Project Structure

```
hush-lush-restaurant-app/
├── public/                     # Static assets & icons
├── src/
│   ├── components/
│   │   ├── account/            # AccountScreen & Profile
│   │   ├── auth/               # LoginScreen (Figma 1)
│   │   ├── cart/               # CartDrawer & checkout
│   │   ├── common/             # Header, BottomNav, Toast, LegalModal
│   │   ├── home/               # RestaurantHomeScreen (Figma 2), HeroBanner, FoodCard, Modals
│   │   ├── more/               # MoreScreen & settings
│   │   └── outlet/             # OutletScreen & bistro info
│   ├── context/
│   │   ├── AuthContext.tsx     # Mock authentication & guest state
│   │   └── CartContext.tsx     # Cart, orders, and table state
│   ├── data/
│   │   └── mockData.ts         # Food menu, promos, and restaurant data
│   ├── tests/
│   │   ├── auth.test.ts        # Auth unit tests
│   │   ├── cart.test.ts        # Cart & tax calculation tests
│   │   └── validation.test.ts  # Form validation tests
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   ├── utils/
│   │   └── validation.ts       # Regex and security helpers
│   ├── App.tsx                 # App root with device frame switcher
│   ├── index.css               # Tailwind CSS & custom styling
│   └── main.tsx                # React DOM entrypoint
├── index.html                  # HTML template with Google Fonts
├── netlify.toml                # Netlify deployment configuration
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # Brand color tokens & typography
├── tsconfig.json               # TypeScript compiler config
├── vercel.json                 # Vercel deployment configuration
└── vite.config.ts              # Vite bundler config
```

---

## 💻 Local Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

### 3. Run Unit Tests
```bash
npm test
```

### 4. Build for Production
```bash
npm run build
```

---

## ☁️ Deployment Instructions

### Deploy to Vercel
1. Push your repository to GitHub.
2. Log in to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset will automatically detect **Vite**.
5. Click **"Deploy"**. The app will be live with a permanent URL.

### Deploy to Netlify
1. Connect your repository at [netlify.com](https://netlify.com).
2. Set Build Command: `npm run build`
3. Set Publish Directory: `dist`
4. Click **"Deploy site"**.

---

## ⚠️ Known Limitations & Future Enhancements

- **Payment Gateway**: Currently simulates contactless table billing (payable via card/cash with floor waiter). Stripe/Apple Pay integration can be added.
- **Backend Persistence**: Uses browser `localStorage` for session and order persistence. Can be hooked to a PostgreSQL / Supabase backend.
- **Push Notifications**: Kitchen status notifications currently use in-app toasts; web push notifications can be integrated for guest phone alerts.

---

*Designed and developed for Hush Lush Partnered Restaurants.*
