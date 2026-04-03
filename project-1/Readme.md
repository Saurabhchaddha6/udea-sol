## ⚙️ Setup Steps

### 1. Clone the repository
```
git clone https://github.com/Saurabhchaddha6/udea-sol
cd project
```

### 2. Install dependencies
```
npm install
```

### 3. Create `.env` file

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Run the server
```
npm run dev
```

---

## 🔐 Environment Variables

| Variable     | Description                      |
|-------------|--------------------------------|
| MONGO_URI   | MongoDB connection string       |
| JWT_SECRET  | Secret key for JWT              |

---

## 📦 API Endpoints

### 🔐 Auth

#### Register
```
POST /auth/register
Body: { email, password }
```

#### Login
```
POST /auth/login
Body: { email, password }
```

---

### 📦 Products

#### Get All Products (Pagination + Filtering)
```
GET /products?page=1&limit=10&minPrice=500&maxPrice=2000&name=iphone
```

#### Get Product by ID
```
GET /products/:id
```

#### Create Product
```
POST /products
Headers: Authorization: Bearer <token>
Body: { name, price }
```

#### Update Product
```
PUT /products/:id
Headers: Authorization: Bearer <token>
Body: { name?, price? }
```

#### Delete Product
```
DELETE /products/:id
Headers: Authorization: Bearer <token>
```

---

## 🚦 Features

- JWT Authentication
- Global Error Handling
- Zod Validation
- Pagination & Filtering
- Token Bucket Rate Limiting

---
