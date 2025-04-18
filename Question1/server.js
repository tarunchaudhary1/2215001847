const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

db();

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));