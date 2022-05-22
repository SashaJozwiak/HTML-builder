const fs = require('fs'),
    path = require('path'),
    stream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');

stream.on('data', text => console.log(text));
