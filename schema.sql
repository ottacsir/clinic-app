DROP TABLE IF EXISTS prescriptions;
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS doctors;
DROP TABLE IF EXISTS patients;
DROP TABLE IF EXISTS specialties;

CREATE TABLE specialties (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    specialty_id INTEGER REFERENCES specialties(id) ON DELETE SET NULL,
    available_days VARCHAR(100),   
    available_hours VARCHAR(100)   
);

CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20)
);

CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id INTEGER REFERENCES doctors(id) ON DELETE CASCADE,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status VARCHAR(20) DEFAULT 'pending'  
);

CREATE TABLE prescriptions (
    id SERIAL PRIMARY KEY,
    appointment_id INTEGER REFERENCES appointments(id) ON DELETE CASCADE,
    medication VARCHAR(200),
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);


INSERT INTO specialties (name) VALUES ('General Medicine'), ('Dentistry'), ('Pediatrics'), ('Cardiology');

INSERT INTO doctors (name, specialty_id, available_days, available_hours) VALUES
('Dr. Abebe Kebede', 1, 'Mon, Wed, Fri', '9:00 AM - 4:00 PM'),
('Dr. Sara Tesfaye', 2, 'Tue, Thu', '10:00 AM - 3:00 PM');

INSERT INTO patients (name, email, phone) VALUES
('Liya Tadesse', 'liya@12386.com', '0911897634'),
('Yonas Bekele', 'yonas@78543.com', '0922073456');
