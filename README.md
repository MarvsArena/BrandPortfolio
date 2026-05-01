# MarvsTech Portfolio Website

Official portfolio and agency website for MarvsTech - a digital solutions brand helping businesses build, manage, and grow their online presence.

## Tech Stack
- HTML5, CSS3, Vanilla JavaScript
- EmailJS (contact form)
- LocalStorage-powered light and dark mode
- Hosted on Vercel

## Project Structure
```text
marvstech/
├── index.html
├── services.html
├── portfolio.html
├── about.html
├── contact.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   ├── logo.png
│   ├── founder.jpg
│   └── projects/
│       ├── omdhairville.png
│       ├── kickshub.png
│       ├── lushnest.png
│       ├── marvsassists.png
│       ├── lulumari.png
│       └── bettermart.png
└── README.md
```

## Pages
- **Home** (index.html) - Hero, service overview, differentiators, featured work, CTA
- **Services** (services.html) - Full long-form service landing sections with sticky service navigation
- **Portfolio** (portfolio.html) - Project showcase with service-line filter categories
- **About** (about.html) - Brand story, founder profile, beliefs, values
- **Contact** (contact.html) - Contact form, direct contact details, FAQ accordion

## Features
- Dual-theme light and dark mode with persisted preference
- Particle hero background and scroll-triggered reveal animations
- Sticky service navigation on the services page
- Portfolio filtering by service line
- FAQ accordion on the contact page
- Expanded social platform links for Instagram, Facebook, TikTok, LinkedIn, and X

## Setup & Deployment

### Local Development
No build tools required. Open any `.html` file directly in a browser, or use a local server:
```bash
npx serve .
```

### EmailJS Configuration
1. Create an account at https://emailjs.com
2. Create an Email Service and note the **Service ID**
3. Create an Email Template and note the **Template ID**
4. Get your **Public Key** from Account settings
5. Replace the placeholders in `contact.html` and `assets/js/main.js`:
   - `[PASTE_PUBLIC_KEY_HERE]`
   - `[PASTE_SERVICE_ID_HERE]`
   - `[PASTE_TEMPLATE_ID_HERE]`

### Deploying to Vercel
1. Push project to a GitHub repository
2. Go to https://vercel.com and import the repository
3. No build configuration needed - Vercel serves static files automatically
4. Assign your custom domain in Vercel project settings

## Assets Required
Place the following files before running:
- `assets/logo.png` - MarvsTech logo (transparent background)
- `assets/founder.jpg` - Professional founder photograph
- `assets/projects/omdhairville.png`
- `assets/projects/kickshub.png`
- `assets/projects/lushnest.png`
- `assets/projects/marvsassists.png`
- `assets/projects/lulumari.png`
- `assets/projects/bettermart.png`

## Brand Colors
| Token | Hex |
|---|---|
| Background Primary | #000000 |
| Background Secondary | #0d0d0d |
| Surface Card | #111111 |
| Text Primary | #ffffff |
| Pink Accent | #f23980 |
| Pink Light | #ff6eb4 |

## Contact
- Email: marvstechhq@gmail.com
- WhatsApp: +234 803 495 3157

---
© 2026 MarvsTech. All rights reserved.
