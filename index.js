import app from './app'
import dotenv from 'dotenv';
//import express from 'express';

dotenv.config();

//colocar as envs aqui e todo backend tambem
//fazer uma separação entre o backend
//e frontend

//const app = express()

//app.use("/", function(req,res){
  //res.json("seu merda 2")
//})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Acess http://localhost: ${port}`);
  console.log(`Server online on port ${port}...`);
});
    