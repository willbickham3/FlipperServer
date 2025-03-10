const express = require('express');
const router = express.Router();
const db = require('../db-connector');

// SELECTS libraryMemberID and Emails for all library members for drop down list
router.get('/emails', (req, res) => {
    const readAllEmailsQuery = 'SELECT libraryMemberID, email FROM LibraryMembers ORDER BY libraryMemberID ASC;'
    db.pool.query(readAllEmailsQuery, (error, results) => {
        res.send(JSON.stringify(results))
    })
})

// SELECTS bookID's and Titles from books for drop down list
router.get('/titles', (req, res) => {
    const readAllTitlesQuery = 'SELECT bookID, title FROM Books ORDER BY bookID ASC;'
    db.pool.query(readAllTitlesQuery, (error, results) => {
        res.send(JSON.stringify(results))
    })
})


// SELECT email/title combinations for MemberCheckouts Entries for Drop Down
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