# SmartQueue Backend API

A scalable backend API for the SmartQueue appointment booking system, built with Node.js, Express, TypeScript, and TypeORM. This API handles authentication, user management, and appointment scheduling with a PostgreSQL database.

---

## Overview

SmartQueue Backend provides a RESTful API for managing users and appointments in a role-based booking system. It supports Customers, Providers, and Admins, enabling secure authentication and structured data handling.

---

## Features

* RESTful API architecture
* User authentication (login system)
* Role-based system (CUSTOMER, PROVIDER, ADMIN)
* Appointment management (CRUD operations)
* PostgreSQL database integration
* TypeORM for ORM and entity management
* Modular architecture (controllers, routes, repositories)
* Environment-based configuration with dotenv

---

## Tech Stack

* Node.js (ESM)
* Express.js
* TypeScript
* TypeORM
* PostgreSQL
* dotenv
* cors

---

## Project Structure

```
src/
│
├── controllers/        # Request handlers (business logic)
├── routes/             # API route definitions
├── repositories/       # Database access layer
├── entities/           # TypeORM entities (User, Appointment)
├── enums/              # Role and status enums
├── config/             # Environment + DB config
├── app.ts              # Express app setup
└── server.ts           # Entry point
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/smartqueue-backend.git
cd smartqueue-backend
```

Install dependencies:

```bash
npm install
```

---

## Environment Setup

Create a `.env` file:

```
PORT=3002
DB_HOST=your-db-host
DB_PORT=5432
DB_USERNAME=your-username
DB_PASSWORD=your-password
DB_NAME=postgres
```

---

## Running the Server

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

---

## Database Configuration

This project uses PostgreSQL with TypeORM.

### Important (Azure PostgreSQL)

If using Azure Database for PostgreSQL, UUID extensions may be restricted.

Recommended approach:

* Use application-generated UUIDs (via `uuid` package)
* OR allowlist and enable `uuid-ossp` extension

---

## API Base URL

```
http://localhost:3002/api/v1
```

---

## API Endpoints

### Auth

| Method | Endpoint | Description       |
| ------ | -------- | ----------------- |
| POST   | `/login` | Authenticate user |

---

### Users

| Method | Endpoint     | Description    |
| ------ | ------------ | -------------- |
| GET    | `/users`     | Get all users  |
| GET    | `/users/:id` | Get user by ID |
| POST   | `/users`     | Create user    |
| PUT    | `/users/:id` | Update user    |
| DELETE | `/users/:id` | Delete user    |

---

### Appointments

| Method | Endpoint            | Description           |
| ------ | ------------------- | --------------------- |
| GET    | `/appointments`     | Get all appointments  |
| GET    | `/appointments/:id` | Get appointment by ID |
| POST   | `/appointments`     | Create appointment    |
| PUT    | `/appointments/:id` | Update appointment    |
| DELETE | `/appointments/:id` | Delete appointment    |

---

## Example Request

### Login

```http
POST /api/v1/login
```

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

---

### Create Appointment

```http
POST /api/v1/appointments
```

```json
{
  "appointmentDate": "2026-04-10T14:00:00.000Z",
  "reason": "Consultation",
  "customerId": "UUID",
  "providerId": "UUID"
}
```

---

## Architecture

This backend follows a layered architecture:

* **Routes** → Define endpoints
* **Controllers** → Handle request/response logic
* **Repositories** → Interact with database
* **Entities** → Define database schema

---

## Future Improvements

* JWT authentication
* Password hashing (bcrypt)
* Role-based route protection (middleware)
* Validation (Zod or class-validator)
* Logging & monitoring
* API documentation (Swagger)

---

## Development Notes

* `reflect-metadata` must be imported before TypeORM initialization
* Use `.js` extensions in imports (ESM compatibility)
* Keep `.env` out of version control
* Ensure database is running before starting server

---

## License

This project is for educational and development purposes.

---

## Author

Roger Smith
