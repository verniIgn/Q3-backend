import mongoose from 'mongoose';
import {MONGODB_URI} from 'react-native-dotenv';

export default () => {
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://heroku_x9fb7pmz:fqv13bdq5o6qk4pstdncnpdv31@ds129600.mlab.com:29600/heroku_x9fb7pmz/chats');
  mongoose.connection
    .once('open', () => console.log('Mongodb running'))
    .on('error', err => console.error(err))
};


