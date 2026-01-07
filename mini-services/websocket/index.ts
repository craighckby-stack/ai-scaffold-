import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import { inspect } from 'util'

const DEFAULT_PORT = 3003
const PORT = parseInt(process.env.WEBSOCKET_PORT || String(DEFAULT_PORT), 10)
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
const DEFAULT_ROOMS = ['metrics', 'agents', 'reasoning', 'memory', 'security']

// Use the standard Node.js logging method for better compatibility and efficiency
const log = (message: string, ...args: any[]) => {
  // Use inspect for deep logging of objects if required
  console.log(`[WS] ${message}`, ...args.map(arg => typeof arg === 'object' ? inspect(arg, false, 2, true) : arg))
}

const httpServer = createServer()

const io = new Server(httpServer, {
  // Use an array for origin if possible for tighter security, though dynamic environment requires string or function
  cors: {
    origin: APP_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  },
  // Tuned for lower latency
  pingInterval: 10000, 
  pingTimeout: 5000,
  transports: ['websocket', 'polling'],
  // Increase buffer size slightly for heavy traffic rooms if necessary, defaults are usually fine
  maxHttpBufferSize: 1e8 // 100MB, default is 1MB. Set based on payload analysis.
})

/**
 * Sets up listeners for dynamic room joining and broadcasting.
 */
const setupRoomListeners = (socket: Socket) => {
  DEFAULT_ROOMS.forEach(room => {
    
    // Use constants for events to avoid string errors
    const JOIN_EVENT = `join-${room}`
    const JOINED_EVENT = `joined-${room}`
    const BROADCAST_EVENT = `broadcast-${room}`
    const UPDATE_EVENT = `${room}-update`

    // Listener for explicit room join request
    socket.on(JOIN_EVENT, () => {
      // Use socket.rooms.has(room) for efficient check
      if (!socket.rooms.has(room)) {
        socket.join(room)
        socket.emit(JOINED_EVENT, { room })
        // Log minimal info
        log(`Socket ${socket.id} joined room: ${room}`)
      }
    })

    // Listener for broadcasting updates to a specific room
    // Use unknown for type safety when dealing with untyped data
    socket.on(BROADCAST_EVENT, (data: unknown) => {
      // Broadcast to all other clients in the room, excluding the sender
      // log(`Broadcasting update to room [${room}] from ${socket.id}`) // High-volume log, disable unless debugging
      socket.to(room).emit(UPDATE_EVENT, data)
    })
  })
}

/**
 * Handles client connection and setup.
 */
const handleConnection = (socket: Socket) => {
  // Use ASCII logging to prevent console encoding issues
  log(`[CONNECT] Client connected: ${socket.id}`) 

  // --- Initial Setup ---
  
  // Combine join operations for efficiency
  const roomsToJoin = DEFAULT_ROOMS.filter(room => !socket.rooms.has(room))
  socket.join(roomsToJoin)

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

// Add robust error handling for the HTTP server
httpServer.on('error', (err: NodeJS.ErrnoException) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`[FATAL] Port ${PORT} is already in use.`)
  } else {
    console.error(`[FATAL] SERVER ERROR:`, err)
  }
  process.exit(1)
})

// Start the HTTP server listening
httpServer.listen(PORT, () => {
  log(`[START] WebSocket service running on port ${PORT} (CORS Origin: ${APP_URL})`) 
  log(`[READY] Server initialized.`)
})

export { io, httpServer }