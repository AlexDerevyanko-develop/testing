# API Documentation для Backend

Базовый URL: `https://ulearn.fit/api`

## Endpoints

### 1. GET `/user`

**Описание**: Получение информации о текущем авторизованном пользователе

**Headers**:

```
Authorization: Bearer {jwt_token}
```

**Response Success (200)**:

```json
{
  "id": 1,
  "email": "user@example.com",
  "firstName": "Иван",
  "lastName": "Иванов",
  "age": 25
}
```

**Response Error (401)**:

```json
{
  "message": "Unauthorized"
}
```

**Важно**: При возврате 401 фронтенд автоматически перенаправляет на страницу `/auth`

---

### 2. POST `/auth/login`

**Описание**: Авторизация пользователя

**Headers**:

```
Content-Type: application/json
```

**Request Body**:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Валидация**:

- `email` - обязательное поле, валидный email
- `password` - обязательное поле, строка

**Response Success (200)**:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "Иван",
    "lastName": "Иванов",
    "age": 25
  }
}
```

**Response Error (400/401)**:

```json
{
  "message": "Неверный email или пароль"
}
```

**Другие возможные ошибки**:

```json
{
  "message": "Email не найден"
}
```

```json
{
  "message": "Неверный пароль"
}
```

---

### 3. POST `/auth/register`

**Описание**: Регистрация нового пользователя

**Headers**:

```
Content-Type: application/json
```

**Request Body**:

```json
{
  "email": "newuser@example.com",
  "password": "securepassword123",
  "firstName": "Петр",
  "lastName": "Петров",
  "age": 30
}
```

**Валидация**:

- `email` - обязательное поле, валидный email, уникальный
- `password` - обязательное поле, строка (минимум 6 символов рекомендуется)
- `firstName` - обязательное поле, строка
- `lastName` - обязательное поле, строка
- `age` - обязательное поле, число от 1 до 120

**Response Success (200/201)**:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 2,
    "email": "newuser@example.com",
    "firstName": "Петр",
    "lastName": "Петров",
    "age": 30
  }
}
```

**Response Error (400)**:

```json
{
  "message": "Пользователь с таким email уже существует"
}
```

**Другие возможные ошибки**:

```json
{
  "message": "Неверный формат email"
}
```

```json
{
  "message": "Все поля обязательны для заполнения"
}
```

```json
{
  "message": "Возраст должен быть числом от 1 до 120"
}
```

---

## Технические детали

### JWT Token

- Токен должен содержать `user.id` или `user.email` для идентификации пользователя
- Токен передается в header `Authorization: Bearer {token}`
- Рекомендуемое время жизни токена: 7 дней

### CORS

Убедись, что CORS настроен для домена фронтенда

### Стандарты ответов

- Успешные запросы: статус 200 или 201
- Ошибки авторизации: статус 401
- Ошибки валидации: статус 400
- Серверные ошибки: статус 500

### Безопасность

- Пароли должны хэшироваться (bcrypt рекомендуется)
- Использовать HTTPS
- JWT secret должен быть в переменных окружения

---

## Примеры использования

### Регистрация нового пользователя

```bash
curl -X POST https://ulearn.fit/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123",
    "firstName": "Test",
    "lastName": "User",
    "age": 25
  }'
```

### Вход в систему

```bash
curl -X POST https://ulearn.fit/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```

### Получение данных пользователя

```bash
curl -X GET https://ulearn.fit/api/user \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```
