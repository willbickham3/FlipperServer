const express = require('express')
const app = express();
const argon2 = require('argon2')
const cors = require('cors');

// Routes
const libraryMembersRoutes = require('./routes/libraryMembers')

PORT = 6834

const db = require('./db-connector')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/lm', libraryMembersRoutes)


app.listen(PORT, () => 
    console.log(`FlipperServer now listening on PORT ${PORT}`)
)