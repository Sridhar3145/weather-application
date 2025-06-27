import mongoose from "mongoose";

const weatherSearchSchema = new mongoose.Schema({
  city: String,
  searchedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.WeatherSearch ||
  mongoose.model("WeatherSearch", weatherSearchSchema);
