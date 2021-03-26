import mongoose from 'mongoose';

export class MongoConnection {
  public async connect(): Promise<void> {
    try {
      await mongoose.connect(process.env.MONGO_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Database conneted');
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  }
}
