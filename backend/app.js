const express = require('express');
const cors = require('cors');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Middleware
app.use(cors()); // Allows requests from the React frontend
app.use(express.json()); // Parses incoming JSON requests

// Routes
app.use('/api/contact', contactRoutes);

// Start the server
const PORT = 5000; // Backend will run on this port
app.listen(PORT, () => {
   console.log(`Backend running at http://localhost:${PORT}`);
});
