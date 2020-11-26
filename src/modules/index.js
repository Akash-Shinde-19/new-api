const mongoose = require('mongoose');

export const connection = async () => {
  try {
    console.log({
      connectionString:
        process.env.MONGO_DB_URL,
    });
    mongoose.set('debug', true);
    await mongoose.connect(
      process.env.MONGO_DB_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('Database Connected Successfully');
  } catch (error) {
    console.log('failure');
    console.log(error);
    //throw error;
  }
};