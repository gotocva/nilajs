const { Server } = require('socket.io');

class SocketHandler {
    constructor(server) {
        this.io = new Server(server, {
            cors: {
                origin: '*', // Allow all origins (update in production)
                methods: ['GET', 'POST']
            }
        });
        this.users = new Map(); // Stores active users with their socket IDs
        this.initialize();
    }

    /**
     * Initialize socket event handlers
     */
    initialize() {
        this.io.on('connection', (socket) => {
            console.log(`User connected: ${socket.id}`);

            // Handle user registration
            socket.on('register', (userId) => {
                if (userId) {
                    this.users.set(userId, socket.id);
                    console.log(`User registered: ${userId}`);
                }
            });

            // Handle message sending
            socket.on('sendMessage', (data) => {
                this.handleSendMessage(data);
            });

            // Handle user disconnection
            socket.on('disconnect', () => {
                this.handleDisconnect(socket);
            });
        });
    }

    /**
     * Handles message sending to a specific user
     * @param {Object} data - Contains senderId, receiverId, and message
     */
    handleSendMessage(data) {
        if (!data || !data.senderId || !data.receiverId || !data.message) {
            console.warn('Invalid message data received');
            return;
        }
        
        const { senderId, receiverId, message } = data;
        const receiverSocketId = this.users.get(receiverId);
        
        if (receiverSocketId) {
            this.io.to(receiverSocketId).emit('receiveMessage', { senderId, message });
        } else {
            console.warn(`Receiver ${receiverId} not connected`);
        }
    }

    /**
     * Handles user disconnection and cleans up memory
     * @param {Object} socket - The disconnected socket instance
     */
    handleDisconnect(socket) {
        for (const [userId, socketId] of this.users.entries()) {
            if (socketId === socket.id) {
                this.users.delete(userId); // Remove user from active list
                console.log(`User disconnected: ${userId}`);
                break;
            }
        }
    }

    /**
     * Broadcast an event to all connected clients
     * @param {string} event - Event name
     * @param {Object} data - Event data
     */
    broadcast(event, data) {
        if (!event || !data) {
            console.warn('Invalid broadcast event or data');
            return;
        }
        this.io.emit(event, data);
    }
}

module.exports = SocketHandler;
