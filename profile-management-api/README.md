# Profile Management API

This project provides a basic API for managing customer profiles and authorized users. The API uses JSON Web Tokens (JWT) for authorization.

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Install the necessary dependencies.

```bash
npm install
```

## Running the API

To start the API server, run:

```bash
npm start
```

The API will be running on port 5000.

## API Endpoints

### Get Customer Profile

**Request:**

- **Method:** GET
- **URL:** `http://localhost:5000/api/profile?userId=user1`

### Update Customer Profile

**Request:**

- **Method:** POST
- **URL:** `http://localhost:5000/api/profile`
- **Body:**

  ```json
  {
    "userId": "user1",
    "name": "John Doe Updated",
    "email": "john.doe.updated@example.com",
    "contactNumber": "123-456-7890",
    "billingAddress": "123 Main St, Anytown, USA"
  }
  ```

### Get Authorized Users

**Request:**

- **Method:** GET
- **URL:** `http://localhost:5000/api/authorized-users?userId=user1`

### Add Authorized User

**Request:**

- **Method:** POST
- **URL:** `http://localhost:5000/api/authorized-users`
- **Body:**

  ```json
  {
    "userId": "user1",
    "authorizedUser": {
      "email": "new.user@example.com",
      "phone": "111-222-3333",
      "name": "New User",
      "age": 30,
      "relationship": "Friend"
    }
  }
  ```

## Authorization with JWT

The API uses JSON Web Tokens (JWT) for authorization. To test the API endpoints, you need to generate a JWT token.

### Generating a JWT Token

1. Go to [jwt.io](https://jwt.io/).
2. In the **Header** section, use the following JSON:

   ```json
   {
     "alg": "HS256",
     "typ": "JWT"
   }
   ```

3. In the **Payload** section, use the following JSON:

   ```json
   {
     "sub": "user1",
     "name": "John Doe",
     "iat": 1516239022
   }
   ```

4. In the **Verify Signature** section, use the secret key:

   ```plaintext
   your-256-bit-secret
   ```

5. Copy the generated JWT token from the **Encoded** section.

6. If your secret key is not base64 encoded (like your-256-bit-secret), you can leave the "secret base64 encoded" box unchecked on jwt.io.

### Using the JWT Token in Postman

1. Open Postman.
2. For each request, go to the **Headers** tab.
3. Add a new header with the following details:
   - **Key:** `Authorization`
   - **Value:** `Bearer <your_jwt_token>`
4. Replace `<your_jwt_token>` with the JWT token you generated.

## Example Requests

### Get Customer Profile Example

**Request:**

- **Method:** GET
- **URL:** `http://localhost:5000/api/profile?userId=user1`
- **Headers:**
  - **Authorization:** `Bearer <your_jwt_token>`

### Update Customer Profile Example

**Request:**

- **Method:** POST
- **URL:** `http://localhost:5000/api/profile`
- **Headers:**
  - **Authorization:** `Bearer <your_jwt_token>`
- **Body:**

  ```json
  {
    "userId": "user1",
    "name": "John Doe Updated",
    "email": "john.doe.updated@example.com",
    "contactNumber": "123-456-7890",
    "billingAddress": "123 Main St, Anytown, USA"
  }
  ```

### Get Authorized Users Example

**Request:**

- **Method:** GET
- **URL:** `http://localhost:5000/api/authorized-users?userId=user1`
- **Headers:**
  - **Authorization:** `Bearer <your_jwt_token>`

### Add Authorized User Example

**Request:**

- **Method:** POST
- **URL:** `http://localhost:5000/api/authorized-users`
- **Headers:**
  - **Authorization:** `Bearer <your_jwt_token>`
- **Body:**

  ```json
  {
    "userId": "user1",
    "authorizedUser": {
      "email": "new.user@example.com",
      "phone": "111-222-3333",
      "name": "New User",
      "age": 30,
      "relationship": "Friend"
    }
  }
  ```

By following these instructions, you can generate a JWT token and use it to test the API endpoints with Postman.
