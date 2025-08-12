# Notes API

A RESTful API for a note-taking application built with Node.js, Express, Prisma, and TypeScript. Users can register, login, create notes with categories, and manage their personal note collections.

## Features

- **User Authentication**: JWT-based authentication with access and refresh tokens
- **Note Management**: Create, read, update, and delete notes
- **Category System**: Organize notes with categories
- **Search Functionality**: Search notes by title, description, or category
- **Input Validation**: Zod schema validation for all endpoints
- **Security**: Password hashing with bcrypt, HTTP-only cookies for refresh tokens

## Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MySQL with Prisma ORM
- **Authentication**: JWT tokens
- **Validation**: Zod
- **Password Hashing**: bcrypt
- **Cookie Parsing**: cookie-parser

## Prerequisites

- Node.js (v14 or higher)
- MySQL database
- npm or yarn package manager

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd notes-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/notes_db"
   SECRET_KEY="your-jwt-secret-key"
   ```

4. **Database Setup**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run database migrations
   npx prisma migrate deploy
   ```

5. **Start the server**

   ```bash
   npm start
   # or for development
   npm run dev
   ```

   The server will start on `http://localhost:8000`

## API Documentation

### Authentication

All endpoints except `/login`, `/register`, and `/verify-token` require authentication via Bearer token in the Authorization header.

**Header Format:**

```
Authorization: Bearer <access_token>
```

### Auth Endpoints

#### Register User

- **POST** `/register`
- **Body:**
  ```json
  {
    "userName": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "data created successfully"
  }
  ```

#### Login User

- **POST** `/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Note:** Sets HTTP-only `refreshToken` cookie

#### Verify Token

- **GET** `/verify-token`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "message": "accessToken valid"
  }
  ```

#### Logout

- **GET** `/logout`
- **Response:**
  ```json
  {
    "message": "logout successfully"
  }
  ```

### User Endpoints

#### Get All Users

- **GET** `/user`
- **Response:**
  ```json
  {
    "users": [
      {
        "id": "uuid",
        "email": "john@example.com",
        "userName": "john_doe"
      }
    ]
  }
  ```

### Note Endpoints

#### Create Note

- **POST** `/note/create`
- **Body:**
  ```json
  {
    "title": "My First Note",
    "description": "This is a sample note description",
    "category": [
      { "categoryName": "Personal" },
      { "categoryName": "Important" }
    ]
  }
  ```
- **Response:**
  ```json
  {
    "message": "Note created"
  }
  ```

#### Get User Notes (with Search)

- **GET** `/note?s=<search_term>`
- **Query Parameters:**
  - `s`: Search term (supports prefixes):
    - `cat:term` - Search by category
    - `title:term` - Search by title
    - `desc:term` - Search by description
    - `term` - Search all fields
- **Examples:**
  - `/note?s=personal` - Search all fields for "personal"
  - `/note?s=cat:work` - Search categories for "work"
  - `/note?s=title:meeting` - Search titles for "meeting"
- **Response:**
  ```json
  {
    "notes": [
      {
        "id": 1,
        "title": "My First Note",
        "description": "This is a sample note",
        "date": "2025-01-10T12:00:00.000Z",
        "category": [
          {
            "id": 1,
            "name": "Personal"
          }
        ]
      }
    ]
  }
  ```

#### Get Note by ID

- **GET** `/note/:id`
- **Response:**
  ```json
  {
    "id": 1,
    "title": "My First Note",
    "description": "This is a sample note",
    "date": "2025-01-10T12:00:00.000Z",
    "category": [
      {
        "id": 1,
        "name": "Personal"
      }
    ]
  }
  ```

#### Delete Note

- **DELETE** `/note`
- **Body:**
  ```json
  {
    "id": "1"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Data deleted successfully"
  }
  ```

### Category Endpoints

#### Get User Categories

- **GET** `/category`
- **Response:**
  ```json
  {
    "categories": [
      {
        "id": 1,
        "name": "Personal"
      },
      {
        "id": 2,
        "name": "Work"
      }
    ]
  }
  ```

## Error Responses

### Validation Errors

```json
[
  {
    "email": {
      "message": "Invalid email"
    }
  }
]
```

### Authentication Errors

```json
{
  "message": "please login access token missing"
}
```

### Not Found Errors

```json
{
  "message": "email doesn't exist"
}
```

## Project Structure

```
src/
├── controller/          # Route handlers
│   ├── auth-controller.ts
│   ├── note-controller.ts
│   ├── user-controller.ts
│   └── category-controller.ts
├── middlewares/         # Custom middleware
│   ├── token-validator/
│   └── zod-validator/
├── routes/             # Route definitions
│   ├── auth-routes.ts
│   ├── note-routes.ts
│   ├── user-routes.ts
│   └── category-route.ts
├── utility/            # Helper functions
│   ├── bcrypt-hasher/
│   ├── token-generator/
│   ├── types/
│   └── verify-tokens.ts
├── zodSchema/          # Validation schemas
│   ├── register-schema.ts
│   ├── login-schema.ts
│   └── note-schema.ts
└── index.ts           # Main application file

prisma/
├── schema.prisma      # Database schema
├── migrations/        # Database migrations
└── connect/           # Database connection
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
