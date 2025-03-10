const express = require('express');
const router = express.Router();
const db = require('../db-connector');
const argon2 = require('argon2');

// Password Hashing Function
async function hash(password) {
    return await argon2.hash(`${password}`);
}

// SELECT's all entries from LibraryMembers Table
router.get('/LibraryMembers', (req, res) =>
    {
        const getAllLibraryMembers = 'SELECT * FROM LibraryMembers;';

        db.pool.query(getAllLibraryMembers, function (err, results, fields){
            res.send(JSON.stringify(results))
        });
    });

// CREATE/INSERT a library member
router.post('/insertLibraryMember', async (req, res) => {
    const { email, username, name, password } = req.body;
    const passwordHash = await hash(password);
    const insertQuery = `INSERT INTO LibraryMembers (email, username, name, passwordHash) 
                         VALUES (?, ?, ?, ?);`

    db.pool.query(insertQuery, [email, username, name, passwordHash], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Database create failed' });
        }
        res.json({ message: 'Library member created successfully' });
    });
});

// UPDATE a library member
router.put('/updateLibraryMember', async (req, res) => {
    const { email, username, name, libraryMemberID } = req.body;
    const updateQuery = `UPDATE LibraryMembers SET 
    email = ?, 
    username = ?,
    name = ?
    WHERE libraryMemberID = ?;
    `
    db.pool.query(updateQuery, [email, username, name, libraryMemberID], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Database update failed' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Library member not found' });
        }

        res.json({ message: 'Library member updated successfully' });
    });
})

// DELETE a library member
router.delete('/deleteLibraryMember', async (req, res) => {
    const { email } = req.body;
    const deleteQuery = `DELETE FROM LibraryMembers WHERE email = ?;`
    db.pool.query(deleteQuery, [email], (error, results) => {
        if (error) {
            console.log('Database Error: ', error);
            return res.status(500).json({ error: 'Database Delete Failed'})
        }
        if (results.affectedRows ===0) {
            return res.status(404).json({ error: 'Library member not found. Check your spelling!'})
        }
        res.json({ message: 'Library member deleted successfully' });
    })
})

module.exports = router;