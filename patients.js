const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    const result = await pool.query('SELECT * FROM patients ORDER BY id');
    res.render('patients/index', { title: 'Patients', patients: result.rows });
});

router.get('/new', (req, res) => {
    res.render('patients/new', { title: 'Add Patient' });
});

router.post('/', async (req, res) => {
    const { name, email, phone } = req.body;
    await pool.query('INSERT INTO patients (name, email, phone) VALUES ($1, $2, $3)', [name, email, phone]);
    res.redirect('/patients');
});

router.get('/:id/edit', async (req, res) => {
    const result = await pool.query('SELECT * FROM patients WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).send('Not found');
    res.render('patients/edit', { title: 'Edit Patient', patient: result.rows[0] });
});

router.put('/:id', async (req, res) => {
    const { name, email, phone } = req.body;
    await pool.query('UPDATE patients SET name=$1, email=$2, phone=$3 WHERE id=$4', [name, email, phone, req.params.id]);
    res.redirect('/patients');
});

router.delete('/:id', async (req, res) => {
    await pool.query('DELETE FROM patients WHERE id = $1', [req.params.id]);
    res.redirect('/patients');
});

module.exports = router;
