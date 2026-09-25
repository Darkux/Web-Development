Project Development Log
Day 1 — Initial Web Pages
Pages Added

During Day 1, the initial structure of the web application was created.

Login
login.html
login.css

The login page will be used by waiters/employees to access the system.

Dashboard
dashboard.html
dashboard.css
dashboard.js

The dashboard will serve as the main interface after logging in. It will contain the primary functions of the sales/order management system.

Notebook
notebook.html
notebook.css
notebook.js

The notebook page will be used for additional information, notes, or administrative functions
# Project Development Log

## Day 2 — Database and User Management

### Database Setup

During Day 2, the database structure was created and connected to the web application.

A MySQL database was configured to store the information required by the system.

### Users Table

A `users` table was created to manage the employees and users who will access the system.

The table contains information such as:

* User ID
* Name
* Registration date
* User role
* Password

The user role will allow the system to differentiate between different types of users, such as employees and administrators.

### Login System

The login system was connected to the database so that user credentials can be verified.

The login process will follow this structure:

**Login Page → Database Verification → User Authentication → Dashboard**

If the credentials are valid, the user will be allowed to access the dashboard.

If the credentials are incorrect, the system will display an authentication error.

### PHP Backend

PHP was introduced as the backend language to handle communication between the web pages and the MySQL database.

The backend will be responsible for:

* Connecting to the database.
* Verifying user credentials.
* Managing user sessions.
* Processing requests from the frontend.
* Preparing the system for future sales and order-management functions.

### Project Structure

The project was expanded to include backend files in addition to the existing HTML, CSS, and JavaScript files.

The current structure is:

```text
Project
│
├── login.html
├── login.css
│
├── dashboard.html
├── dashboard.css
├── dashboard.js
│
├── notebook.html
├── notebook.css
├── notebook.js
│
└── backend
    ├── connection.php
    └── login.php
```

### Result

By the end of Day 2, the project had progressed from a collection of frontend pages to a web application with a database structure and an initial backend.

The main objective of this stage was to establish the foundation for user authentication and future system functionality.
