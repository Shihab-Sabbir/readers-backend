# Readers

Welcome to Readers, an online platform for buying and selling cows.

## Live Link

You can access the live version of the Readers application using the following link: [Readers Live](https://digital-cow-haat-auth.vercel.app/)

## Application Routes

## **Main Part**

### Authentication (User)

- **Login:** `POST https://digital-cow-haat-auth.vercel.app/api/v1/auth/login`
- **Signup:** `POST https://digital-cow-haat-auth.vercel.app/api/v1/auth/signup`
- **Refresh Token:** `POST https://digital-cow-haat-auth.vercel.app/api/v1/auth/refresh-token`

### Authentication (Admin)

- **Create Admin:** `POST https://digital-cow-haat-auth.vercel.app/api/v1/admins/create-admin`
- **Admin Login:** `POST https://digital-cow-haat-auth.vercel.app/api/v1/admins/login`

### User

- **Get All Users:** `GET https://digital-cow-haat-auth.vercel.app/api/v1/users`
- **Get User by ID:** `GET https://digital-cow-haat-auth.vercel.app/api/v1/users/648b6e443e0e4044c7e04450`
- **Update User:** `PATCH https://digital-cow-haat-auth.vercel.app/api/v1/users/648b6e443e0e4044c7e04450`
- **Delete User:** `DELETE https://digital-cow-haat-auth.vercel.app/api/v1/users/648b6e443e0e4044c7e04450`

### Cows

- **Create Cow:** `POST https://digital-cow-haat-auth.vercel.app/api/v1/cows`
- **Get All Cows:** `GET https://digital-cow-haat-auth.vercel.app/api/v1/cows`
- **Get Cow by ID:** `GET https://digital-cow-haat-auth.vercel.app/api/v1/cows/648c778320be52da6c60b178`
- **Update Cow:** `PATCH https://digital-cow-haat-auth.vercel.app/api/v1/cows/648c778320be52da6c60b178`
- **Delete Cow:** `DELETE https://digital-cow-haat-auth.vercel.app/api/v1/cows/648c778320be52da6c60b178`

### Orders

- **Create Order:** `POST https://digital-cow-haat-auth.vercel.app/api/v1/orders`
- **Get All Orders:** `GET https://digital-cow-haat-auth.vercel.app/api/v1/orders`

## **Bonus Part**

#### Admin

- **Create Admin:** `POST https://digital-cow-haat-auth.vercel.app/api/v1/admins/create-admin`

#### My Profile

- **Get My Profile:** `GET https://digital-cow-haat-auth.vercel.app/api/v1/users/my-profile`
- **Update My Profile:** `PATCH https://digital-cow-haat-auth.vercel.app/api/v1/users/my-profile`

#### Order

- **Get Order by ID:** `GET https://digital-cow-haat-auth.vercel.app/api/v1/orders/648c945c2e27b8342d900e0e`


Feel free to explore and interact with the Readers API!
# readers-backend
