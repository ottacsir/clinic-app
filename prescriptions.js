const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    const result = await pool.query(`
        SELECT prescriptions.*, 
               patients.name AS patient_name, 
               doctors.name AS doctor_name,
               appointments.appointment_date
        FROM prescriptions
        JOIN appointments ON prescriptions.appointment_id = appointments.id
        JOIN patients ON appointments.patient_id = patients.id
        JOIN doctors ON appointments.doctor_id = doctors.id
        ORDER BY prescriptions.created_at DESC
    `);
    res.render('prescriptions/index', { title: 'Prescriptions', prescriptions: result.rows });
});

router.get('/new', async (req, res) => {
    const appointments = await pool.query(`
        SELECT appointments.id, patients.name AS patient_name, doctors.name AS doctor_name, appointment_date
        FROM appointments
        JOIN patients ON appointments.patient_id = patients.id
        JOIN doctors ON appointments.doctor_id = doctors.id
        ORDER BY appointment_date DESC
    `);
    res.render('prescriptions/new', { title: 'Add Prescription', appointments: appointments.rows });
});


router.post('/', async (req, res) => {
    const { appointment_id, medication, notes } = req.body;
    await pool.query(
        'INSERT INTO prescriptions (appointment_id, medication, notes) VALUES ($1, $2, $3)',
        [appointment_id, medication, notes]
    );
    res.redirect('/prescriptions');
});

router.get('/:id/edit', async (req, res) => {
    const result = await pool.query('SELECT * FROM prescriptions WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).send('Not found');

    const appointments = await pool.query(`
        SELECT appointments.id, patients.name AS patient_name, doctors.name AS doctor_name, appointment_date
        FROM appointments
        JOIN patients ON appointments.patient_id = patients.id
        JOIN doctors ON appointments.doctor_id = doctors.id
        ORDER BY appointment_date DESC
    `);

    res.render('prescriptions/edit', {
        title: 'Edit Prescription',
        prescription: result.rows[0],
        appointments: appointments.rows
    });
});

router.put('/:id', async (req, res) => {
    const { appointment_id, medication, notes } = req.body;
    await pool.query(
        'UPDATE prescriptions SET appointment_id=$1, medication=$2, notes=$3 WHERE id=$4',
        [appointment_id, medication, notes, req.params.id]
    );
    res.redirect('/prescriptions');
});

router.delete('/:id', async (req, res) => {
    await pool.query('DELETE FROM prescriptions WHERE id = $1', [req.params.id]);
    res.redirect('/prescriptions');
});

module.exports = router;
