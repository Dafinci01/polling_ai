# Next.js Polling Application

A modern polling application built with Next.js, TypeScript, Tailwind CSS, and Shadcn UI components. This application allows users to create polls, vote on polls, and view poll results.

## Features

- User authentication (signup and login)
- Create polls with multiple options
- Vote on polls
- View poll results
- Responsive design with dark/light mode support

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **Form Handling**: React Hook Form, Zod validation
- **State Management**: React Hooks
- **API**: Next.js API Routes

## Getting Started

### Prerequisites

- Node.js 16.8.0 or later
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/polling-app.git
cd polling-app
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Run the development server

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
/src
  /app                 # Next.js App Router
    /api               # API Routes
      /auth            # Authentication API
      /polls           # Polls API
    /auth              # Authentication Pages
    /polls             # Poll Pages
    layout.tsx         # Root Layout
    page.tsx           # Home Page
  /components          # React Components
    /auth              # Authentication Components
    /polls             # Poll Components
    /ui                # UI Components
  /lib                 # Utility Functions
    types.ts           # TypeScript Types
    utils.ts           # Utility Functions
  /styles              # Global Styles
```

## API Routes

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login a user

### Polls

- `GET /api/polls` - Get all polls
- `POST /api/polls` - Create a new poll
- `GET /api/polls/[id]` - Get a specific poll
- `PUT /api/polls/[id]` - Vote on a poll
- `DELETE /api/polls/[id]` - Delete a poll

## Future Improvements

- Add real database integration
- Implement user profiles
- Add social sharing for polls
- Implement poll analytics
- Add poll expiration dates