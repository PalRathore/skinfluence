<div align="center">

<img src="Skinfluence/overall%20final/Homepage/skinfluence_logo-removebg-preview.png" alt="Skinfluence Logo" width="200"/>

# Skinfluence

### Your Trusted Partner in Skin Health

_Excellence in Dermatological Care Since 2010_

<br/>

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

[View Demo](#getting-started) · [Report Bug](../../issues) · [Request Feature](../../issues)

</div>

---

## Table of Contents

- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Pages & Modules](#pages--modules)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## About The Project

**Skinfluence** is a full-featured, responsive web application for a premier dermatology clinic located in Indore, India. The platform serves as a comprehensive digital interface between the clinic and its patients — enabling online appointment scheduling, doctor profile exploration, secure user authentication, and streamlined clinic management.

Built with a focus on **user experience**, **accessibility**, and **modern design principles**, Skinfluence delivers a seamless journey from patient discovery to appointment confirmation.

### Mission
> To provide exceptional dermatological care that enhances the health and appearance of our patients' skin, improving their quality of life and confidence.

### Vision
> To be the leading dermatology center known for innovative treatments, compassionate care, and outstanding patient outcomes.

---

## Key Features

<table>
<tr>
<td width="50%">

### Smart Appointment Booking
- Interactive doctor selection with profile cards
- Dynamic calendar with real-time availability
- Time slot picker with unavailability indicators
- Instant booking summary & confirmation

</td>
<td width="50%">

### Doctor Profiles
- Comprehensive profiles with tabbed navigation
- Qualifications timeline with education history
- Patient reviews & ratings (4.8–4.9 ★)
- Specialization listings

</td>
</tr>
<tr>
<td width="50%">

### Secure Authentication
- User login & registration system
- Social login integration (Google, Facebook)
- Session-based auth service
- Profile management with dropdown menu

</td>
<td width="50%">

### Admin Dashboard
- Centralized clinic management panel
- Appointment oversight & scheduling
- Patient data management
- Operational analytics

</td>
</tr>
<tr>
<td width="50%">

### Payment Integration
- Secure payment processing for consultations
- Booking fee management
- Payment confirmation flow

</td>
<td width="50%">

### Responsive Design
- Mobile-first, fully responsive layouts
- Parallax scrolling & micro-animations
- Animated statistics counters
- Auto-advancing testimonial carousel

</td>
</tr>
</table>

---

## Tech Stack

| Layer | Technology | Purpose |
|:---:|:---|:---|
| **Structure** | HTML5 | Semantic markup & page structure |
| **Styling** | CSS3 | Custom styling, animations, parallax effects, responsive layouts |
| **Logic** | JavaScript (ES6) | DOM manipulation, authentication, interactive components |
| **Framework** | AngularJS 1.8 | Booking module — two-way data binding, dynamic calendar rendering |
| **Utility** | Moment.js 2.29 | Date formatting, calendar navigation & manipulation |

---

## Architecture

```
Skinfluence/
│
├── 📁 Homepage/                   # Landing page
│   ├── index.html                 # Main entry point
│   ├── home.css                   # Global & homepage styles
│   ├── homepage.js                # Homepage interactions
│   └── assets                  # Logo, icons, hero images
│
├── 📁 about dr/                   # About Us & Doctor Profiles
│   ├── about dr.html              # Doctor profiles, testimonials, values
│   ├── about.css / aboutdr.css    # Page-specific styles
│   └── about_dr.js                # Modals, sliders, animated counters
│
├── 📁 bookings/                   # Appointment Booking System
│   ├── bookings.html              # AngularJS-powered booking interface
│   ├── bookings.js                # Booking controller & calendar logic
│   └── styles.css                 # Booking page styles
│
├── 📁 appointments/               # Patient Appointment Dashboard
│   └── my-appointments.html       # View & manage appointments
│
├── 📁 login/                      # Authentication — Login
│   ├── login.html                 # Login form with social auth
│   ├── login.css                  # Login page styles
│   └── login.js                   # Login validation & auth logic
│
├── 📁 registration/               # Authentication — Registration
│   ├── registration.html          # Registration form
│   ├── reg.css                    # Registration styles
│   └── reg.js                     # Form validation & submission
│
├── 📁 contactus/                  # Contact Page
│   ├── contactus.html             # Contact form & clinic info
│   ├── contactus.css              # Contact page styles
│   └── contactus.js               # Form handling & validation
│
├── 📁 payment/                    # Payment Processing
│   └── payment.html               # Payment interface
│
├── 📁 confirmation/               # Booking Confirmation
│   └── confirmation.html          # Appointment confirmation details
│
├── 📁 js/                         # Shared Modules
│   └── auth-service.js            # Authentication service (session mgmt)
│
├── admin.html                     # Admin Dashboard
├── myacc.html                     # My Account Page
├── privacy-policy.html            # Privacy Policy
└── terms-and-conditions.html      # Terms & Conditions
```

---

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, or Safari)
- *(Optional)* A local web server for full functionality

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/priyalllll/Skinfluence.git

