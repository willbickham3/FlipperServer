const express = require('express');
const router = express.Router();
const db = require('../db-connector');

// SELECT's all fees in MemberFees table
router.get('/MemberFees', (req, res) => {
    const getAllFees = `
                       SELECT 
                       mf.*,
                       lm.email,
                       b.title
                       FROM MemberFees AS mf
                       JOIN LibraryMembers AS lm ON mf.libraryMemberID = lm.libraryMemberID
                       LEFT JOIN MemberCheckouts AS mc ON mf.memberCheckoutID = mc.memberCheckoutID
                       LEFT JOIN Books AS b ON mc.bookID = b.bookID;
                       `
    db.pool.query(getAllFees, function (err, results, fields){
        res.send(JSON.stringify(results))});
})

// // INSERT a new fee
router.post('/insertMemberFee', (req, res) => {
    const { feeAmount, title, email} = req.body
    const titleCheck = title === "" ? null : title;
    console.log(titleCheck)
    const insertQuery = `
                        INSERT INTO MemberFees (libraryMemberID, memberCheckoutID, feeAmount)
                        SELECT 
                        lm.libraryMemberID,
                        CASE
                            WHEN ? is NULL THEN NULL
                            ELSE mc.memberCheckoutID
                        END AS memberCheckoutID,
                        ?
                        FROM LibraryMembers AS lm
                        LEFT JOIN MemberCheckouts AS mc ON lm.libraryMemberID = mc.libraryMemberID
                        LEFT JOIN Books as b ON mc.bookID = b.bookID
                        WHERE (b.title = ? OR ? IS NULL) AND lm.email = ?
                        ON DUPLICATE KEY UPDATE 
                        feeAmount = feeAmount + VALUES(feeAmount);
                        `
    db.pool.query(insertQuery, [titleCheck, feeAmount, titleCheck, titleCheck, email], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'MemberFees create failed' });
        }
        res.json({ message: `Fee created successfully: ${results}` });
    })
})

// // UPDATE a fee
router.put('/updateMemberFee', (req, res) => {
    const { email, title, feeAmount, paymentStatus, memberFeeID } = req.body;
    const titleCheck = title === "" ? null : title;
    const updateQuery = `
                        UPDATE MemberFees SET 
                        libraryMemberID = (SELECT libraryMemberID FROM LibraryMembers WHERE email = ?),
                        memberCheckoutID = CASE 
                        WHEN ? = '' OR ? IS NULL THEN NULL
                        ELSE (
                            SELECT mc.memberCheckoutID FROM MemberCheckouts as mc
                            JOIN LibraryMembers AS lm ON mc.libraryMemberID = lm.libraryMemberID
                            JOIN Books AS b ON mc.bookID = b.bookID
                            WHERE lm.email = ? AND (b.title = ? OR ? IS NULL)
                            ORDER BY mc.checkoutDate DESC
                            LIMIT 1
                        )
                        END,
                        feeAmount = ?,
                        paymentStatus = ?
                        WHERE memberFeeID = ?;
                        `
    db.pool.query(updateQuery, [email, titleCheck, titleCheck, email, titleCheck, titleCheck, feeAmount, paymentStatus, memberFeeID, titleCheck], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'MemberCheckouts create failed' });
        }
        res.json({ message: `Member Fee updated successfully: ${results}` });
    });
});

// // DELETE a fee
router.delete('/deleteMemberFee', (req, res) => {
    const { memberFeeID } = req.body;
    const deleteQuery = `DELETE FROM MemberFees WHERE  memberFeeID = ?;`
    db.pool.query(deleteQuery, [memberFeeID], (error, results) => {
        if (error) {
            console.log('Database Error: ', error);
            return res.status(500).json({ error: 'MemberFees Delete Failed'})
        }
        if (results.affectedRows ===0) {
            return res.status(404).json({ error: 'Fee not found. Check your spelling!'})
        }
        res.json({ message: `Fee deleted successfully: ${results}` });
    });
})

module.exports = router;