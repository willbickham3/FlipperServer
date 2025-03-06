# FlipperServer

## List of Endpoints
### LibraryMembers
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

### Books
1. Read:   http://classwork.engr.oregonstate.edu:6834/b/Books
2. Create: http://classwork.engr.oregonstate.edu:6834/b/insertBook
3. Update: http://classwork.engr.oregonstate.edu:6834/b/updateBook
4. Delete: http://classwork.engr.oregonstate.edu:6834/b/deleteBook

### MemberCheckouts
1. Read:   http://classwork.engr.oregonstate.edu:6834/mc/MemberCheckouts
2. Create: http://classwork.engr.oregonstate.edu:6834/mc/insertMemberCheckout
3. Update: http://classwork.engr.oregonstate.edu:6834/mc/updateMemberCheckout
4. Delete: http://classwork.engr.oregonstate.edu:6834/mc/deleteMemberCheckout

### MemberFees
1. Read:   http://classwork.engr.oregonstate.edu:6834/mf/MemberFees
2. Create: http://classwork.engr.oregonstate.edu:6834/mf/insertMemberFee
3. Update: http://classwork.engr.oregonstate.edu:6834/mf/updateMemberFee
4. Delete: http://classwork.engr.oregonstate.edu:6834/mf/deleteMemberfee

### Resetting Tables
- Reset: http://classwork.engr.oregonstate.edu:6834/rt/resetTables

### Forever Commands for OSU DB Hosting
- /nfs/stak/users/bickhamw/FlipperServer/node_modules/forever/bin/forever start FlipperServer.js 
- /nfs/stak/users/bickhamw/FlipperServer/node_modules/forever/bin/forever stop FlipperServer.js

