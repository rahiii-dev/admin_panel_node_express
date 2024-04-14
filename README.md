# Web Application: User Management System

## Overview

This web application is a User Management System designed to allow users to sign up, log in, and perform various operations related to user management. It includes both user-facing pages for signup, login, and user dashboard, as well as an admin panel for managing users.

## Features

- **User Authentication**: Users can sign up for an account and log in securely.
- **Admin Panel**: Administrators can log in to an admin panel to manage user data.
- **User Management**: Admins can view, create, edit, and delete user accounts.
- **Search Functionality**: Admins can search for users based on username or email.
- **Session Management**: User sessions are properly handled for authentication and authorization.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime environment.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing user data.
- **Mongoose**: MongoDB object modeling tool for Node.js.
- **bcrypt**: Library for hashing passwords securely.
- **Express Sessions**: Middleware for managing sessions in Express.js.
- **EJS**: Embedded JavaScript templating engine for generating dynamic HTML.

## Installation

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Set up environment variables (if needed).
4. Start the server: `npm start`

## Usage

- Visit `/register` to create a new user account.
- Visit `/login` to log in to an existing account.
- Admins have access the admin panel.
- In the admin panel, admins can manage users, search for users, and perform CRUD operations.
