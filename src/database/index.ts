import mongoose, { Mongoose } from "mongoose";

class AppDatabase {
  private url = process.env.DB_URL;
  private dbName = process.env.DB_NAME;

  async connect(): Promise<Mongoose> {
    try {
      return await mongoose.connect(`${this.url}/${this.dbName}`);
    } catch (e) {
      throw Error("Failed to establish connection database");
    }
  }
}

export default AppDatabase;
