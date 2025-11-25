const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 5000;

const db = mysql.createConnection({
  host: 'database', 
  user: 'appuser',
  password: 'apppassword',
  database: 'appdb'
});

db.connect(err => {
  if(err) console.log('DB Connection Error:', err);
  else console.log('Connected to MySQL');
});

app.get('/', (req, res) => {
  res.send('Hello from Backend!');
});

app.listen(port, () => console.log(`Backend running on port ${port}`));

