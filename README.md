# DeltaBrains Test Backend

## Overview

This is the backend service for the DeltaBrains Test project. It is a RESTful API built with Express and TypeScript.

## Tech Stack

- **Framework**: Express.js
- **Database**: MySQL with Sequelize ORM
- **Validation**: Zod
- **Logging**: Winston
- **API Documentation**: Swagger

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/backend.git
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file with the required environment variables (e.g., database connection, port, etc.).

## Usage

### Development Mode

Run the following command to start the server in development mode:

```sh
npm run dev
```

### Build and Start in Production

```sh
npm run build
npm start
```

## API Documentation

Swagger documentation is available at:

```sh
http://localhost:<port>/v1/docs
```
