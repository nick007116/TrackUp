# TrackUp

TrackUp is a comprehensive application designed to manage and track academic activities. It includes both a backend and a frontend component. This README provides detailed instructions on how to set up and run both components.

## Table of Contents

- [TrackUp](#trackup)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
    - [Installation](#installation)
    - [Configuration](#configuration)
    - [Running the Backend](#running-the-backend)
    - [Scripts](#scripts)
  - [Frontend Setup](#frontend-setup)
    - [Installation](#installation-1)
    - [Running the Frontend](#running-the-frontend)
    - [Scripts](#scripts-1)
  - [Project Structure](#project-structure)
    - [Backend Structure](#backend-structure)
    - [Frontend Structure](#frontend-structure)
  - [API Endpoints](#api-endpoints)
    - [Authentication](#authentication)
    - [Teacher Management](#teacher-management)
    - [Student Management](#student-management)
    - [Data Upload](#data-upload)
    - [Statistics](#statistics)
  - [Environment Variables](#environment-variables)
  - [Contributing](#contributing)
  - [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (v4 or higher)
- [Git](https://git-scm.com/)

## Backend Setup

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/nick007116/TrackUp.git
    ```

2. Navigate to the [backend](http://_vscodecontentref_/0) directory:
    ```sh
    cd TrackUp/backend
    ```

3. Install the dependencies:
    ```sh
    npm install
    ```

### Configuration

1. Create a `.env` file in the [backend](http://_vscodecontentref_/1) directory with the following variables:
    ```plaintext
    MONGODB_URI=mongodb://localhost:27017/school_app
    JWT_SECRET=your_jwt_secret_key
    PORT=5000
    ```

### Running the Backend

1. To start the backend server, run:
    ```sh
    node src/index.js
    ```

### Scripts

- `npm start`: Start the server
- `npm run dev`: Start the server with nodemon for development
- `npm run create-admin`: Create an admin user

## Frontend Setup

### Installation

1. Navigate to the [frontend](http://_vscodecontentref_/2) directory:
    ```sh
    cd ../frontend
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

### Running the Frontend

1. To start the frontend development server, run:
    ```sh
    npm start
    ```

### Scripts

- `npm start`: Start the development server
- `npm run build`: Build the application for production
- [npm test](http://_vscodecontentref_/3): Run tests
- `npm run eject`: Eject the configuration

## Project Structure

### Backend Structure
