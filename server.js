import app from './app';
import dotenv from 'dotenv'
import express from 'express';

dotenv.config()

const port = process.env.PORT || 3000;
const app = express()

app.use("/", function(req,res){
  res.send("Server é o caramba")
})

app.listen(port, () => {
  console.log(`Acess http://localhost:${port}`);
  console.log(`Server online on port ${port}...`);
});
