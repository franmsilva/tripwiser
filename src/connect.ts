import mongoose from 'mongoose';
import { environment } from './environment';


mongoose.connect(environment.database.uri, environment.database.config);
const db = mongoose.connection;

db.once('open', () => {
  console.log('MongoDB Atlas connection established!');
});

db.on('error', () => {
  console.error('MongoDB Atlas connection error!');
});

export default mongoose;
