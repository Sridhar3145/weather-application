import mongoose from "mongoose";

const weatherSearchSchema = new mongoose.Schema({
  city: {
    type: String,
    unique: true,
  },
  searchedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.WeatherSearch ||
  mongoose.model("WeatherSearch", weatherSearchSchema);
