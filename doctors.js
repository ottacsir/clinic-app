const express = require('express');
const router = express.Router();
const pool = require('../db');
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT doctors.*, specialties.name AS specialty_name
            FROM doctors
            LEFT JOIN specialties ON doctors.specialty_id = specialties.id
            ORDER BY doctors.id
        `);
        res.render('doctors/index', { title: 'Doctors', doctors: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
router.get('/new', async (req, res) => {
    try {
        const specialties = await pool.query('SELECT * FROM specialties ORDER BY name');
        res.render('doctors/new', { title: 'Add Doctor', specialties: specialties.rows });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
router.post('/', async (req, res) => {
    try {
        const { name, specialty_id, available_days, available_hours } = req.body;
        await pool.query(
            `INSERT INTO doctors (name, specialty_id, available_days, available_hours)
             VALUES ($1, $2, $3, $4)`,
            [name, specialty_id || null, available_days, available_hours]
        );
        res.redirect('/doctors');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
router.get('/:id/edit', async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await pool.query('SELECT * FROM doctors WHERE id = $1', [id]);
        const specialties = await pool.query('SELECT * FROM specialties ORDER BY name');

        if (doctor.rows.length === 0) return res.status(404).send('Doctor not found');

        res.render('doctors/edit', {
            title: 'Edit Doctor',
            doctor: doctor.rows[0],
            specialties: specialties.rows
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, specialty_id, available_days, available_hours } = req.body;
        await pool.query(
            `UPDATE doctors
             SET name = $1, specialty_id = $2, available_days = $3, available_hours = $4
             WHERE id = $5`,
            [name, specialty_id || null, available_days, available_hours, id]
        );
        res.redirect('/doctors');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM doctors WHERE id = $1', [id]);
        res.redirect('/doctors');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
