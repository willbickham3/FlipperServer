const express = require('express');
const router = express.Router();
const db = require('../db-connector');

router.get('/emails', (req, res) => {
    const readAllEmailsQuery = 'SELECT libraryMemberID, email FROM LibraryMembers;'
    db.pool.query(readAllEmailsQuery, (error, results) => {
        res.send(JSON.stringify(results))
    })
})


router.get('/titles', (req, res) => {
    const readAllTitlesQuery = 'SELECT bookID, title FROM Books;'
    db.pool.query(readAllTitlesQuery, (error, results) => {
        res.send(JSON.stringify(results))
    })
})

module.exports = router