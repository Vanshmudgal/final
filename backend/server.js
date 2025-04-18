import express from "express"
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config'; // Load environment variables from .env
import connectDB from './db.js'; // Import the connectDB function
import City from './schema.js'; 
import UserModel from "./schema2.js";



const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

console.log('MONGO_URI:', process.env.MONGO_URI); // Debugging log

// Middleware
app.use(cors());
app.use(express.json());



// MongoDB Connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });

// Routes
app.get('/', (req, res) => {
  res.send('Hello from Express API!');
});



// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
  console.log('Server error:', err);
});



app.get("/cities/random", async (req, res) => {
    try {
      const randomCities = await City.aggregate([{ $sample: { size: 3 } }]); // Get 3 random cities
      res.json(randomCities); // Send to client-side
    } catch (err) {
      console.error("Error fetching cities:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });



  
  // ✅ GET: Retrieve score using friend's referral code (if exists)
  