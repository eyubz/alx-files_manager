/**
 * Server
 */

import express from 'express';
import router from './routes/index';

const app = express();

app.use(express.json());
app.use(router);

app.listen(process.env.PORT || 5000, () => {
  console.log('Server is running on port 5000');
});
