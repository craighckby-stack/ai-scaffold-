import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const DEFAULT_PORT = 3003;
const PORT = process.env.WEBSOCKET_PORT || DEFAULT_PORT;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const DEFAULT_ROOMS = ['metrics', 'agents', 'reasoning', 'memory', 'security'];

const httpServer = createServer();

// Initialize Socket.IO server configuration
const io = new Server(httpServer, {
  cors: {
    origin: APP_URL,
    methods: ['GET', 'POST']
  },
  // Ensure connection remains stable
  pingInterval: 10000,
  pingTimeout: 5000,
  transports: ['websocket', 'polling']
});

/**
 * Handles client connection and sets up room listeners.
 * @param socket The connected socket instance.
 */
const handleConnection = (socket: Socket) => {
  // CORRECTED: Log connection with non-mangled UTF-8 character
  console.log(`✅ Client connected: ${socket.id}`); 

  // --- Initial Setup ---
  
  // Automatically join all default rooms upon connection
  DEFAULT_ROOMS.forEach(room => {
    socket.join(room);
  });

  // Send initial state back to the client
  socket.emit('connected', {
    socketId: socket.id,
    timestamp: Date.now(),
    rooms: DEFAULT_ROOMS
  });

  // --- Dynamic Room Joining Logic (Consolidated) ---
  
  DEFAULT_ROOMS.forEach(room => {
    // Listener for explicit room join request
    socket.on(`join-${room}`, () => {
      if (!socket.rooms.has(room)) {
        socket.join(room);
        socket.emit(`joined-${room}`, { room });
        console.log(`Socket ${socket.id} joined room: ${room}`);
      }
    });

    // Listener for broadcasting updates to a specific room
    socket.on(`broadcast-${room}`, (data) => {
      // Broadcast to all other clients in the room, excluding the sender
      socket.to(room).emit(`${room}-update`, data);
    });
  });

  // --- Disconnection Handling ---

  socket.on('disconnect', (reason) => {
    // CORRECTED: Log disconnection with non-mangled UTF-8 character
    console.log(`❌ Client disconnected: ${socket.id} (Reason: ${reason})`);
  });
};

io.on('connection', handleConnection);

// Start the HTTP server listening
httpServer.listen(PORT, () => {
  // CORRECTED: Log server start with non-mangled UTF-8 character
  console.log(`🚀 WebSocket service running on port ${PORT} (CORS Origin: ${APP_URL})`); 
  console.log(`✅ Initial connected clients count: ${io.engine.clientsCount}`);
});

export { io, httpServer };