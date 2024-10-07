import express from 'express';
import dotenv from 'dotenv';

const app = express()

dotenv.config();

app.use("/", function(req,res){
  return res.json("seu merda")
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Acess http://localhost: ${port}`);
  console.log(`Server online on port ${port}...`);
});
    