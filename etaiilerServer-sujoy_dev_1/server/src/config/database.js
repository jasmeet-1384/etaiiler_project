import mongoose from 'mongoose';
import logger from './logger';

const database = async () => {
  try {
    // Replace database value in the .env file with your database config url
    const DATABASE = `mongodb+srv://jeetssingh9700:i37cno99co3rpcmp349irec42r@haastagdbv1.pfgu24z.mongodb.net/etailerDbV1?retryWrites=true&w=majority`

    await mongoose.connect(DATABASE, {
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    logger.info('Connected to the database.');
  } catch (error) {
    logger.error('Could not connect to the database.', error);
  }
};
export default database;
