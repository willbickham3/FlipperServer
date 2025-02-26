const express = require('express');
const router = express.Router();
const db = require('../db-connector');

// SELECT's all fees in MemberFees table
router.get('/MemberFees', (req, res) => {
    const getAllFees = 'SELECT * FROM MemberFees;'
    db.pool.query(getAllFees, function (err, results, fields){
        res.send(JSON.stringify(results))});
})

// // INSERT a new fee
// router.post('/insertMemberFee', (req, res) => {})

// // UPDATE a fee
// router.put('/updateMemberFee', (req, res) => {})

// // DELETE a fee
// router.delete('/deleteMemberFee', (req, res) => {})

module.exports = router;