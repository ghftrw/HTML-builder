const fs = require('fs');
const stream = fs.ReadStream('./01-read-file/text.txt', 'utf-8');
stream.on('data', text => console.log(text));