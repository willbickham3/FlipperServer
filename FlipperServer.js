const express = require('express')
const app = express();
const cors = require('cors');
PORT = 6834;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const libraryMembersRoutes = require('./routes/libraryMembers');
const books = require('./routes/books');
const memberCheckouts = require('./routes/memberCheckouts');
const memberFees = require('./routes/memberFees');
const resetTables = require('./routes/resetTables');

// Pointing to the routes
app.use('/lm', libraryMembersRoutes);
app.use('/b', books);
app.use('/mc', memberCheckouts);
app.use('/mf', memberFees);
app.use('/rt', resetTables);


app.listen(PORT, () => 
    console.log(`FlipperServer now listening on PORT ${PORT}`)
);