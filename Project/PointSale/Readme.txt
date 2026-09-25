# Project Development Log

## Day 1 — Initial Web Application Structure

### Overview

During Day 1, the initial structure of the web application was created. The main pages and their corresponding CSS and JavaScript files were developed to establish the foundation of the sales and order management system.

### Login

**Files:**

* `login.html`
* `login.css`

The Login page was created as the entry point to the application. It will be used by waiters and employees to enter their credentials and access the system.

The page contains the basic interface required for the authentication process.

### Dashboard

**Files:**

* `dashboard.html`
* `dashboard.css`
* `dashboard.js`

The Dashboard was created as the main interface of the application after logging in.

It will provide access to the primary functions of the system, including order management, sales information, history, and other application features.

JavaScript was also added to prepare the dashboard for interactive functionality.

### Notebook

**Files:**

* `notebook.html`
* `notebook.css`
* `notebook.js`

The Notebook page was created as an additional section of the application.

It will be used to store or display notes, additional information, and other administrative content that may be required during the operation of the system.

JavaScript functionality was included to allow the page to be expanded with interactive features in future development stages.

### Initial Project Structure

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
└── notebook.js
```

### Result

By the end of Day 1, the basic frontend structure of the application was established.

The project now had the main pages required to begin developing the system:

* User Login
* Main Dashboard
* Notebook / Additional Information

These pages provided the foundation for implementing the application's functionality in the following development stages.

# Project Development Log

## Day 2 — Login, Orders and History

### Login System

During Day 2, the login functionality was developed and integrated into the web application.

The login system allows employees to enter their credentials and access the main dashboard of the application.

The login functionality includes:

* Username and password fields.
* Credential verification.
* Access to the dashboard after successful login.
* Error handling for invalid credentials.

### New Order

A new page for creating orders was added to the application.

The **New Order** section will allow waiters/employees to register customer orders and manage the products included in each order.

This section will be used as one of the main functions of the sales management system.

### Order History

An **Order History** section was also added to the project.

This page will allow employees to view previously created orders and consult information about past sales.

The history section will later be connected to the database to display and organize stored orders.

### Pages Added

During Day 2, the following sections were added to the application:

```text
Login
├── Login functionality
│
New Order
├── Create new customer orders
│
History
├── View previous orders
```

### Result

By the end of Day 2, the application had progressed from the initial page structure to a more functional system.

The main features developed during this day were:

* User login.
* New order creation.
* Order history.
* Navigation between the main sections of the application.

These features provide the basic workflow for the future sales and order management system.
