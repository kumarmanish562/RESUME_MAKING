import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Connect to MongoDB
connectDB();


// Middleware to parse JSON bodies
app.use(express.json());

// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});



app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

