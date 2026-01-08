import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import { inspect } from 'util'

// --- Configuration ---
const DEFAULT_PORT = 3003
// Use bitwise shift for faster integer conversion (modern JS engines optimize parseInt heavily, but this is a classic optimization)
const PORT = +(process.env.WEBSOCKET_PORT || DEFAULT_PORT) | 0
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
const DEFAULT_ROOMS = ['metrics', 'agents', 'reasoning', 'memory', 'security'] as const // Use 'as const' for literal type optimization

// --- Utilities ---

// Simplify logging. Avoid using inspect unless strictly necessary for complex objects to reduce overhead.
const log = (message: string, ...args: any[]) => {
  // Use a faster check for simple objects/arrays vs deep inspection
  const processedArgs = args.map(arg => {
    if (typeof arg === 'object' && arg !== null && !Array.isArray(arg)) {
      return inspect(arg, false, 2, true)
    }
    return arg
  })
  console.log(`[WS] ${message}`, ...processedArgs)
}

// Pre-calculate room event names to avoid repeated string concatenation
const ROOM_EVENTS = DEFAULT_ROOMS.reduce((acc, room) => {
  acc[room] = {
    JOIN: `join-${room}`,
    JOINED: `joined-${room}`,
    BROADCAST: `broadcast-${room}`,
    UPDATE: `${room}-update`,
  }
  return acc
}, {} as Record<string, { JOIN: string, JOINED: string, BROADCAST: string, UPDATE: string }>)

// --- Server Setup ---

const httpServer = createServer()

// Socket.IO configuration
const io = new Server(httpServer, {
  // Use array if APP_URL is guaranteed single, otherwise keep as string/function
  cors: {
    origin: APP_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  },
  // Aggressive tuning for low latency applications (if applicable)
  // pingInterval and pingTimeout are fine, but ensure maxHttpBufferSize is needed. Reducing unnecessary buffer can save memory.
  // 1e8 (100MB) is extremely high. Reverting to a more reasonable default unless heavy payloads are confirmed.
  maxHttpBufferSize: 1e7, // 10MB (Standard optimization, 1MB is usually default)
  transports: ['websocket', 'polling'],
})

/**
 * Sets up listeners for dynamic room joining and broadcasting.
 * Optimized: Uses pre-calculated event names.
 */
const setupRoomListeners = (socket: Socket) => {
  for (const room of DEFAULT_ROOMS) {
    const events = ROOM_EVENTS[room]

    // Listener for explicit room join request
    socket.on(events.JOIN, () => {
      // Check if already in the room is crucial optimization
      if (!socket.rooms.has(room)) {
        socket.join(room)
        socket.emit(events.JOINED, { room })
        // Use faster string interpolation for logging
        log(`Socket ${socket.id} joined room: ${room}`)
      }
    })

    // Listener for broadcasting updates to a specific room
    // Use the fastest possible payload type if possible (e.g., ArrayBuffer)
    socket.on(events.BROADCAST, (data: unknown) => {
      // Direct emit. Avoid using 'log' inside high-traffic loops.
      socket.to(room).emit(events.UPDATE, data)
    })
  }
}

/**
 * Handles client connection and setup.
 * Optimized: Uses direct array joining for initial rooms.
 */
const handleConnection = (socket: Socket) => {
  log(`[CONNECT] Client connected: ${socket.id}`)

  // --- Initial Setup (Optimized for single I/O operation) ---

  // Check which default rooms the socket is NOT in (socket.join handles duplicates, but filtering is clearer/marginally faster)
  // Since this is a new connection, socket.rooms should only contain socket.id. We can simplify.
  socket.join(DEFAULT_ROOMS)

  // Send initial state back to the client
  socket.emit('connected', {
    socketId: socket.id,
    timestamp: Date.now(),
    rooms: DEFAULT_ROOMS
  })

  // --- Dynamic Room Joining & Broadcasting Logic ---
  setupRoomListeners(socket)

  // --- Disconnection Handling ---

  socket.on('disconnect', (reason) => {
    log(`[DISCONNECT] Client disconnected: ${socket.id} (Reason: ${reason})`)
  })
}

io.on('connection', handleConnection)

// --- Server Initialization ---

httpServer.on('error', (err: NodeJS.ErrnoException) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`[FATAL] Port ${PORT} is already in use.`)
  } else {
    console.error(`[FATAL] SERVER ERROR:`, err)
  }
  process.exit(1)
})

httpServer.listen(PORT, () => {
  log(`[START] WebSocket service running on port ${PORT} (CORS Origin: ${APP_URL})`)
  log(`[READY] Server initialized.`)
})

export { io, httpServer }