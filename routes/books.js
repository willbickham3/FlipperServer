const express = require('express')
const router = express.Router()
const db = require('../db-connector')


// SELECT's all books in Books table
router.get('/Books', (req, res) => {
    const getAllBooks = 'SELECT * FROM Books;';

    db.pool.query(getAllBooks, function (err, results, fields){
        if (err) {
            return res.status(500).json({ err : 'Database is currently unavailable.'})
        };
    
        res.json(results)
    });
});

// INSERT a new book
router.post('/insertBook', (req, res) => {
    const { title, author, isbn, genre, publisher } = req.body;

    // Check provided information
    if (!title || !author) {
        return res.status(400).json({ 'Error': 'Book Insert Failed. Please ensure title and author is filled.' })
    }

    const insertQuery = `
                        INSERT INTO Books 
                        (title, author, isbn, genre, publisher)
                        VALUES (?, ?, ?, ?, ? );
                        `
    db.pool.query(insertQuery, [title, author, isbn, genre, publisher], (err, results) => {
        if (err) {
            console.error('Books Insert Error: ', err);
            return res.status(500).json({ err: 'Database is currently unavailable.' });
        }
        res.json({ message: `Book inserted successfully: ${results}` });
    });
});

// UPDATE a book
router.put('/updateBook', (req, res) => {
    const { title, author, isbn, genre, publisher, bookID } = req.body;

    // Check provided information
    if (!title || !author || !bookID) {
        return res.status(400).json({ 'Error': 'Book Data Missing/Incorrect. Check title or author!' })
    }

    const updateQuery = `
                        UPDATE Books SET
                        title = ?, author = ?, isbn = ?, genre = ?, publisher = ?
                        WHERE bookID = ?;
                        `
    db.pool.query(updateQuery, [title, author, isbn, genre, publisher, bookID], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ err: 'Database create failed' });
        }
        res.json({ message: `Book updated successfully: ${results}` });
    });
});

// DELETE a book
router.delete('/deleteBook', (req, res) => {
    const { title } = req.body;

    // Check provided information
    if (!title) {
        return res.status(400).json({ 'Error': 'Bo' })
    }

    const deleteQuery = `DELETE FROM Books WHERE title = ?;`
    db.pool.query(deleteQuery, [title], (error, results) => {
        if (error) {
            console.log('Database Error: ', error);
            return res.status(500).json({ error: 'Database Delete Failed'})
        }

        res.json({ message: `Book deleted successfully: ${results}` });
    })
})

module.exports = router;