import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import orderRoutes from './order/routes/index';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = 3000;
const mongoUri = process.env.MONGO_URI!;

mongoose.connect(mongoUri);
mongoose.connection.on('error', (error) => console.log(error));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use('/api/order', orderRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
