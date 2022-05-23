const fs = require('fs');
const folder = './05-merge-styles/styles';
const bundle = './05-merge-styles/project-dist/bundle.css';

fs.stat(bundle, (err) => {
  if (!err) {
    fs.unlink(bundle, err => {
      if (err) throw err;
    });
    fs.open(bundle, 'a', (err) => {
      if (err) throw err;
    });
  } else if (err.code === 'ENOENT') {
    fs.open(bundle, 'a', (err) => {
      if (err) throw err;
    });
  }
});

fs.readdir(folder, { withFileTypes: true }, (err, files) => {
  files.forEach((file, i) => {
    if (file.isFile() && file.name.includes('.css')) {
      fs.readFile(`${folder}/${file.name}`, (err, data) => {
        if (err) {
          console.error(err);
        }
        if (i === 0) {
          fs.appendFile(bundle, `${data}`, (err) => {
            if (err) throw err;
          });
        } else {
          fs.appendFile(bundle, `\n\n${data}`, (err) => {
            if (err) throw err;
          });
        }
      });
    }
  });
});
