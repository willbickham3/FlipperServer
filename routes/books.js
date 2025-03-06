const express = require('express')
const router = express.Router()
const db = require('../db-connector')


// SELECT's all books in Books table
router.get('/Books', (req, res) => {
    const getAllBooks = 'SELECT * FROM Books;';
    
    db.pool.query(getAllBooks, function (err, results, fields){
        res.send(JSON.stringify(results))});
})

// // INSERT a new book
router.post('/insertBook', (req, res) => {
    const { title, author, isbn, genre, publisher } = req.body;
    const insertQuery = `INSERT INTO Books (title, author, isbn, genre, publisher)
                         VALUES (?, ?, ?, ?, ?  );`
    db.pool.query(insertQuery, [title, author, isbn, genre, publisher], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Database create failed' });
        }
        res.json({ message: `Book inserted successfully: ${results}` });
    });
});

// // UPDATE a book
router.put('/updateBook', (req, res) => {
    const { title, author, isbn, genre, publisher, bookID } = req.body;
    const updateQuery = `UPDATE Books SET
                        title = ?, author = ?, isbn = ?, genre = ?, publisher = ?
                        WHERE bookID = ?;`
    db.pool.query(updateQuery, [title, author, isbn, genre, publisher, bookID], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Database create failed' });
        }
        res.json({ message: `Book updated successfully: ${results}` });
    });
});

// // DELETE a book
router.delete('/deleteBook', (req, res) => {
    const { title } = req.body;
    const deleteQuery = `DELETE FROM Books WHERE title = ?;`
    db.pool.query(deleteQuery, [title], (error, results) => {
        if (error) {
            console.log('Database Error: ', error);
            return res.status(500).json({ error: 'Database Delete Failed'})
        }
        if (results.affectedRows ===0) {
            return res.status(404).json({ error: 'Book not found. Check your spelling!'})
        }
        res.json({ message: `Book deleted successfully: ${results}` });
    })
})

module.exports = router;