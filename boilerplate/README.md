

# **📌 NilaJS - Scalable & Lightweight JS backend framework**
**NilaJS** is a **Scalable & Lightweight JS backend framework** designed with a clean architecture, following **MVC (Model-View-Controller)** and service-based design patterns. It includes **authentication, validations, error handling, socket handling, and a structured folder hierarchy** for easy scalability.

---

## **📁 Folder Structure**
```
NilaJS
│── config/
│   ├── mongoose.js
│── controllers/
│   ├── user.controller.js
│── models/
│   ├── user.model.js
│── node_modules/  
│── routes/v1/
│   ├── routes.js
│── services/user/
│   ├── auth.service.js
│   ├── user.service.js
│── utils/
│   ├── error.handler.js
│   ├── memory.handler.js
│   ├── socket.handler.js
│── validations/user/
│   ├── auth.validation.js
│   ├── user.validation.js
│── .env
│── .env.example
│── .gitignore
│── index.js
│── package-lock.json
│── package.json
│── README.md
```

---

## **📂 Folder & File Explanations**
### **1️⃣ `config/`**
Stores configuration files for external services or database connections.
- **`mongoose.js`** → Initializes and configures MongoDB using Mongoose.

### **2️⃣ `controllers/`**
Contains route handlers that process requests and return responses.
- **`user.controller.js`** → Manages user-related logic (e.g., register, login, CRUD).

### **3️⃣ `models/`**
Defines database schemas and models using Mongoose.
- **`user.model.js`** → Defines the User schema with fields like `name`, `email`, `password`.

### **4️⃣ `routes/v1/`**
Defines API routes and maps them to controllers.
- **`routes.js`** → Centralized API routing for version 1 (`v1`).

### **5️⃣ `services/user/`**
Contains business logic and reusable service functions.
- **`auth.service.js`** → Handles authentication logic (e.g., password hashing, token generation).
- **`user.service.js`** → Handles user-related operations (e.g., CRUD, profile updates).

### **6️⃣ `utils/`**
Utility functions for handling errors, memory monitoring, and sockets.
- **`error.handler.js`** → Centralized error handling middleware.
- **`memory.handler.js`** → Monitors memory usage and prevents leaks.
- **`socket.handler.js`** → Handles WebSocket (`socket.io`) connections.

### **7️⃣ `validations/user/`**
Handles request validations using libraries like **Joi** or **Express Validator**.
- **`auth.validation.js`** → Validates authentication-related requests (e.g., login, register).
- **`user.validation.js`** → Validates user data inputs for CRUD operations.

### **8️⃣ Root Files**
- **`.env`** → Stores environment variables (e.g., database URL, API keys).
- **`.env.example`** → Example `.env` file for developers.
- **`.gitignore`** → Prevents unnecessary files from being committed.
- **`index.js`** → Entry point of the application, initializes Express server.
- **`package.json`** → Lists dependencies, scripts, and project metadata.
- **`README.md`** → Documentation for the project.

---

## **🚀 Getting Started**
### **1️⃣ Install Dependencies**
```sh
npm install
```
### **2️⃣ Set Up Environment Variables**
Rename `.env.example` to `.env` and update the necessary values.

### **3️⃣ Run the Server**
```sh
npm start   # Start the server
```
or using **nodemon** (for auto-restart on changes):
```sh
npm run dev
```

---

## **🛠 Available Scripts**
| Command             | Description                           |
|---------------------|---------------------------------------|
| `npm start`        | Starts the Express server.           |
| `npm run dev`      | Starts the server with **nodemon**.  |
| `npm run lint`     | Runs ESLint for code quality checks. |
| `npm test`         | Runs test cases.                     |

---

## **📬 API Endpoints (Example)**
| Method | Endpoint           | Description        |
|--------|--------------------|--------------------|
| `POST` | `/api/v1/register` | Register a user   |
| `POST` | `/api/v1/login`    | Login user        |
| `GET`  | `/api/v1/users`    | Get all users     |

---

## **🌍 Environment Configuration Guide**
### **📌 Prerequisites**
- Ensure you have Node.js installed on your system.
- A `.env` file should be created in the root directory of the project.
- Do not expose sensitive credentials in public repositories.

### **⚙️ Setup Instructions**
1. **Create a `.env` file** in the root directory of the project if it does not already exist.
2. **Copy the following template into your `.env` file and update the values accordingly:**

```ini
# Node.js environment setting
NODE_ENV=development

# Application server port
PORT=3000

# Application name
APP_NAME="NilaJS"

# Base URL of the application
APP_URL="http://localhost:3000"

# MongoDB connection string
MONGODB_URL="mongodb://localhost:27017/mydatabase"

# Secret key for encryption/decryption
SECRET_KEY="SECRET_KEY_FOR_ENCRYPTION_AND_DECRYPTION"

# JWT secret key for authentication
JWT_SECRET="JWT_SECRET_KEY"

# Whitelisted domains for CORS (comma-separated values)
WHITE_LISTED_DOMAINS="http://localhost:4200, http://localhost:3000"

# SMTP email configurations
SMTP_HOST=smtp.zoho.com  
SMTP_PORT=465  
SMTP_USERNAME=email@mailinator.com  
SMTP_PASSWORD=appPassword  
EMAIL_FROM=email@mailinator.com  
```

### **⚠️ Notes**
- **Update all values as per your environment.**
- **Use strong and unique keys for `SECRET_KEY` and `JWT_SECRET`.**
- **For production, avoid hardcoding secrets; use a secure vault or environment variable manager.**
- **Ensure the `.env` file is added to `.gitignore` to prevent exposing sensitive information.**

### **🔐 Security Considerations**
- Never commit the `.env` file to version control.
- Use environment variable management tools like **dotenv**, **AWS Secrets Manager**, or **Vault** for production setups.
- Regularly rotate your secret keys and credentials.

---

## **📌 Notes**
- Uses **Mongoose** for MongoDB.
- Uses **Joi** for validations.
- Uses **Socket.io** for real-time updates.
- Includes **error handling middleware**.
- Follows **MVC & Service-based structure**.

---

## **📜 License**
This project is licensed under the **MIT License**.

---
