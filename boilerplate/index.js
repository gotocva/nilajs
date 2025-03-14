

const cors = require('cors');
const xss = require('xss');
const express = require('express');
const fileUpload = require('express-fileupload');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const http = require('http');
const ErrorHandler = require('./utils/error.handler');
const connectDatabase = require('./config/mongoose');
const SocketHandler = require('./utils/socket.handler');

// connect to mongodb database
connectDatabase();

// Rate limiter to prevent excessive requests
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 200, // Limit each IP to 200 requests per minute
    standardHeaders: true,
    legacyHeaders: false,
});

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        if (process.env.NODE_ENV !== 'production') {
            callback(null, true);
        } else {
            const whiteListedDomains = process.env.WHITE_LISTED_DOMAINS ? process.env.WHITE_LISTED_DOMAINS.split(',') : [];
            if (whiteListedDomains.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        }
    },
};

// Middleware to sanitize request inputs
function sanitizeInput(req, res, next) {
    ['body', 'query', 'params'].forEach((key) => {
        if (req[key]) req[key] = sanitizeObject(req[key]);
    });
    next();
}

// Function to sanitize object properties
function sanitizeObject(obj) {
    const sanitized = {};
    Object.keys(obj).forEach((key) => {
        sanitized[key] = xss(obj[key]);
    });
    return sanitized;
}

// Express configuration class
const app = express();
    
// Security middleware
app.use(helmet({ crossOriginResourcePolicy: false }));

// Input sanitization
app.use(sanitizeInput);

// CORS setup
app.use(cors(corsOptions));

// Request body parsing
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use(express.json({ limit: '50mb' }));

// File upload support
app.use(fileUpload({ createParentPath: true }));

// Static file serving with custom headers for JS files
app.use(express.static('public', {
    setHeaders: function (res, path) {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

// rate limiting 
app.use(limiter);

// Global error handler
app.use(ErrorHandler);


// routes injection 

app.use('/api/v1', require('./routes/v1/routes'));



// Sample test route
app.get('/', (req, res) => {
    res.send('Server is running...');
});

const server = http.createServer(app); // Create HTTP server for Express

// Initialize SocketService with the server
const socketHandler = new SocketHandler(server);



app.get('/memory', require('./utils/memory.handler').memoryUsageApi);

// Catch-all 404 handler (should be placed **AFTER** all other routes)
app.use((req, res, next) => {
    res.status(404).json({ 
        error: 'Not Found', 
        message: `The requested URL ${req.originalUrl} was not found on this API server.` 
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



