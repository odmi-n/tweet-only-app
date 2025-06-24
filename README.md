# Tweet Only App

A simple Twitter-like application built with React (frontend) and Node.js Express (backend).

## Project Structure

```
tweet-only-app/
├── server/          # Node.js (Express) backend
│   ├── index.js
│   ├── package.json
│   └── .env          # Environment variables file (should be added to .gitignore)
└── client/          # React (Vite) frontend
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── components/
        │   └── TweetBox.jsx
        └── styles.css
```

## Setup Instructions

### 1. Install Dependencies

You need to install dependencies first as node_modules are not included in the repository:

#### Backend (Server)
```bash
cd server
npm install
```

#### Frontend (Client)
```bash
cd client
npm install
```

### 2. Configure Environment Variables

Configure your Twitter API token in the `server/env` file:

```
BEARER_TOKEN=your_twitter_bearer_token
PORT=4000
```

> ⚠️ **Note**: Environment variable files should normally be added to `.gitignore` to exclude them from version control. For this sample, we're using an `env` file.

### 3. Start the Application

#### Start the Backend Server
```bash
cd server
npm run dev
```
The server will run at http://localhost:4000.

#### Start the Frontend App (in a separate terminal)
```bash
cd client
npm run dev
```
The application will be available at http://localhost:5173.

## Features

- Tweet posting (up to 280 characters)
- Character counter
- Real-time validation
- Responsive design

## Important Notes

- Requires a Twitter API v2 Bearer Token
- The `env` file should not be committed to Git in production (add to `.gitignore`)
- Image upload and GIF functionality are not implemented

## Development

Use the `npm run dev` command for development with hot reloading enabled.

## License
MIT
