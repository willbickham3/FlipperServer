# FlipperServer

## Overview
### Installation

1. Clone the Repository 
```
git clone https://github.com/willbickham3/FlipperServer.git
npm install
```

2. Install the dependencies
```
npm install
```

3. Update the db-connector.js file with your MySQL/MariaDB credentials.

4. Start the Server
```
npm start
```

### Base URL for the API
http://classwork.engr.oregonstate.edu:6834

## List of Endpoints
- [LibraryMembers](#LibraryMembers)
- [Books](#Books)
- [MemberCheckouts](#MemberCheckouts)
- [MemberFees](#MemberFees)
- [Utility](#Utility)
- [Citations](#citations)


# LibraryMembers
- [Return to top](#flipperserver)
1. Read:   http://classwork.engr.oregonstate.edu:6834/lm/LibraryMembers
    - **Description**
        - Reads all the current entries in the LibraryMembers Entity, providing a list of members and relevant information
2. Create: http://classwork.engr.oregonstate.edu:6834/lm/insertLibraryMember
    - **Description**
        - Inserts a new member into the LibraryMembers Entity
    - Example JSON Body Parameters
        ```
        {
            "email":    "agentsmith@gmail.com",
            "username": "agentsmith00",
            "name":     "Agent Smith",
            "password": "theoneisamyth123"
        }
        ```
3. Update: http://classwork.engr.oregonstate.edu:6834/lm/updateLibraryMember
    - **Description**
        - Updates an existing member of the LibraryMembers Entity
    - Example JSON Body Parameters
        ```
        {
            "email":    "neo_theone@gmail.com",
            "username": "neo01",
            "name":     "Neo",
            "libraryMemberID": 6
        }
        ```
4. Delete: http://classwork.engr.oregonstate.edu:6834/lm/deleteLibraryMember
    - **Description**
        - Deletes a member of the LibraryMembers Entity
    - Example JSON Body Parameters
        ```
        {
            "email":    "neo_theone@gmail.com"
        }
        ```

# Books
- [Return to top](#flipperserver)
1. Read:   http://classwork.engr.oregonstate.edu:6834/b/Books
    - **Description**
2. Create: http://classwork.engr.oregonstate.edu:6834/b/insertBook
    - **Description**
        - Inserts a new entry into the Books entity
    - Example JSON Body Parameters
        ```
        {
            "title":     "The Lord of the Rings",
            "author":    "J. R. R. Tolkien",
            "isbn":      "0618645616",
            "genre":     "Fiction",
            "publisher": "William Morrow"
        }
        ```
3. Update: http://classwork.engr.oregonstate.edu:6834/b/updateBook
    - **Description**
        - Updates an existing entry in the Books entity
    - Example JSON Body Parameters
        ```
        {
            "title":     "The Lord of the Rings",
            "author":    "J. R. R. Tolkien",
            "isbn":      "0618645616",
            "genre":     "High-Fantasy",
            "publisher": "William Morrow",
            "bookID": 6
        }
        ```
4. Delete: http://classwork.engr.oregonstate.edu:6834/b/deleteBook
    - **Description**
        - Deletes a book from the Books entity
    - Example JSON Body Parameters
        ```
        {
            "title":    "The Lord of the Rings"
        }
        ```

# MemberCheckouts
- [Return to top](#flipperserver)
1. Read:   http://classwork.engr.oregonstate.edu:6834/mc/MemberCheckouts
2. Create: http://classwork.engr.oregonstate.edu:6834/mc/insertMemberCheckout
    - **Description**
        - Inserts a checkout into the MemberCheckouts entity
    - Example JSON Body Parameters
        ```
        {
            "email": "agentsmith@gmail.com",
            "title": "The Lord of the Rings"
        }
        ```
3. Update: http://classwork.engr.oregonstate.edu:6834/mc/updateMemberCheckout
    - **Description**
        - Updates a checkout from the MemberCheckouts entity
    - Example JSON Body Parameters
        ```
        {
            "checkoutDate": "03-06-2025",
            "returnDate": "03-20-2025",
            "email": ""agentsmith@gmail.com,
            "title": "Shutter Island",
            "memberCheckoutID": 6
        }
        ```
4. Delete: http://classwork.engr.oregonstate.edu:6834/mc/deleteMemberCheckout
    - **Description**
        - Deletes a checkout from the MemberCheckouts entity
    - Example JSON Body Parameters
        ```
        {
            "memberCheckoutID": 6
        }
        ```

# MemberFees
- [Return to top](#flipperserver)
1. Read:   http://classwork.engr.oregonstate.edu:6834/mf/MemberFees
2. Create: http://classwork.engr.oregonstate.edu:6834/mf/insertMemberFee
    - **Description**
        - Inserts a fee into the MemberFees entity
    - Example JSON Body Parameters
        ```
        {
            "feeAmount": 0.25,
            "title": "The Lord of the Rings",
            "email": "agentsmith@gmail.com"
        }
        ```
3. Update: http://classwork.engr.oregonstate.edu:6834/mf/updateMemberFee
    - **Description**
        - Updates a fee from the MemberFees entity
    - Example JSON Body Parameters
        ```
        {
            "email": "agentsmith@gmail.com",
            "title": "The Lord of the Rings",
            "feeAmount": 2.00,
            "paymentStatus": "unpaid",
            "memberFeeID": 6
        }
        ```
4. Delete: http://classwork.engr.oregonstate.edu:6834/mf/deleteMemberfee
    - **Description**
        - Deletes a fee from the MemberFees entity
    - Example JSON Body Parameters
        ```
        {
            "memberFeeID": 6
        }
        ```

# Utility
- [Return to top](#flipperserver)
- Reset Tables: http://classwork.engr.oregonstate.edu:6834/rt/resetTables
- Dropdown Query (Emails): http://classwork.engr.oregonstate.edu:6834/dd/emails
- DropDown Query (Titles): http://classwork.engr.oregonstate.edu:6834/dd/titles
- DropDown Query (Email/Titles From MemberCheckouts): http://classwork.engr.oregonstate.edu:6834/dd/checkouts

### Forever Commands for OSU DB Hosting
- /nfs/stak/users/bickhamw/FlipperServer/node_modules/forever/bin/forever start FlipperServer.js 
- /nfs/stak/users/bickhamw/FlipperServer/node_modules/forever/bin/forever stop FlipperServer.js

# Citations
Michael Curry (February 2025) Building app.js (Version 1.0) [Source code](https://canvas.oregonstate.edu/courses/1987790/assignments/9888486?module_item_id=25022943)