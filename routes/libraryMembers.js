const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const db = require('../db-connector')

// /nfs/stak/users/bickhamw/FlipperServer/node_modules/forever/bin/forever stop FlipperServer.js
// 


// Password Hashing Function
async function hash(password) {
    return await argon2.hash(`${password}`);
}

// SELECT's all entries from LibraryMembers Table
router.get('/LibraryMembers', (req, res) =>
    {
        query1 = 'SELECT * FROM LibraryMembers;';

        db.pool.query(query1, function (err, results, fields){
            res.send(JSON.stringify(results))
        });
    });

router.post('/createLibraryMember', async (req, res) => {
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

router.put('/updateLibraryMember', async (req, res) => {
    const { email, username, name, password, libraryMemberID } = req.body;
    const passwordHash = await hash(password)
    const updateQuery = `UPDATE LibraryMembers SET 
    email = ?, 
    username = ?,
    name = ?,
    passwordHash = ?
    WHERE libraryMemberID = ?
    `
    db.pool.query(updateQuery, [email, username, name, passwordHash, libraryMemberID], (error, results) => {
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

router.delete('/deleteLibraryMember', async (req, res) => {
    const { email } = req.body;
    const deleteQuery = `DELETE FROM LibraryMembers WHERE email = ?`
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