# Backend Wizards — Stage 0: Dynamic Profile Endpoint

This project implements a simple REST API with a single endpoint `GET /me` that returns your profile and a dynamic cat fact fetched from the Cat Facts API.

## Features
- GET `/me` returns JSON with:
  - `status: "success"`
  - `user`: `{ email, name, stack }`
  - `timestamp`: current UTC time in ISO 8601
  - `fact`: random cat fact from `https://catfact.ninja/fact`
- Uses async/await, timeout, no-store cache, and minimal CORS headers
- Environment-driven `user` values via `process.env`

## Tech Stack
- Node.js (>= 18)
- Express
- Axios
- dotenv

## Getting Started (Local)
1. Install dependencies:
```bash
npm install
```
2. Create a `.env` file in the project root with your details:
```bash
MY_EMAIL=you@example.com
MY_NAME=Your Full Name
MY_STACK=Node.js/Express
PORT=3000
```
3. Start the server:
```bash
npm run start
```
Or run with file watching (Node 18+):
```bash
npm run dev
```
4. Test the endpoint:
```bash
curl -i http://localhost:3000/me
```
Expect a `200 OK` and a JSON body matching the required schema.

## Endpoint Contract
Request:
- Method: `GET`
- Path: `/me`
- Headers set by server:
  - `Content-Type: application/json`
  - `Cache-Control: no-store`
  - `Access-Control-Allow-Origin: *`

Response JSON structure:
```json
{
  "status": "success",
  "user": {
    "email": "<your email>",
    "name": "<your full name>",
    "stack": "<your backend stack>"
  },
  "timestamp": "<current UTC ISO 8601>",
  "fact": "<random cat fact>"
}
```

## Deployment (Railway)
1. Create a new project on Railway (`https://railway.app`).
2. Connect your GitHub repo or deploy from the CLI.
3. Set environment variables in Railway:
   - `MY_EMAIL`, `MY_NAME`, `MY_STACK`, `PORT` (Railway may set `PORT` automatically).
4. Deploy and note your public URL.
5. Verify:
```bash
curl -i https://<your-railway-domain>/me
```

## Troubleshooting
- If the Cat Facts API times out or fails, the API returns `status: "success"` with a friendly fallback `fact` and a fresh `timestamp`.
- Ensure machine or Railway allows outbound HTTPS to `catfact.ninja`.
- Confirm `.env` variables are set in your environment.


