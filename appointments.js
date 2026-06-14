const express = require('express');
const router = express.Router();
const pool = require('../db');
router.get('/', async (req, res) => {
    const result = await pool.query(`
        SELECT appointments.*, patients.name AS patient_name, doctors.name AS doctor_name
        FROM appointments
        JOIN patients ON appointments.patient_id = patients.id
        JOIN doctors ON appointments.doctor_id = doctors.id
        ORDER BY appointments.appointment_date, appointments.appointment_time
    `);
    res.render('appointments/index', { title: 'Appointments', appointments: result.rows });
});
router.get('/new', async (req, res) => {
    const patients = await pool.query('SELECT * FROM patients ORDER BY name');
    const doctors = await pool.query('SELECT * FROM doctors ORDER BY name');
    res.render('appointments/new', {
        title: 'Book Appointment',
        patients: patients.rows,
        doctors: doctors.rows
    });
});
router.post('/', async (req, res) => {
    const { patient_id, doctor_id, appointment_date, appointment_time } = req.body;
    await pool.query(
        `INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status)
         VALUES ($1, $2, $3, $4, 'pending')`,
        [patient_id, doctor_id, appointment_date, appointment_time]
    );
    res.redirect('/appointments');
});

router.get('/:id/edit', async (req, res) => {
    const appt = await pool.query('SELECT * FROM appointments WHERE id = $1', [req.params.id]);
    if (appt.rows.length === 0) return res.status(404).send('Not found');

    const patients = await pool.query('SELECT * FROM patients ORDER BY name');
    const doctors = await pool.query('SELECT * FROM doctors ORDER BY name');

    res.render('appointments/edit', {
        title: 'Edit Appointment',
        appointment: appt.rows[0],
        patients: patients.rows,
        doctors: doctors.rows
    });
});
router.put('/:id', async (req, res) => {
    const { patient_id, doctor_id, appointment_date, appointment_time, status } = req.body;
    await pool.query(
        `UPDATE appointments
         SET patient_id=$1, doctor_id=$2, appointment_date=$3, appointment_time=$4, status=$5
         WHERE id=$6`,
        [patient_id, doctor_id, appointment_date, appointment_time, status, req.params.id]
    );
    res.redirect('/appointments');
});
router.delete('/:id', async (req, res) => {
    await pool.query('DELETE FROM appointments WHERE id = $1', [req.params.id]);
    res.redirect('/appointments');
});

module.exports = router;
