// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://webapp:123@cluster0.uqcpc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema and model
const genderRevealSchema = new mongoose.Schema({
    gender: String,
    color: String
});

const GenderReveal = mongoose.model('gender-reveal', genderRevealSchema);

// Create a route to fetch gender by id
app.get('/api/gender-reveal/gender/:id', async (req, res) => {
    try {
        const result = await GenderReveal.findOne({gender: req.params.id});
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/gender-reveal/result', async (req, res) => {
    try {
        const result = await GenderReveal.findOne({type: "RESULT"});
        res.json({gender: result.gender});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});