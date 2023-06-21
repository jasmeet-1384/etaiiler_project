import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import {generateUploadUrl} from '../src/services/s3.service'
import cors from 'cors';
import helmet from 'helmet';
import http from 'http'

import socketio from 'socket.io'

import routes from './routes';
import database from './config/database';
import {
  appErrorHandler,
  genericErrorHandler,
  notFound
} from './middlewares/error.middleware';
import logger, { logStream } from './config/logger';

import morgan from 'morgan';

import {Server} from 'socket.io'

const app = express();
const host = process.env.APP_HOST;
const port = process.env.APP_PORT;
const api_version = process.env.API_VERSION;
const server = http.createServer(app)

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('combined', { stream: logStream }));

database();

app.use(`/`, routes());
app.use(appErrorHandler);
app.use(genericErrorHandler);
app.use(notFound);

//socket connection
const io = socketio(server)

io.on("connection", socket => {
  console.log("socket connected")
  socket.on("setup",(userData) => {
    console.log(userData,"<=== USER DATA")
    socket.join(userData)
    socket.emit("connected")
  })

  socket.on("join chat",(room) => {
    socket.join(room)
    console.log("user joined conversation" , room)
  })

  socket.on("new message",(newMessageReceived) => {
    var userData = newMessageReceived
    console.log(userData.to,"<============= new message receiveed")
    socket.in(userData.to).emit("message received",newMessageReceived)
  })
})



server.listen(port, () => {
  logger.info(`Server started at ${host}:${port}/`);
});

export default app;
