const express = require('express');
const router = express.Router();
const db = require('../db-connector');

router.post('/resetTables', (req, res) => {
    const resetQuery = 
    `
    SET FOREIGN_KEY_CHECKS = 0; -- Temporarily disable foreign key constraints
    TRUNCATE TABLE LibraryMembers;
    TRUNCATE TABLE Books;
    TRUNCATE TABLE MemberCheckouts;
    TRUNCATE TABLE MemberFees;
    
    INSERT INTO LibraryMembers(email, username, name, passwordHash) VALUES
    ('jacksheperd@gmail.com', 'jacksheepherder', 'Jack Sheperd', 'swordfish500'),
    ('kateausten@yahoo.com', 'Kate111Austen', 'Kate Austen', '123dandelion'),
    ('johnlocke@outlook.com', 'LockedInJohn', 'John Locke', 'qwerty54321'),
    ('benlinus@hotmail.com', 'big_ben_5', 'Ben Linus', '@pple'),
    ('hugoreyes@aol.com', 'HUGE_HUGO', 'Hugo Reyes', 'aaa111!!!');

    INSERT INTO Books (title, author, isbn, genre, publisher)
    VALUES 
    ('The Alchemist', 'Paulo Coelho', '9780061122415', 'Fiction', 'HarperCollins'),
    ('Shutter Island', 'Dennis Lehane', '9780061898815', 'Mystery', 'HarperCollins'),
    ('Into the Wild', 'Jon Krakauer', '9780385486804', 'Non-Fiction', 'Villard'),
    ('The Tempest', 'William Johnson', '9780743482837', 'Novel', 'BookBrothers'),
    ('Gone Girl', 'Gillian Flynn', '9780307588371', 'Thriller', 'Crown Publishing Group');

    INSERT INTO MemberCheckouts (checkoutDate, returnDate, libraryMemberID, bookID)
    VALUES
    ('2025-01-14', '2025-01-28', 5, 1),
    ('2025-01-26', '2025-02-09', 4, 2),
    ('2025-01-03', '2025-01-15', 3, 3),
    ('2025-01-18', '2025-02-01', 2, 4),
    ('2025-01-16', '2025-01-30', 1, 5);

    CALL CalculateTotalFee();

    SET FOREIGN_KEY_CHECKS = 1;
    `

    db.pool.query(resetQuery, function (err, results, fields){
        res.json({ message: 'Flipper Database has been reset to factory settings.' });
    });
})

module.exports = router;