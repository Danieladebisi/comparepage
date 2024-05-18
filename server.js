const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/techMansionDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('Could not connect to MongoDB:', err);
        process.exit(1);
    });


// Device Schema
const deviceSchema = new mongoose.Schema({
    name: String,
    display: String,
    processor: String,
    ram: String,
    storage: String,
    camera: String,
    battery: String,
    os: String,
    price: Number
});

const Device = mongoose.model('Device', deviceSchema);

// Routes
app.post('/api/devices', async (req, res) => {
    try {
        console.log('Request body:', req.body); // Log the request body
        const device = new Device(req.body);
        await device.save();
        res.send(device);
    } catch (error) {
        console.error('Error saving device:', error); // Log the error
        res.status(500).send('Failed to add device.');
    }
});

app.get('/api/devices/:name', async (req, res) => {
    try {
        const query = req.params.name.trim(); // Trim any leading/trailing spaces
        if (!query) {
            // If the query is empty, return all devices
            const devices = await Device.find({});
            res.send(devices);
        } else {
            // Perform a case-insensitive partial match search
            const devices = await Device.find({ name: { $regex: new RegExp(query, 'i') } });
            res.send(devices);
        }
    } catch (error) {
        console.error('Error fetching devices:', error);
        res.status(500).send('Failed to fetch devices.');
    }
});





app.get('/api/devices/:name', async (req, res) => {
    try {
        const device = await Device.findOne({ name: req.params.name });
        res.send(device);
    } catch (error) {
        console.error('Error fetching device:', error); // Log the error
        res.status(500).send('Failed to fetch device.');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
