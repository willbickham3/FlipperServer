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
// router.post('/insertBook', (req, res) => {})

// // UPDATE a book
// router.put('/updateBook', (req, res) => {})

// // DELETE a book
// router.delete('/deleteBook', (req, res) => {})

module.exports = router;