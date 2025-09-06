# 🔐 Authentication & Authorization Setup

This project implements **JWT-based authentication and email verification** with OTP (One-Time Password).

---

## 🚀 Features

- ✅ User **registration with OTP verification**
- ✅ User **login with JWT tokens**
- ✅ Middleware for **protected routes**
- ✅ Token storage in **HTTP-only cookies**
- ✅ Error handling for invalid or missing tokens

---

## 📂 Project Structure

/project-root
│── /controllers
│ └── authController.js
│── /middleware
│ └── userAuth.js
│── /routes
│ └── authRoutes.js
│ └── userRoutes.js
│── /utils
│ └── sendEmail.js
│── server.js

---

## 🔑 API Endpoints

### **Auth Routes**

| Method | Endpoint               | Description                   | Protected |
| ------ | ---------------------- | ----------------------------- | --------- |
| POST   | `/api/auth/register`   | Register user + send OTP      | ❌        |
| POST   | `/api/auth/verify-otp` | Verify OTP & activate account | ❌        |
| POST   | `/api/auth/login`      | Login & issue JWT             | ❌        |
| GET    | `/api/auth/logout`     | Logout (clear cookies)        | ✅        |

### **User Routes**

| Method | Endpoint         | Description        | Protected |
| ------ | ---------------- | ------------------ | --------- |
| GET    | `/api/user/data` | Fetch user profile | ✅        |

---

## ⚙️ Middleware

### `userAuth.js`

- Extracts JWT from `req.cookies`
- Verifies token with secret key
- Attaches `req.userId` for controllers
- Blocks unauthorized access

---

## 📌 Example Register Flow

1. **POST** `/api/auth/register` with `{ name, email, password }`
2. OTP is sent via email
3. **POST** `/api/auth/verify-otp` with `{ email, otp }`
4. Account is activated
5. **POST** `/api/auth/login` → returns JWT in HTTP-only cookie

---

## 🛠️ Technologies Used

- **Node.js + Express.js**
- **MongoDB + Mongoose**
- **JWT (jsonwebtoken)**
- **Nodemailer** (for sending OTP emails)
- **cookie-parser** (for JWT cookies)

---

# 🔐 Personal Project Auth API

This is a **JWT + Cookie based authentication system** with account verification, password reset, and secure routes.

---

## 📖 API Documentation

```yaml
info:
  title: Personal Project Auth API
  version: 1.0.0
servers:
  - url: http://localhost:4000
paths:
  /api/auth/register:
    post:
      summary: Register a new user (sets cookie)
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/RegisterRequest"
      responses:
        "200":
          description: Success
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/BasicResponse"
  /api/auth/login:
    post:
      summary: Login user (sets cookie)
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/LoginRequest"
      responses:
        "200":
          description: Success
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/BasicResponse"
  /api/auth/logout:
    post:
      summary: Logout (clears cookie)
      responses:
        "200":
          description: Success
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/MessageResponse"
  /api/auth/send-verify-otp:
    post:
      summary: Send verification OTP to the logged-in user
      responses:
        "200":
          description: OTP sent
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/MessageResponse"
      security:
        - cookieAuth: []
  /api/auth/verify-account:
    post:
      summary: Verify authenticated user's account using OTP
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/VerifyOtpRequest"
      responses:
        "200":
          description: Verified
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/MessageResponse"
      security:
        - cookieAuth: []
  /api/auth/is-auth:
    post:
      summary: Check authentication (middleware)
      responses:
        "200":
          description: Authenticated
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/BasicResponse"
      security:
        - cookieAuth: []
  /api/auth/send-reset-otp:
    post:
      summary: Send password reset OTP to email
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/SendResetOtpRequest"
      responses:
        "200":
          description: OTP sent
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/MessageResponse"
  /api/auth/reset-password:
    post:
      summary: Reset password with OTP
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/ResetPasswordRequest"
      responses:
        "200":
          description: Password reset
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/MessageResponse"
  /api/user/data:
    get:
      summary: Get authenticated user data
      responses:
        "200":
          description: User data
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/UserDataResponse"
      security:
        - cookieAuth: []

components:
  securitySchemes:
    cookieAuth:
      type: apiKey
      in: cookie
      name: token

  schemas:
    BasicResponse:
      type: object
      properties:
        success:
          type: boolean
    MessageResponse:
      type: object
      properties:
        success:
          type: boolean
        message:
          type: string
    RegisterRequest:
      type: object
      required: [name, email, password]
      properties:
        name: { type: string }
        email: { type: string, format: email }
        password: { type: string }
    LoginRequest:
      type: object
      required: [email, password]
      properties:
        email: { type: string, format: email }
        password: { type: string }
    VerifyOtpRequest:
      type: object
      required: [otp]
      properties:
        otp: { type: string }
    SendResetOtpRequest:
      type: object
      required: [email]
      properties:
        email: { type: string, format: email }
    ResetPasswordRequest:
      type: object
      required: [email, otp, newPassword]
      properties:
        email: { type: string, format: email }
        otp: { type: string }
        newPassword: { type: string }
    UserDataResponse:
      type: object
      properties:
        success: { type: boolean }
        userdata:
          type: object
          properties:
            name: { type: string }
            isAccountVerified: { type: boolean }
```
