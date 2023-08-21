import * as alias from 'easy-alias/boot';
import { createServer } from 'http';
import socketIO from 'socket.io';
import { connectDB } from './database/mongoose.db';
import { routeLoader } from './routes';
import { appConfig } from '@config/app.config';
import { app } from './express';
import { LOG } from '@log/index';
import { socketHandler } from './sockets';

export const mongooseConnection = connectDB();

export const application = routeLoader(app);

const http = createServer(application);

// Attach Socket.IO to the server
const io = socketIO(http);

// Define a connection event for Socket.IO
io.on('connection', (socket) => {
    socketHandler(socket);
});

http.listen(process.env.PORT || appConfig.PORT || 8080, () => {
    LOG.info(`Application Server listening on port ${process.env.PORT || appConfig.PORT || 8080} successfully`);
});