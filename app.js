require('dotenv').config();
const express = require('express');
const path = require('path');
const apiRoutes = require('./api')

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", apiRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});