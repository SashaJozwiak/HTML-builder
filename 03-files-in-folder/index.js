const path = require('path'),
    fs = require('fs/promises');

async function allFiles() {
    const files = await fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true });
    for (let file of files) {
        if (file.isFile()) {
            const arrayFiles = file.name.split('.'),
                fileSize = (await fs.stat(path.resolve(__dirname, 'secret-folder', file.name))).size / 1000;
            console.log(`${arrayFiles[0]} \t-\t ${arrayFiles[1]} \t-\t ${fileSize}\tkb`);
        }
    }
}

allFiles();
