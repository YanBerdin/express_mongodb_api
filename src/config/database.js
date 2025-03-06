const mongoose = require("mongoose");

const connectDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error("❌ Erreur : MONGODB_URI non définie dans .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ successfully connected to MongoDB");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB", error);
    process.exit(1);
  }

  mongoose.connection.on("connected", () => console.log("🔗 MongoDB connected"));
  mongoose.connection.on("disconnected", () =>
    console.log("🔌 MongoDB disconnected")
  );
  mongoose.connection.on("reconnected", () =>
    console.log("🔄 MongoDB reconnected")
  );
  mongoose.connection.on("close", () =>
    console.log("❌ Connexion MongoDB closed")
  );
};

module.exports = connectDB;
