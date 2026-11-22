# 🦷 SmileSpectrum Dental: prototype clinic website

**Live demo:** https://anjali-bhushan.github.io/smilespectrum/

> ⚠️ **Prototype, not a real clinic.** SmileSpectrum Dental is fictional. All doctors, timings and feedback are sample content, and bookings made on the site are **not real appointments**.

A multi-speciality dental clinic website where patients can explore treatments by department, meet the specialists, book an appointment, receive a confirmation and read or leave feedback.

## Features
| Page | What it does |
|---|---|
| 🏠 Home | Hero, clinic stats, colourful department tiles, how booking works, featured feedback |
| 🏥 Departments (8) | Conservative & Endodontics (RCT), Orthodontics, Pediatric, Prosthodontics, Periodontics, Oral Surgery, Oral Medicine & Radiology, Cosmetic. **Each has its own colour theme**, treatments (51 in total), specialists and feedback |
| 👩‍⚕️ Specialists | 9 fictional profiles, filterable by department, with a "Book with…" button |
| 📅 Booking | Department → specialist → treatment → date (no Sundays; checks the specialist's working days) → time slot → contact details |
| ✅ Confirmation | Booking ID, "Email me a copy", and an **Add to calendar (.ics)** download |
| 📧 Email (optional) | With Google Apps Script connected, bookings go to a Google Sheet, the clinic gets an email and the patient gets a confirmation, with a daily email cap |
| 📋 My bookings | Dashboard of the visitor's bookings: totals, upcoming, cancelled, a by-department chart, cancel option |
| ⭐ Feedback | Average rating, filter by department, sample reviews (clearly labelled) and a form to add your own |
| 🧪 Prototype notice | Full disclaimer page |

## Responsible design
- Clinic, doctors and feedback are **fictional and labelled** as such on every page.
- Bookings show **"not a real appointment"** on screen and in emails.
- The booking form asks users **not to share medical history**.
- Treatment descriptions are general information, **not medical advice**.

## Tech
HTML, CSS and JavaScript (no frameworks) · single-page hash routing · browser localStorage · GitHub Pages · optional Google Apps Script (Sheets + Gmail).

| File | Purpose |
|---|---|
| `index.html` | Layout, prototype banner, navigation, footer |
| `style.css` | Design and department colours |
| `data.js` | Departments, treatments, fictional specialists, sample feedback |
| `app.js` | Pages, booking, confirmations, calendar invite, feedback, dashboard |
| `apps-script-booking.gs` | Optional: saves bookings to a Google Sheet and sends emails |

---
Built by **Anjali Bhushan** · IIM Kozhikode
