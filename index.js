import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express()

app.use("/", function(req,res){
  res.json("seu merda 2")
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Acess http://localhost: ${port}`);
  console.log(`Server online on port ${port}...`);
});
    