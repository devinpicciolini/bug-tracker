// server.js
const express = require('express');
const reportBug = require('./src/api/reportBug');

const app = express();

app.use('/api/report-bug', reportBug);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
