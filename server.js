

import express from 'express';

const app = express()

app.use("/", function(req,res){
  res.send("Server é o caramba")
})

app.listen(port, () => {
  console.log(`Acess http://localhost:${port}`);
  console.log(`Server online on port ${port}...`);
});
