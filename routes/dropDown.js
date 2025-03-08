const express = require('express');
const router = express.Router();
const db = require('../db-connector');

router.get('/emails', (req, res) => {
    const readAllEmailsQuery = 'SELECT libraryMemberID, email FROM LibraryMembers ORDER BY libraryMemberID ASC;'
    db.pool.query(readAllEmailsQuery, (error, results) => {
        res.send(JSON.stringify(results))
    })
})


router.get('/titles', (req, res) => {
    const readAllTitlesQuery = 'SELECT bookID, title FROM Books ORDER BY bookID ASC;'
    db.pool.query(readAllTitlesQuery, (error, results) => {
        res.send(JSON.stringify(results))
    })
})

router.get('/checkouts', (req, res) => {
    const readAllCheckouts = `
                            SELECT lm.email, b.title FROM
                            MemberCheckouts AS mc
                            LEFT JOIN LibraryMembers AS lm ON mc.libraryMemberID = lm.libraryMemberID
                            LEFT JOIN Books AS b ON mc.bookID = b.bookID
                            ORDER BY lm.libraryMemberID ASC;
                             `
    db.pool.query(readAllCheckouts, (error, results) => {
        res.send(JSON.stringify(results))
    })            
})

module.exports = router