import express from 'express';
import mongoose from 'mongoose';
import orderRoutes from './order/routes/index';

const app = express();
const PORT = 3000;
const mongoUri =
  process.env.MONGO_URI ||
  'mongodb+srv://nikolamitrovic1313:87zWHBPmrA3nTnYz@cluster0.hyiwiiq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

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
