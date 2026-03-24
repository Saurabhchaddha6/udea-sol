import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.post('/data', (req, res) => {
  res.send('Data received!');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});