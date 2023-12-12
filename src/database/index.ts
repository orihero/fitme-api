import mongoose, { Mongoose } from "mongoose";

class AppDatabase {
  // private url = process.env.DB_URL || "mongodb+srv://orihero:asdf12345@fitme.b0m5249.mongodb.net/?retryWrites=true&w=majority";
  private url = "mongodb://useradmin:thepianohasbeendrinking@localhost:27017/?authSource=admin"
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
