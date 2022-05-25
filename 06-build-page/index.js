const path = require('path'),
    fs = require('fs'),
    fsPromises = fs.promises,
    stylesFile = 'style.css',
    styles = [];


async function build(template, components, assets, dst) {
    const templatePath = path.join(__dirname, template),
        dstPath = path.join(__dirname, dst),
        componentsPath = path.join(__dirname, components),
        assetsPath = path.join(__dirname, assets);

    buildTemplate(templatePath, componentsPath, dstPath);
    buildCSS('styles', dst);
    copy(assetsPath, path.join(dstPath, assets));
}

async function buildTemplate(templatePath, componentsPath, dstPath) {
    const html = await fsPromises.readFile(templatePath),
        componentFiles = await fsPromises.readdir(componentsPath);
    let content = html.toString();

    for (let componentFile of componentFiles) {
        const stats = await fsPromises.stat(path.join(componentsPath, componentFile));
        if (stats.isFile() && path.extname(componentFile) === '.html') {
            let componentName = path.basename(componentFile, path.extname(componentFile)),
                componentContent = await fsPromises.readFile(path.join(componentsPath, componentFile));

            content = content.replace(new RegExp(`{{${componentName}}}`), componentContent.toString());
        }
    }

    await fsPromises.mkdir(dstPath, { recursive: true });
    await fsPromises.writeFile(path.join(dstPath, 'index.html'), content);
}

async function buildCSS(src, dst) {
    const srcPath = path.join(__dirname, src),
        dstFilePath = path.join(__dirname, dst, stylesFile);

    let files = await fsPromises.readdir(srcPath);
    for (let file of files) {
        const stats = await fsPromises.stat(path.join(srcPath, file));

        if (stats.isFile() && path.extname(file) === '.css') {
            let stylesBuffer = await fsPromises.readFile(path.join(srcPath, file));
            styles.push(stylesBuffer);
        }
    }

    let point = true;

    for (let style of styles) {
        if (point) {
            await fsPromises.writeFile(dstFilePath, style);
            point = false;
        } else {
            await fsPromises.writeFile(dstFilePath, style, { flag: 'a' });
        }
    }
}

async function copy(srcPath, dstPath) {

    await fsPromises.mkdir(dstPath, { recursive: true });

    let files = await fsPromises.readdir(dstPath);

    for (let file of files) {
        await fsPromises.rm(path.join(dstPath, file), { recursive: true, force: true });
    }

    files = await fsPromises.readdir(srcPath);

    for (let file of files) {
        let stats = await fsPromises.stat(path.join(srcPath, file));

        if (!stats.isDirectory()) {
            await fsPromises.copyFile(path.join(srcPath, file), path.join(dstPath, file));
        } else {
            await copy(path.join(srcPath, file), path.join(dstPath, file));
        }
    }
}

build('template.html', 'components', 'assets', 'project-dist');
