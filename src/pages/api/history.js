import connectDB from "@/Utils/connectDB";
import WeatherSearch from "@/models/weatherSearch";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const history = await WeatherSearch.find().sort({ searchedAt: -1 });
      return res.status(200).json(history);
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  if (req.method === "POST") {
    try {
      const { city } = req.body;
      await WeatherSearch.create({ city });
      return res.status(201).json({ message: "Saved to history" });
    } catch (error) {
      return res.status(500).json({ error: "Error saving city" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { id } = req.body;
      await WeatherSearch.findByIdAndDelete(id);
      return res.status(200).json({ message: "Deleted from history" });
    } catch (error) {
      return res.status(500).json({ error: "Error deleting city" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
