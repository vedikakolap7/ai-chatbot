# AI Chatbot - Real-Time Chat Interface

A modern, real-time AI chatbot application built with Next.js and Socket.IO, powered by Google's Gemini AI. Features a sleek glassmorphic UI with streaming responses for a seamless chat experience.

##  Table of Contents

- [Project Description](#project-description)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Commands](#commands)
- [Features](#features)
- [Time Spent](#time-spent)

##  Project Description

This is a full-stack AI chatbot application that enables real-time conversations with Google's Gemini AI. The application uses Socket.IO for bidirectional communication and implements streaming responses for a responsive user experience. The frontend features a modern glassmorphic design with smooth animations and a clean, intuitive interface.

##  Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18.3.1** - UI library
- **TypeScript 5.9.3** - Type safety
- **Lucide React** - Icon library

### Backend
- **Socket.IO 4.8.1** - Real-time bidirectional communication
- **Google Generative AI SDK** (`@google/generative-ai`) - Gemini AI integration
- **Node.js** - Runtime environment

### Libraries & Tools
- `@google/generative-ai` (^0.24.1) - Google Gemini API client
- `socket.io` (^4.8.1) - WebSocket framework
- `socket.io-client` - Client-side Socket.IO
- `@types/react` (^19.2.2) - TypeScript definitions for React
- `@types/react-dom` (^19.2.2) - TypeScript definitions for React DOM

##  Setup Instructions

Follow these step-by-step instructions to set up and run the project:

### Prerequisites

- **Node.js** (v20.19.4 or higher recommended)
- **npm** or **yarn** package manager
- **Google Gemini API Key** - Get one from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Step 1: Clone or Navigate to the Project

```bash
cd ai-chatbot
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required dependencies listed in `package.json`.

### Step 3: Configure Environment Variables

Create a `.env.local` file in the root directory (`ai-chatbot/`) with the following variables:

```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
NEXT_PUBLIC_WS_URL=http://localhost:3001
```

**Note**: 
- Replace `your_gemini_api_key_here` with your actual Google Gemini API key
- `GEMINI_MODEL` is optional (defaults to `gemini-2.5-flash` if not set)
- `NEXT_PUBLIC_WS_URL` is optional (defaults to `http://localhost:3001` if not set)

### Step 4: Start the Socket.IO Server

In the first terminal window, run:

```bash
node server.js
```

You should see:
```
🚀 Socket.IO server running on http://localhost:3001
```

### Step 5: Start the Next.js Development Server

In a second terminal window, run:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Step 6: Open in Browser

Navigate to `http://localhost:3000` in your web browser to start chatting!

##  Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GEMINI_API_KEY` | ✅ Yes | - | Your Google Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey) |
| `GEMINI_MODEL` | ❌ No | `gemini-2.5-flash` | The Gemini model to use (e.g., `gemini-2.5-flash`, `gemini-2.5-pro`, `gemini-2.0-flash`) |
| `NEXT_PUBLIC_WS_URL` | ❌ No | `http://localhost:3001` | WebSocket server URL for Socket.IO connection |

##  Commands

### Development

```bash
# Start Next.js development server
npm run dev

# Start Socket.IO server (separate terminal)
node server.js
```

### Production

```bash
# Build the Next.js application
npm run build

# Start the production server
npm start

# Note: Socket.IO server still needs to run separately
node server.js
```

##  Features

### Implemented Features

- [x] **Real-time Chat Interface** - Interactive chat UI with message bubbles
- [x] **Streaming Responses** - AI responses stream in real-time for better UX
- [x] **Socket.IO Integration** - Bidirectional communication between client and server
- [x] **Connection Status Indicator** - Visual indicator showing connection state (Connected/Connecting/Disconnected)
- [x] **Modern Glassmorphic UI** - Beautiful glassmorphism design with backdrop blur effects
- [x] **Message Timestamps** - Each message displays its timestamp
- [x] **Auto-scrolling** - Chat automatically scrolls to show latest messages
- [x] **Character Limit** - Input field has a 500 character limit
- [x] **Enter Key Support** - Send messages with Enter key (Shift+Enter for new line)
- [x] **Loading States** - Visual feedback during message sending and AI response
- [x] **Error Handling** - Comprehensive error handling for API failures and connection issues
- [x] **Responsive Design** - Clean, modern interface that works on different screen sizes
- [x] **TypeScript Support** - Full type safety throughout the application
- [x] **API Route for Chat** - RESTful API endpoint for chat interactions
- [x] **API Route for Models** - Helper endpoint to check available Gemini models
- [x] **CORS Support** - Proper CORS headers for API routes
- [x] **Reconnection Logic** - Automatic reconnection on Socket.IO disconnection
- [x] **Clear Chat Functionality** - Button to clear all messages with confirmation dialog
- [x] **Copy to Clipboard** - Copy button on each message (appears on hover) with visual feedback
- [x] **Animated Typing Indicator** - Smooth animated dots showing AI is typing
- [x] **Dark/Light Theme Toggle** - Theme switcher with persistent preference (localStorage) and system preference detection

### UI/UX Features

- [x] Glassmorphic design with backdrop filters
- [x] Smooth animations and transitions
- [x] Visual distinction between user and AI messages
- [x] Disabled state for input during AI response
- [x] Loading spinner during message processing
- [x] Animated typing indicator with three bouncing dots
- [x] Dark mode with full theme support across all components
- [x] Theme persistence using localStorage
- [x] Copy button with checkmark confirmation on messages
- [x] Clear chat button with confirmation dialog

##  Time Spent

**Total Time**: Approximately 8-10 hours

### Breakdown:

- **Initial Setup & Planning**: ~1 hour
  - Project structure setup
  - Technology stack decisions
  - API integration research

- **Backend Development**: ~2-3 hours
  - Socket.IO server implementation
  - Next.js API routes setup
  - Google Gemini API integration
  - Streaming response handling
  - Error handling implementation

- **Frontend Development**: ~3-4 hours
  - React component architecture
  - Chat interface UI/UX design
  - Socket.IO client integration
  - State management
  - Real-time message rendering
  - Connection status indicator

- **Styling & Design**: ~1-2 hours
  - Glassmorphic UI design
  - Responsive layout
  - Animations and transitions
  - Color scheme and typography

- **Testing & Debugging**: ~1 hour
  - Testing different scenarios
  - Fixing connection issues
  - Error handling verification
  - UI polish

##  Project Structure

```
ai-chatbot/
├── app/
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts          # Chat API endpoint
│   │   └── models/
│   │       └── route.ts          # Models API endpoint
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Main page
├── components/
│   ├── ChatContainer.tsx          # Main chat container component
│   ├── ChatInput.tsx              # Message input component
│   ├── ChatMessage.tsx            # Message display component
│   └── ConnectionStatus.tsx       # Connection status indicator
├── lib/
│   ├── socket.ts                  # Socket.IO client setup
│   └── types.ts                   # TypeScript type definitions
├── server.js                      # Socket.IO server
├── package.json                   # Dependencies and scripts
└── tsconfig.json                  # TypeScript configuration
```

##  Troubleshooting

### Socket.IO Connection Issues

- Ensure the Socket.IO server (`server.js`) is running on port 3001
- Check that `NEXT_PUBLIC_WS_URL` matches your Socket.IO server URL
- Verify firewall settings allow connections on port 3001

### API Key Issues

- Verify your `GEMINI_API_KEY` is correctly set in `.env.local`
- Ensure the API key has access to Gemini models
- Check the API key is not expired or revoked

### Model Not Found Errors

- Try setting `GEMINI_MODEL` to a different model (e.g., `gemini-1.5-flash`)
- Visit [Google AI Studio](https://aistudio.google.com/app/apikey) to check available models
- Check the `/api/models` endpoint to see available models

##  Notes

- The application requires two servers running simultaneously: Next.js (port 3000) and Socket.IO (port 3001)
- Make sure to keep both terminal windows open while developing
- The `.env.local` file should not be committed to version control
- For production deployment, ensure both servers are configured and running

##  License

This project is part of an assignment submission.

---



