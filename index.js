
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const app = express()

app.get('/', function(req,res){
  return res.json("seu merda");
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Acess http://localhost:${port}`);
  console.log(`Server online on port ${port}...`);
});
    