# 2. Navigate to the project directory
cd Skinfluence

# 3. Start a local server (choose one)

# Option A: Python
python -m http.server 8000 --directory "Skinfluence/overall final"

# Option B: Node.js
npx http-server "Skinfluence/overall final"

# Option C: VS Code
# Install "Live Server" extension → Right-click index.html → "Open with Live Server"
```

Then open **`http://localhost:8000/Homepage/index.html`** in your browser.

> **💡 Tip:** Using a local server is recommended for proper asset loading and authentication features.

---

## 📑 Pages & Modules

| # | Page | Route | Description |
|:---:|:---|:---|:---|
| 1 | **Homepage** | `/Homepage/index.html` | Landing page — hero banner, features, FAQ, expert showcase, parallax CTA |
| 2 | **About Us** | `/about dr/about dr.html` | Clinic story, doctor profiles (tabbed modals), testimonials |
| 3 | **Bookings** | `/bookings/bookings.html` | 3-step appointment booking — doctor → date → time slot |
| 4 | **Contact Us** | `/contactus/contactus.html` | Contact form, phone, email, working hours |
| 5 | **Login** | `/login/login.html` | User authentication with email & social login |
| 6 | **Register** | `/registration/registration.html` | New user registration with form validation |
| 7 | **My Account** | `/myacc.html` | User profile management |
| 8 | **My Appointments** | `/appointments/my-appointments.html` | View, track & manage booked appointments |
| 9 | **Payment** | `/payment/payment.html` | Consultation fee processing |
| 10 | **Confirmation** | `/confirmation/confirmation.html` | Booking confirmation details & summary |
| 11 | **Admin Panel** | `/admin.html` | Clinic operations & management dashboard |
| 12 | **Privacy Policy** | `/privacy-policy.html` | Data handling & privacy information |
| 13 | **Terms & Conditions** | `/terms-and-conditions.html` | Usage terms & legal information |

---

## Design Philosophy

- **Professional Aesthetics** — Clean, medical-grade design with a calming blue color palette (`#1E3C72`)
- **Mobile-First** — Fully responsive layouts optimized for all screen sizes
- **Micro-Animations** — Smooth transitions, hover effects, and animated counters for engagement
- **Parallax Effects** — Immersive scrolling experience on the homepage
- **Accessibility** — Semantic HTML5, ARIA labels, keyboard-friendly navigation
- **Performance** — Lightweight architecture with minimal external dependencies

---

## Contributing

Contributions make the open-source community an incredible place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. **Fork** the project
2. **Create** your feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit** your changes
   ```bash
   git commit -m "feat: add your feature description"
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open** a Pull Request

---

## Contact

<div align="center">


**Email:** skinfluencewp@gmail.com

---

**© 2025 Skinfluence Dermatology. All rights reserved.**


</div>
