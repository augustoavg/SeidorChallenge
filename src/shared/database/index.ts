import mongoose from 'mongoose';

import mongoConfig from './config/mongo';

const mongoUserPass = mongoConfig.username
  ? `${mongoConfig.username}:${mongoConfig.password}@`
  : '';

if (!process.env.MONGO_URL) {
  mongoose
    .connect(
      `mongodb://${mongoUserPass}${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      },
    )
    .then(() => {
      console.log('🔆 Connection to database established.');
    })
    .catch(err => console.log(err));
}
