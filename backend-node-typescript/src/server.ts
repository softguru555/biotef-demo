import 'reflect-metadata';

import config from './core/config/config';
import app from './app';
import db from './db';

const ENV = process.env.NODE_ENV || 'development';
const { port: PORT, host: HOST, appName: APPNAME } = config;
// app.post('/users', (req, res) => {
//   const { name, email } = req.body;
//   const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
//   db.query(sql, [name, email], (err, result) => {
//     if (err) {
//       return res.status(500).send(err.message);
//     }
//     res.status(201).send('User created successfully');
//   });
// });
import sequelize from './db';

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();
app.listen(PORT, () => {
  console.log(`Server running at http://${HOST}:${PORT} in ${ENV} mode`);
  console.log(`Application Name: ${APPNAME}`);
});

