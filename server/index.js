import express from 'express';
import dbConfig from './config/db';
import middlewareConfig from './config/middleware';
import { ChatRoutes, GroupRoutes } from './modules';

const app = express();

dbConfig();
middlewareConfig(app);

app.use('/api', [ChatRoutes, GroupRoutes]);

const PORT = process.env.PORT || 3000;

app.listen(PORT, err => {
  if (err) {
    console.error(err);
  }
  else {
    console.log(`App listening on port: ${PORT}`);
  }
});
