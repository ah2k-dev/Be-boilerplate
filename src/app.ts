import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import ApiError from './utils/apiError';
import router from './routes/index';
import loggerMiddleware from './middleware/logger.middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../swagger_output.json';
import { rateLimitMiddleware } from './middleware/rateLimit.middleware';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import passport from './config/passportLocal.config';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { captureLastActive } from './middleware/userAgent.middleware';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: '*', // allow all origins (for now)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));
app.options('*', cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(loggerMiddleware);
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI, stringify: false,  }),
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(captureLastActive); // Capture last active time of user

// Security Middlewares
app.use(rateLimitMiddleware);
app.use(helmet());
app.use(helmet.noSniff()); // Prevent MIME-type sniffing
app.use(helmet.referrerPolicy({ policy: 'no-referrer' })) // Prevent Referrer-Policy
app.use(helmet.xssFilter()); // Prevent Cross-Site Scripting (XSS)
app.use(mongoSanitize()); // Prevent NoSQL Injection



// router index
app.use('/', router);
// api doc
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
// default route
app.get('/', (req: Request, res: Response): void => {
  res.send('BE-boilerplate v1.1');
});

// send back a 404 error for any unknown api request
app.use((req: Request, res: Response, next: NextFunction): void => {
  next(new ApiError(404, 'Not found'));
});

export default app;
