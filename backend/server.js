const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); 
mongoose.connect('mongodb://127.0.0.1:27017/bookwishlist')
  .then(() => console.log("Connected to MongoDB successfully! 🎉"))
  .catch(err => console.error("MongoDB connection error:", err));


const Book = mongoose.model('Book', {
  title: String,
  author: String,
  rating: { type: Number, default: 0 },
  isRead: { type: Boolean, default: false }
});


app.post('/api/books', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).send(err.message);
  }
});


app.patch('/api/books/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBook);
  } catch (err) {
    res.status(400).send(err.message);
  }
});


app.listen(5000, () => console.log("Server running on port 5000 🚀"));