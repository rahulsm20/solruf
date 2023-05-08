# API Documentation 
### [Live endpoint](https://typescript-express-api.vercel.app/)
### Tech stack
* Typescript
* Node.js
* ExpressJS
* Testing
  * Jest
  * Supertest
* Database
  * MySQL
* Authentication 
  * JWT

### Steps to use the API
1. Register using the /users/signup route.
2. Grab the token and use it as the Authorization header to sign in.
3. Sign in and uses /assets/ routes to add, delete, update or read assets.
Note: Sign in tokens expire after 1 hour.

## Endpoints
### /users
* `POST /users/signup` - Sign up a new user
  * Request body:
  ```
  {
    "email": "user@example.com",
    "password": "password"
  }
  ```
  * Response: `200 OK`
  ```
  {
    "message": "New user added"
  }
  ```
  * Errors:
    * `400 Bad Request` - If request body is invalid or missing fields
    * `500 Internal Server Error` - If server encounters an error while signing up user

* `POST /users/signin` - Sign in a user
  * Request body:
  ```
  {
    "email": "user@example.com",
    "password": "password"
  }
  ```
  * Response: `200 OK`
  ```
  {
    "result": {
      "id": 1,
      "email": "user@example.com",
      "password": "$2b$10$w6jKTY6CQYceZiURRZQXYeI0NlLjxdCT1z4Tkq3BqPkkB0.lYFnhS"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
### /assets
* `GET /assets/` - Retrieve all assets
  * Auth: Required
  * Response: `200 OK`
  ```
  [
    {
      "category": "property",
      "amount": 50000
    },
    {
      "category": "stocks",
      "amount": 20000
    },
    ...
  ]
  ```
  * Errors: 
    * `401 Unauthorized` - If user is not authenticated
    * `500 Internal Server Error` - If server encounters an error while retrieving assets

* `POST /assets/add` - Add a new asset
  * Auth: Required
  * Request body:
  ```
  {
    "category": "savings",
    "amount": 10000
  }
  ```
  * Response: `202 Accepted`
  ```
  {
    "message": "Asset added"
  }
  ```
  * Errors:
    * `401 Unauthorized` - If user is not authenticated
    * `400 Bad Request` - If request body is invalid or missing fields
    * `500 Internal Server Error` - If server encounters an error while adding asset

* `PUT /assets/update` - Update an asset
  * Auth: Required
  * Request parameters:
    * `category`: The category of the asset to be updated
    * `amount`: The new amount for the asset
  * Request body:
  ```
  {
    "category": "savings",
    "amount": 10000
  }
  ```
  * Response: `202 Accepted`
  ```
  {
    "message": "Asset updated: {category}"
  }
  ```
  * Errors:
    * `401 Unauthorized` - If user is not authenticated
    * `400 Bad Request` - If query parameters are invalid or missing
    * `500 Internal Server Error` - If server encounters an error while updating asset

* `DELETE /assets?category={category}` - Delete an asset
  * Auth: Required
  * Request query parameters:
    * `category`: The category of the asset to be deleted
  * Response: `202 Accepted`
  ```
  {
    "message": "Asset deleted: {category}"
  }
  ```
  * Errors:
    * `401 Unauthorized` - If user is not authenticated
    * `400 Bad Request` - If query parameters are invalid or missing
    * `500 Internal Server Error` - If server encounters an error while deleting asset

### Successful test

![](https://user-images.githubusercontent.com/77540672/236679275-2567521a-66c1-4403-8437-d529d004476c.png)
  }