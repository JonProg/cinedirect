import dotenv from 'dotenv';
import homeRoutes from './src/routes/homeRoutes';
import movieRoutes from './src/routes/movieRoutes';
import express from 'express';

const app = express()

app.use("/", function(req,res){
  res.json("seu merda 3")
})

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Acess http://localhost: ${port}`);
  console.log(`Server online on port ${port}...`);
});
    