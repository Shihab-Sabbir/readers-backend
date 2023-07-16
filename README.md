# Readers backend

Welcome to Readers, an online platform for reading books.

## Live Link

You can access the live version of the Readers application using the following link: [Readers Live](https://readers-backend.vercel.app/)

## Application Routes

## **Main Part**

### Authentication (User)

- **Signin:** `POST https://readers-backend.vercel.app/api/v1/auth/login`
- **Signup:** `POST https://readers-backend.vercel.app/api/v1/auth/signup`

### Books

- **Create Book:** `POST https://readers-backend.vercel.app/api/v1/products`
- **Get All Books:** `GET https://readers-backend.vercel.app/api/v1/products`
- **Get Book by ID:** `GET https://readers-backend.vercel.app/api/v1/products/64b3c4f3d628cb828720b1e5`
- **Add Review:** `GET https://readers-backend.vercel.app/api/v1/products/review/64b3c4f3d628cb828720b1e5`
- **Update Book:** `PATCH https://readers-backend.vercel.app/api/v1/products/64b3c4f3d628cb828720b1e5`
- **Delete Book:** `DELETE https://readers-backend.vercel.app/api/v1/products/64b3c4f3d628cb828720b1e5`

## **Bonus Part**

- **Add Book to Wishlist:** `PATCH https://readers-backend.vercel.app/api/v1/products/wish/64b3c4f3d628cb828720b1e5`
- **Add Book to Reading List:** `PATCH https://readers-backend.vercel.app/api/v1/products/read-list/64b3c4f3d628cb828720b1e5`
- **Change Book Reading Status:** `PATCH https://readers-backend.vercel.app/api/v1/products/read-status/64b3c4f3d628cb828720b1e5`


## Used Technologies

- **bcrypt**: A library for hashing passwords and comparing hashed passwords.
- **body-parser**: A middleware for parsing incoming request bodies in Express.
- **cookie-parser**: A middleware for parsing cookies in Express.
- **cors**: A middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.
- **dotenv**: A zero-dependency module for loading environment variables from a `.env` file.
- **express**: A fast and minimalist web application framework for Node.js.
- **http-status**: A library that provides a set of HTTP status codes as constants.
- **jsonwebtoken**: A library for generating and verifying JSON Web Tokens (JWT).
- **mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
- **winston**: A versatile logging library for Node.js.
- **winston-daily-rotate-file**: A transport for Winston that rotates log files on a daily basis.
- **zod**: A TypeScript-first schema validation library.

#### For development:

- **ts-node-dev**: A TypeScript execution environment and development server with automatic restarts.
- **typescript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **eslint**: A pluggable linting utility for JavaScript and TypeScript.
- **prettier**: A code formatter that helps maintain consistent code style.
- **husky**: A Git hook framework to facilitate running scripts before commits.
- **lint-staged**: A tool that allows running scripts on staged files in Git.

Feel free to explore and interact with the Readers API!


