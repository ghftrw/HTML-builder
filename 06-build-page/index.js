const fs = require('fs');
const fspromises = require('fs/promises');
const styleFolder = './06-build-page/styles';
const htmlFile = './06-build-page/template.html';
const styleFile = './06-build-page/project-dist/style.css';
const indexFile = './06-build-page/project-dist/index.html';

fs.mkdir('./06-build-page/project-dist', { recursive: true }, (err) => {
  if (err) throw err;
});

fs.mkdir('./06-build-page/project-dist/assets', { recursive: true }, err => {
  if (err) throw err;
});

fs.writeFile(styleFile, '', (err) => {
  if (err) throw err;
});

fs.open(indexFile, 'a', (err) => {
  if (err) throw err;
});

fs.readdir(styleFolder, { withFileTypes: true }, (err, files) => {
  files.forEach(file => {
    if (file.isFile() && file.name.includes('.css')) {
      fs.readFile(`${styleFolder}/${file.name}`, (err, data) => {
        if (err) throw err;
        fs.appendFile(styleFile, `\n\n${data}`, (err) => {
          if (err) throw err;
        });
      });
    }
  });
});


let arrAssets = ['/fonts', '/img', '/svg'];

arrAssets.forEach(folder => {
  fs.readdir(__dirname + '/assets' + folder, (err, files) => {
    fs.mkdir('./06-build-page/project-dist/assets' + folder, { recursive: true }, err => {
      if (err) throw err;
    });
    files.forEach(file => {
      fs.copyFile(__dirname + '/assets' + folder + `/${file}`, __dirname + `/project-dist/assets${folder}/${file}`, err => {
        if (err) throw err;
      });
    });
  });
});

fs.readFile(htmlFile, (err, buff) => {
  if (err) throw err;
  fs.writeFile(indexFile, buff, (err) => {
    if (err) throw err;
  });
  
  const stream = fs.ReadStream(indexFile, 'utf-8');
  stream.on('data', async text => {
    let htmlText = text.toString();
    let files = await fspromises.readdir(__dirname + '/components');
    files.forEach(file => {
      const componentStream = fs.ReadStream(__dirname + '/components' + '/' + file, 'utf-8');
      componentStream.on('data', textFile => {
        let componentName = file.split('.')[0];
        let reg = new RegExp(`{{${componentName}}}`, 'g');

        htmlText = htmlText.replace(reg, textFile.toString());
      });
      componentStream.on('end', () => {
        fs.writeFile(indexFile, htmlText, (err) => {
          if (err) throw err;
        });
      });
    });
  });
});
