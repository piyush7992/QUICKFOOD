
const mongoose = require("mongoose");

const mongoURL =
  "mongodb+srv://piyush123:piyush%4023@mern.dvh3o1r.mongodb.net/mern?retryWrites=true&w=majority";

const mongoDb = async () => {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(mongoURL);
    console.log("✅ MongoDB connected successfully");

    const collection = mongoose.connection.db.collection("fooditems");
    const data = await collection.find({}).toArray();
    const foodcat = mongoose.connection.db.collection("foodcatagory");
    const catdata = await foodcat.find({}).toArray();

    global.food_items = data;
    global.food_catagory = catdata;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
  }
};

module.exports = mongoDb;
