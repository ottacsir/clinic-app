# MediBook — Clinic Appointment Booking System
A Server-Side Rendered (SSR) web application for managing clinic appointments, built with Node.js, Express, EJS, and PostgreSQL.

GitHub Repository: https://github.com/ottacsir/clinic-app

## Group Members
Axumawit Hailay - Backend Cores (app.js, db.js, package.json, schema.sql) + README.md
Hermela Bezabih - Routes Part 1 (doctors, specialties, patients) 
Hildana Hailemariam - Routes Part 2 (appointments, prescriptions) + .env.example + .gitignore
Betelhem Tesfaye - Views Part 1 (index, doctors, patients, specialties)
Bezawit Bushe - Views Part 2 (appointments, prescriptions, partials, CSS) + Styling(style.css) 

## Features
- View, add, edit, and delete Doctors
- View, add, edit, and delete Patients
- Book appointments by selecting a patient, doctor, date, and time
- Update appointment status (pending, confirmed, cancelled, completed)
- Manage medical specialties and departments
- Add prescriptions and notes linked to appointments
- Shared layout via EJS partials (header/footer/navbar) for consistent UI
- Clean and responsive interface

## Technologies Used
- Node.js
- Express.js
- EJS (Embedded JavaScript Templates)
- PostgreSQL
- dotenv (environment configuration)
- method-override (PUT/DELETE support in HTML forms)

## Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v14 or higher)

## Installation & Setup
### 1. Clone the repository
git clone https://github.com/ottacsir/clinic-app.git
cd clinic-app

### 2. Install dependencies
npm install

### 3. Set up the database
Open SQL Shell (psql) and run the following commands:
sql
CREATE DATABASE medibook;
\c medibook
\i 'path/to/clinic-app/schema.sql'

Replace `path/to/clinic-app` with the actual path to the project folder on your machine.

### 4. Configure environment variables
Copy the example environment file:
cp .env.example .env
Then open `.env` and fill in your own PostgreSQL credentials:
PORT=3000
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=medibook
Note: The `.env` file is not included in the repository for security reasons. Each person sets it up locally with their own credentials.

### 5. Start the application
npm start

### 6. Open in browser
http://localhost:3000

## Project Structure
clinic-app/
├── app.js                  # Main application entry point
├── db.js                   # PostgreSQL connection pool
├── schema.sql              # Database schema and seed data
├── package.json            # Project dependencies and scripts
├── .env.example            # Environment variable template
├── routes/                 # Express route handlers
│   ├── doctors.js
│   ├── patients.js
│   ├── appointments.js
│   ├── prescriptions.js
│   └── specialties.js
├── views/                  # EJS templates
│   ├── partials/           # Shared header and footer
│   ├── index.ejs
│   ├── doctors/
│   ├── patients/
│   ├── appointments/
│   ├── prescriptions/
│   └── specialties/
└── public/
    └── css/
        └── style.css       # Application styling

## Database Schema
The application uses 5 tables:
- specialties — medical departments (e.g. Cardiology, Dentistry)
- doctors — doctor profiles linked to a specialty
- patients — patient profiles
- appointments — bookings linking a patient and doctor with date, time, and status
- prescriptions — medication notes linked to an appointment