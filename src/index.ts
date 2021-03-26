import express from 'express';

require('dotenv').config();

import { MongoConnection } from './database/MongoConnection';

import { URLController } from './controllers/URLController';

const urlController = new URLController();

const app = express();
const database = new MongoConnection();

app.use(express.json());
database.connect();

app.post('/shorten', urlController.shorten);
app.get('/:hash', urlController.redirect);

app.listen(3000, () => console.log('listening on port 3000'));
