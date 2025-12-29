# gemini-clone

This is a small Vite + React prototype that integrates with Google Gemini (Generative Language API) via a local server proxy.

## ▶️ View locally (recommended)

1. Install dependencies: `npm install`
2. Quick start (recommended for development):

	- Install dependencies: `npm install`
	- Start both server and frontend in one terminal: `npm run start:all` (opens frontend at `http://localhost:5173`, server at `http://localhost:5178`)

	Or start pieces separately:

	- Start server only: `npm run start:server` (server listens on `http://localhost:5178`)
	- Start frontend only: `npm run dev` (open `http://localhost:5173`)

### Gemini API (server proxy)

The project includes a minimal server at `./server` that forwards prompts to Google's Generative Language API (Gemini). This keeps your API key out of the browser.

Local behavior:
- If `GOOGLE_API_KEY` is **not** set, the server returns a **helpful simulated reply** (useful for testing the UI). The simulated reply is a simple heuristic-based answer and is **not** a real model response.
- If `GOOGLE_API_KEY` **is** set (in `server/.env` or environment), the server will attempt to forward the prompt to the Generative Language API and return real replies.

Steps to use:

1. Copy `.env.example` to `.env` and set `GOOGLE_API_KEY` (optional, for real Gemini replies).
2. From the project root run:
	- `cd server && npm install`
	- `npm run start:server` (or `npm start` from project root)
3. Start the frontend dev server: `npm run dev`
4. In the app, type a prompt in the input and click send — responses will be generated and added to the sidebar. If you see a message that says it's a simulated/local response, set `GOOGLE_API_KEY` to get real Gemini replies.

Security note: Do NOT commit your `.env` file. Keep your API key secret.
