import app from './app';
import dotenv from 'dotenv';
import connectDB from './config/db.config';
import http from 'http';

dotenv.config({ path: './src/config/config.env' }); //load env vars

//server setup
const PORT = process.env.PORT || 8001;

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
