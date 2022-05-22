const path = require('path'),
    fsPromises = require('fs').promises;

async function copyFiles(src, dst) {

    const srcFiles = path.join(__dirname, src),
        dstFiles = path.join(__dirname, dst);

    await fsPromises.mkdir(dstFiles, { recursive: true });

    let files = await fsPromises.readdir(dstFiles);

    for (let file of files) {
        await fsPromises.rm(path.join(dstFiles, file));
    }

    files = await fsPromises.readdir(srcFiles);

    for (let file of files) {
        await fsPromises.copyFile(path.join(srcFiles, file), path.join(dstFiles, file));
    }

}

copyFiles('files', 'files-copy');
