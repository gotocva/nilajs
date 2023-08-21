



/**
 * 
 * @param {*} socket 
 */
export const socketHandler = (socket) => {

    console.log(`A user connected with id ${socket.id}`);

    // Handle disconnection event
    socket.on('disconnect', () => {
        console.log(`A user disconnected with id ${socket.id}`);
    });
}