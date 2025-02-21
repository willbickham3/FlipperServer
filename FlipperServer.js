const express = require('express')
const app = express();
const argon2 = require('argon2')
PORT = 6834

const db = require('./db-connector')

app.use(express.json())

app.get('/members', (req, res) =>
    {
        // Define our queries
        query1 = 'SELECT * FROM LibraryMembers;';

        db.pool.query(query1, function (err, results, fields){
            res.send(JSON.stringify(results))
        });
    });


async function hash(password) {
    return await argon2.hash(`${password}`);
}

app.post('/members', async (req, res) => {
    const { email, username, name, password } = req.body;
    const passwordHash = await hash(password);
    const insertQuery = `INSERT INTO LibraryMembers (email, username, name, passwordHash) 
             VALUES (?, ?, ?, ?);`
    db.pool.query(insertQuery, [email, username, name, passwordHash])
});

app.listen(PORT, () => 
    console.log(`FlipperServer now listening on PORT ${PORT}`)
)