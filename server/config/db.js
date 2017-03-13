import mongoose from 'mongoose';
import {MONGODB_URI} from 'react-native-dotenv';
export default () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(MONGODB_URI + '/chats');
  mongoose.connection
    .once('open', () => console.log('Mongodb running'))
    .on('error', err => console.error(err))
};


