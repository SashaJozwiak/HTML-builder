const path = require('path'),
    fs = require('fs'),
    file = path.resolve(__dirname, 'text.txt'),
    writeStream = fs.createWriteStream(file),
    readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
    });

function addText() {
    readline.question('Add text\n', answer => {
        if (answer === 'exit') {
            readline.close();
        } else {
            writeStream.write(answer + '\n');
            addText();
        }
    });
}

readline.on('close', () => readline.output.write('Bye!'));
fs.promises.writeFile(file, '');
addText();
