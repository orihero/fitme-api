import mongoose, { Mongoose } from "mongoose";

class AppDatabase {
  // private url = process.env.DB_URL || "mongodb+srv://orihero:asdf12345@fitme.b0m5249.mongodb.net/?retryWrites=true&w=majority";
  private url = "mongodb://127.0.0.1:27017/"
  private dbName = process.env.DB_NAME;

  async connect(): Promise<Mongoose> {
    try {
      console.log(this.url);

      return await mongoose.connect(`${this.url}`);
    } catch (e) {
      throw Error("Failed to establish connection database");
    }
  }
}

export default AppDatabase;
