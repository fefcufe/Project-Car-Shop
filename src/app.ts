import express from 'express';
import carRoute from './Routes/carRoutes';
import 'express-async-errors';
import errorHandler from './middlewares/errors';

const app = express();
app.use(express.json());
app.use('/cars', carRoute);
app.use(errorHandler);

export default app;
