import express from 'express';
import orderRoutes from './order/routes/index';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/order', orderRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
