require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.json({ message: 'Blog API is running.' }));
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

app.use((req, res) => res.status(404).json({ message: 'Route not found.' }));
app.use((error, req, res, next) => {
  console.error(error);
  if (error.name === 'ValidationError') return res.status(400).json({ message: error.message });
  if (error.name === 'CastError') return res.status(400).json({ message: 'Invalid ID format.' });
  if (error.code === 11000) return res.status(409).json({ message: 'Email already exists.' });
  res.status(500).json({ message: 'Server error. Please try again.' });
});

const PORT = process.env.PORT || 5000;
async function startServer() {
  await connectDB();
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
}
startServer();
