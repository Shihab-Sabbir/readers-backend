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

Feel free to explore and interact with the Readers API!

# readers-backend
