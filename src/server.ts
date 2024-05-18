// Import necessary modules and types
import cors from 'cors';
import 'dotenv/config';
import express, { Application } from 'express';
// import session from 'express-session';
// import { IncomingMessage, Server } from 'http';
import { Socket, Server as SocketServer } from 'socket.io';
import { SERVER } from './configs/app.config';
import errorHandler from './middleware/error.middleware';
import { v1Router } from './routes/v1/v1.router';
import { connectToDatabase } from './utils/database.utils';
import { generateSessionId } from './utils/utils';
import { Server } from 'http';

// interface CustomSocket extends Socket {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   request: IncomingMessage & { session: any }; // Adjust the type definition as needed
// }
// Create an Express application
const app: Application = express();

// const sessionMiddleware = session({
//   secret: 'secret_key',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: false }, // Adjust options as needed
// });
// app.use(sessionMiddleware);

// Use middleware
app.use(express.json());
// app.use(cors());
// FIXME: cors
app.use(
  cors({
    // origin: [process.env.ORIGIN], //frontend server localhost:8080
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // enable set cookie
  }),
);

// Create an HTTP server using the Express app
const httpServer: Server = new Server(app);

// Attach Socket.IO to the HTTP server
const io: SocketServer = new SocketServer(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// io.engine.use(sessionMiddleware);

// Define Socket.IO event handlers
io.on('connection', (socket: Socket) => {
  // const sessionId = socket.request?.session?.id;
  const sessionId = generateSessionId();

  if (io.engine.clientsCount <= 3) io.emit('sessionId', sessionId);
  // Update the player count whenever a client connects or disconnects
  io.emit('playerCount', io.engine.clientsCount);

  console.log(`User connected: ${socket.id} with sessionId ${sessionId}`);
  console.log('playerCount is now = ', io.engine.clientsCount);

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    console.log('playerCount is now = ');
    io.emit('playerCount', io.engine.clientsCount);
  });

  // Handle 'send_message' event
  socket.on('send_message', (data) => {
    console.log('data', data);
    socket.broadcast.emit('receive_message', data);
  });

  // Handle 'is_show_correct_answer' event
  socket.on('is_show_correct_answer', (dataAnswer) => {
    console.log('dataAnswer', dataAnswer);
    socket.broadcast.emit('receive_answer_message', dataAnswer);
  });

  socket.on('send_game_session_status_update', (data) => {
    console.log('send_game_session_status_update DATA', data);
    socket.broadcast.emit('receive_game_session_status_update', data);
  });
});

// Connect to the database
connectToDatabase();

// Use routes
app.use('/v1', v1Router);

// Error handling middleware
app.use(errorHandler);

// Start the HTTP server
httpServer.listen(SERVER.PORT, async () => {
  console.log(`Server is running on port ${SERVER.PORT}`);
});

// const quiz = await Quiz.findOne();
// quiz.questions.push({
//   questionText:
//     'Quels objectifs glycémiques recommandez-vous pour ce patient ?',
//   possibleAnswers: [
//     'HbA1C < 6,5 %',
//     'HbA1C < 7 %',
//     'G0 < 1,3g/l',
//     'GPP < 1,8g/l',
//     'Excursions glycémique < 0,6g/l',
//   ],
//   correctAnswerIndices: [1, 2, 3],
// });
// quiz.questions.push({
//   questionText:
//     'Quels objectifs glycémiques recommandez-vous pour ce patient ?',
//   possibleAnswers: [
//     'HbA1C < 6,5 %',
//     'HbA1C < 7 %',
//     'G0 < 1,3g/l',
//     'GPP < 1,8g/l',
//     'Excursions glycémique < 0,6g/l',
//   ],
//   correctAnswerIndices: [1, 2, 3],
// });
// quiz.questions.push({
//   questionText:
//     'Quelles options thérapeutiques préconisez-vous pour ce patient ?',
//   possibleAnswers: [
//     'Ajouter un inhibiteur DPP4',
//     'Ajouter un inhibiteur des α Glucosidases',
//     'Ajouter un ISGLT-2',
//     'Ajouter un agoniste GLP-1',
//     'Initiation d’une insuline basale',
//   ],
//   correctAnswerIndices: [0, 3],
// });
// quiz.questions.push({
//   questionText:
//     'Quels sont les mécanismes d’action potentiellement bénéfiques des ISGLT2 chez ce patient ?',
//   possibleAnswers: [
//     'Amélioration de l’équilibre glycémique indépendamment de l’insulinosécrétion',
//     'Augmentation de la natriurèse',
//     'Augmentation des besoins en oxygène du myocarde',
//     'Amélioration du remodelage ventriculaire gauche',
//     'Perte pondérale modérée',
//   ],
//   correctAnswerIndices: [0, 1, 2, 3, 4],
// });
