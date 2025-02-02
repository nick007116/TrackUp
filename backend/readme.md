# Backend

This is the backend of the application.

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository
2. Navigate to the `backend` directory
3. Run `npm install` to install dependencies
4. Create a `.env` file with the following variables:
    ```
    MONGODB_URI=mongodb://localhost:27017/school_app
    JWT_SECRET=your_jwt_secret_key
    PORT=5000
    ```
5. Run `npm run create-admin` to create an admin user
6. Run `npm src/index.js` to start the server

### Scripts

- `npm src/index.js`: Start the server
- `npm run dev`: Start the server with nodemon
- `npm run create-admin`: Create an admin user