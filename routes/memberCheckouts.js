const express = require('express');
const router = express.Router();
const db = require('../db-connector');

// SELECT's all checkouts in MemberCheckouts table
router.get('/MemberCheckouts', (req, res) => {
    const getAllCheckouts = 'SELECT * FROM MemberCheckouts;'
    db.pool.query(getAllCheckouts, function (err, results, fields){
        res.send(JSON.stringify(results))});
})

// INSERT a new checkout
router.post('/insertMemberCheckout', (req, res) => {
    const { email, title } = req.body

    if (!email || !title) {
        return res.status(400).json({ 'Error': 'Member Email or Book Title missing.'})
    }

    const insertQuery = `
                        INSERT INTO MemberCheckouts (checkoutDate, returnDate, libraryMemberID, bookID)
                        VALUES (
                        CURDATE(), 
                        DATE_ADD(CURDATE(), 
                        INTERVAL 14 DAY), 
                        (SELECT libraryMemberID FROM LibraryMembers WHERE email = ?), 
                        (SELECT bookID FROM Books WHERE title = ?)
                        );
                        `
    db.pool.query(insertQuery, [email, title], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Database create failed' });
        }
        res.json({ message: `Checkout created successfully: ${results}` });
    })
})

// UPDATE a checkout
router.put('/updateMemberCheckout', (req, res) => {
    const { checkoutDate, returnDate, email, title, memberCheckoutID } = req.body;

    if (!checkoutDate || !returnDate || !email || !title) {
        return res.status(400).json( {'Error:': 'Dates, email or title missing/incorrect format.'} )
    }

    const updateQuery = `
                        UPDATE MemberCheckouts SET
                        checkoutDate = ?,
                        returnDate = ?,
                        libraryMemberID = (SELECT libraryMemberID FROM LibraryMembers WHERE email = ?),
                        bookID = (SELECT bookID FROM Books WHERE title = ?)
                        WHERE memberCheckoutID = ?;
                        `
    db.pool.query(updateQuery, [checkoutDate, returnDate, email, title, memberCheckoutID], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'MemberCheckouts create failed' });
        }
        res.json({ message: `Member checkout updated successfully: ${results}` });
    });
})

// DELETE a checkout
router.delete('/deleteMemberCheckout', (req, res) => {
    const { memberCheckoutID } = req.body;
    const deleteQuery = `DELETE FROM MemberCheckouts WHERE memberCheckoutID = ?;`
    db.pool.query(deleteQuery, [memberCheckoutID], (error, results) => {
        if (error) {
            console.log('Database Error: ', error);
            return res.status(500).json({ error: 'MemberCheckouts Delete Failed'})
        }

        res.json({ message: `Checkout deleted successfully: ${results}` });
    });
})

module.exports = router;