/*eslint */
import mysql from 'mysql2';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
dotenv.config();
const sequelize = new Sequelize('biotef', 'demo', 'biotef', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
