const express = require('express')


const app = express();
PORT = 6834

const db = require('./db-connector')

app.get('/', function(req, res)
    {
        // Define our queries
        query1 = 'SELECT * FROM LibraryMembers;';
        

        // Execute every query in an asynchronous manner, we want each query to finish before the next one starts

        // DROP TABLE...
        db.pool.query(query1, function (err, results, fields){
            let base = "<h1>MYSQL Results: </h1>"
            res.send(base + JSON.stringify(results))
        });
    });


app.listen(PORT, () => 
    console.log(`FlipperServer now listening on PORT ${PORT}`)
)