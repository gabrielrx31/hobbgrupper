const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const logger = require('./middleware/logger');
const eventRoutes = require('./routes/eventRoutes');
const groupRoutes = require('./routes/groupRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const eventValidation = require('./middleware/eventValidation');

const app = express();
const port = 3000;

app.use(express.json());
app.use(logger);

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/mydatabase')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Could not connect to MongoDB...', err));


app.use('/events', eventRoutes);
app.use('/groups', groupRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});