interface MongoConfig {
  host: string;
  port: number;
  username?: string;
  password?: string;
  database: string;
}

export default {
  host: process.env.MONGO_HOST || 'localhost',
  port: process.env.MONGO_PORT || 27017,
  username: process.env.MONGO_USERNAME,
  password: process.env.MONGO_PASSWORD,
  database: process.env.MONGO_DB || 'SeidorChallange',
} as MongoConfig;
