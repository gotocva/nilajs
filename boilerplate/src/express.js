import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';

/**
 * Custom module injection
 */
import { xssPrevention } from '@util/xss';
import { responseHandler } from '@util/response';
import { appConfig } from '@config/app.config';
import { cacheMiddleware } from '@cache/index';

const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(cacheMiddleware);
// Middleware for parsing JSON request bodies
app.use(express.json());
// xss prevention sanitize inputs 
app.use(xssPrevention);
// Apply rate limiting middleware
const rateLimiter = rateLimit({
    windowMs: appConfig.API_RATE_LIMIT_TIME * ( 60 * 1000 ),
    max: appConfig.API_RATE_LIMIT,
});
app.use(rateLimiter);
// Apply Helmet middleware
app.use(helmet());
// Enable Content Security Policy
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
    },
  })
);

app.use(responseHandler);

module.exports = {app};