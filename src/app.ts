import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './routes';
import { handleNoRouteFound } from './errors/handleNoRouteFound';
import cookieParser = require('cookie-parser');

const app: Application = express();

app.use(cookieParser());
app.use(cors());

//parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Readers Server Running !');
});

//routes
app.use('/api/v1', routes);

// Test route
app.get('/test', async (req: Request, res: Response, next: NextFunction) => {});

// Global error handler
app.use(globalErrorHandler);

//handle no route found error
app.use(handleNoRouteFound);

export default app;
