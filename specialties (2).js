const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    const result = await pool.query('SELECT * FROM specialties ORDER BY id');
    res.render('specialties/index', { title: 'Specialties', specialties: result.rows });
});

router.get('/new', (req, res) => {
    res.render('specialties/new', { title: 'Add Specialty' });
});

router.post('/', async (req, res) => {
    const { name } = req.body;
    await pool.query('INSERT INTO specialties (name) VALUES ($1)', [name]);
    res.redirect('/specialties');
});

router.get('/:id/edit', async (req, res) => {
    const result = await pool.query('SELECT * FROM specialties WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).send('Not found');
    res.render('specialties/edit', { title: 'Edit Specialty', specialty: result.rows[0] });
});

router.put('/:id', async (req, res) => {
    const { name } = req.body;
    await pool.query('UPDATE specialties SET name = $1 WHERE id = $2', [name, req.params.id]);
    res.redirect('/specialties');
});

router.delete('/:id', async (req, res) => {
    await pool.query('DELETE FROM specialties WHERE id = $1', [req.params.id]);
    res.redirect('/specialties');
});

module.exports = router;
