const fs = require('fs');

fs.stat('./04-copy-directory/files-copy', (err) => {
  if (!err) {
    fs.readdir('./04-copy-directory/files-copy', (err, files) => {
      if (err) throw err;
      files.forEach(file => {
        fs.unlink(`./04-copy-directory/files-copy/${file}`, err => {
          if (err) throw err;
        });
      });
    });
  }

  else if (err.code === 'ENOENT') {
    fs.mkdir('./04-copy-directory/files-copy', err => {
      if (err) throw err;
    });
  }

  fs.readdir('./04-copy-directory/files', (err, files) => {
    files.forEach(file => {
      fs.copyFile(`./04-copy-directory/files/${file}`, `./04-copy-directory/files-copy/${file}`, err => {
        if (err) throw err;
      });
    });
  });
});
