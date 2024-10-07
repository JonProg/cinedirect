import app from './app';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Acess http://localhost:${port}`);
  console.log(`Server online on port ${port}...`);
});
