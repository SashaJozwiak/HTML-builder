const fs = require('fs');
const path = require('path');
const src = path.resolve(__dirname, 'styles');
const dst = path.resolve(__dirname, 'project-dist', 'bundle.css');

async function mergeStyles(src, dst) {
    const files = await fs.promises.readdir(src, { withFileTypes: true });
    fs.writeFile(dst, '', () => { });
    const writeableStream = fs.createWriteStream(dst);
    for (let file of files) {
        if (file.isFile() && file.name.split('.')[1] === 'css') {
            const fileSource = path.resolve(src, file.name);
            const readableStream = fs.createReadStream(fileSource);
            readableStream.pipe(writeableStream);
        }
    }
}

mergeStyles(src, dst);
