import express from 'express';
import 'express-async-errors';
import carRoute from './Routes/carRoutes';
import errorHandler from './middlewares/errors';

const app = express();
app.use(express.json());
app.use('/cars', carRoute);
app.use(errorHandler);

export default app;
