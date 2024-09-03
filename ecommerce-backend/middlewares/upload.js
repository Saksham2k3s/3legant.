const multer = require('multer');

// Set up multer storage configuration

const storage = multer.memoryStorage(); // Store files in memory

const upload = multer({ storage: storage });

module.exports = upload;
