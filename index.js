import dotenv from 'dotenv';
import homeRoutes from './homeRoutes'
import express from 'express';

dotenv.config();

const app = express()

app.use("/", homeRoutes)

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Acess http://localhost: ${port}`);
  console.log(`Server online on port ${port}...`);
});
    