# node-rest-crud-api

A task-management REST API built with Node.js and Express. It supports full CRUD, pagination, sorting, request validation, consistent error responses and JSON/XML output. Built as a learning project to practice clean API design.

## 1. What this project proves

- **REST API design:** resource-based URLs, correct HTTP methods and status codes (201, 204, 400, 404), and the difference between PUT (full replace) and PATCH (partial update).
- **Layered architecture:** routes, controllers, services and a repository, so each layer has one job and the storage can be swapped later.
- **Validation and error handling:** Zod validates every request body, and one central error handler returns the same JSON shape for every failure.
- **Query features:** pagination and sorting with a whitelist of allowed fields.
- **Content negotiation:** the same data can be returned as JSON or XML.
- **API documentation:** an OpenAPI spec served as interactive Swagger UI, plus a Postman collection with tests.

## 2. Tech used and why

| Tech | Why |
|---|---|
| Node.js + Express | Minimal, widely used web framework for building REST APIs |
| Zod | Schema validation that also cleans input (trims strings, applies defaults) |
| fast-xml-parser | Builds correctly escaped XML from JavaScript objects for `?format=xml` |
| swagger-ui-express | Serves the OpenAPI spec as interactive docs at `/docs` |
| In-memory store | Keeps the focus on API design. Data resets on restart, so a real database is the next step (see section 6) |

## 3. Run it

```bash
git clone https://github.com/hitesh-17/node-rest-crud-api.git
cd node-rest-crud-api
npm install
cp .env.example .env
npm run dev
```

The API runs on `http://localhost:3000` (set `PORT` in `.env` to change it). Interactive docs are at `http://localhost:3000/docs`.

## 4. Screenshots

**Swagger UI**

Swagger UI
<img width="1905" height="910" alt="image" src="https://github.com/user-attachments/assets/23990df7-9d03-4e7c-a37c-5af7f83c5164" />
<img width="1917" height="915" alt="image" src="https://github.com/user-attachments/assets/f177a660-07a7-4586-8279-3e289da9fc71" />

Postman run
<img width="1917" height="1016" alt="image" src="https://github.com/user-attachments/assets/bd076266-7003-4798-929b-726a4cafe9dd" />

## API overview

Base URL: `/api/v1`

| Method | Path | Description | Success |
|---|---|---|---|
| GET | `/tasks` | List tasks (pagination, sorting) | 200 |
| GET | `/tasks/:id` | Get one task | 200 |
| POST | `/tasks` | Create a task | 201 |
| PUT | `/tasks/:id` | Replace a task (all fields required) | 200 |
| PATCH | `/tasks/:id` | Update some fields (at least one) | 200 |
| DELETE | `/tasks/:id` | Delete a task | 204 |

**List query parameters:** `page` (default 1), `limit` (1-50, default 10), `sortBy` (`createdAt`, `title`, `status`), `order` (`asc`, `desc`), `format` (`json`, `xml`).

**Error format** (same shape for every error):

```json
{ "error": { "message": "Task not found", "statusCode": 404 } }
```

Postman collection: `docs/task-api.postman_collection.json`

## 5. Decisions and trade-offs

The main ones:

- **Repository layer over in-memory storage:** the service never knows how data is stored, so switching to PostgreSQL later changes one file. The trade-off is that data is lost on restart.
- **Numeric auto-increment IDs:** simple to test and similar to SQL. A malformed id returns 400, and a valid id that doesn't exist returns 404.
- **PUT vs PATCH:** PUT requires every field and PATCH requires at least one, enforced by separate Zod schemas.
- **One central error handler:** services throw typed errors and the handler formats them. Unexpected errors return a generic 500 message and are logged on the server, so internals never leak.
- **XML on responses only:** request bodies stay JSON-only to keep validation in one place.

## 6. What I would improve

- Replace the in-memory store with PostgreSQL (next project)
- Add automated tests (Jest and Supertest) and a CI pipeline
- Add authentication and role-based access
- Add rate limiting and structured logging
- Containerize with Docker and deploy to the cloud


