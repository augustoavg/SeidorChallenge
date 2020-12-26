import mongoose from 'mongoose';

import mongoConfig from './config/mongo';

const mongoUserPass = mongoConfig.username
  ? `${mongoConfig.username}:${mongoConfig.password}@`
  : '';

if (!process.env.MONGO_URL) {
  mongoose
    .connect(
      `mongodb+srv://augusto:augusto@augusto.9aslu.mongodb.net/SeidorChallenge`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      },
    )
    .then(() => {
      console.log('🔆 Connection to database established.');
    });
}
