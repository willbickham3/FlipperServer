const express = require('express');
const router = express.Router();
const db = require('../db-connector');

// SELECT's all checkouts in MemberCheckouts table
router.get('/MemberCheckouts', (req, res) => {
    const getAllCheckouts = 'SELECT * FROM MemberCheckouts;'
    db.pool.query(getAllCheckouts, function (err, results, fields){
        res.send(JSON.stringify(results))});
})

// // INSERT a new checkout
// router.post('/insertMemberCheckout', (req, res) => {})

// // UPDATE a checkout
// router.put('/updateMemberCheckout', (req, res) => {})

// // DELETE a checkout
// router.delete('/deleteMemberCheckout', (req, res) => {})

module.exports = router;