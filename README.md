# Basic Real-Time Chat App

This is a simple real-time chat application built using JavaScript, Node.js, and Socket.IO. The app allows users to join a chat room and exchange messages instantly, with real-time updates across all connected users.

## Features

- **Real-time communication**: Users can send and receive messages instantly.
- **Multiple users**: Multiple users can join the chat room and communicate with each other in real time.
- **Join with a unique username**: Users can enter a unique username when joining the chat.
- **Auto-scroll**: The chat window auto-scrolls as new messages are received.
- **Basic UI**: A simple user interface with a message input field and chat display area.

## Technologies Used

- **Node.js**: Backend runtime environment for server-side code.
- **Express.js**: Web framework to handle HTTP requests and serve the client-side HTML.
- **Socket.IO**: Library for real-time, bidirectional communication between the browser and server.
- **HTML/CSS**: Frontend for the user interface and styling.
- **JavaScript**: Client-side code to handle events and connect with the server.


## How It Works

1. **Server Setup (Node.js + Express + Socket.IO)**:
   - The server is built using Node.js and the Express framework. 
   - Socket.IO is used to enable real-time communication between clients and the server.
   - When a user sends a message, it is broadcast to all connected clients via Socket.IO.

2. **Client-Side (HTML + JS)**:
   - The frontend consists of a simple HTML page with a chat display area and input field.
   - The client-side JavaScript connects to the server using Socket.IO and listens for new messages.
   - When a message is received, it is added to the chat window in real time.



