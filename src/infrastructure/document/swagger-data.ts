export class SwaggerDate {
    // ----------------------------------- BOOK -----------------------------------
    static adminDate = {
        id: 5,
        is_deleted: false,
        createdAt: "2025-09-16T11:20:41.675Z",
        updatedAt: "2025-09-16T11:20:41.675Z",
        full_name: "Admin User",
        username: "admin126",
        hashed_password: "$2b$07$ZKsUTZhVSWmQkR2puXmYwep3vXRRzeOjMTf8A6XL2kt4bkoPUWKAO",
        role: "ADMIN",
        is_active: true
    }

    static adminAll = {
        id: 5,
        full_name: "Admin User",
        username: "admin126",
        role: "ADMIN",
        is_active: true
    }
    static tokenRes = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaXNfYWN0aXZlIjp0cnVlLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NTc1MjgxMzksImV4cCI6MTc1NzYxNDUzOX0.lP1z1R3Y1ZJ0aF3Do5y45jIWZLqmbJXnY0IS1-1Pzqc`;

    // ----------------------------------- USER -----------------------------------

    static userDate = {
        id: 5,
        full_name: "User User",
        email: "www.exapmle@gmail.com",
        role: "LIBRARY",
        is_active: true
    }

    static userAll = {
        id: 5,
        full_name: "User User",
        email: "www.exapmle@gmail.com",
        role: "LIBRARY",
        is_active: true
    }
    // ----------------------------------- BOOK -----------------------------------

    static bookDate = {
        "id": 1,
        "createdAt": "2025-09-18T07:33:24.698Z",
        "title": "Lord Rings",
        "author": "J.R.Tolkin",
        "published_year": "2008-08-02",
        "avialable": true
    }

    static bookAll = {
        id: 1,
        title: "Lord Rings",
        avialable: true
    }
    // ----------------------------------- BORROW -----------------------------------

    static borrowDate = {
        "borrow_date": "2025-09-16",
        "due_date": "2025-09-23",
        "return_date": "2025-09-20",
        "overdue": false
    }

    static BookhistoryDate = {
        "id": 3,
        "action": "Action"
    }
}