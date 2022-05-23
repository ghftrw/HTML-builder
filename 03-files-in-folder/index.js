const folder = './03-files-in-folder/secret-folder';
const fs = require('fs');
let splitedStr = [];

fs.readdir(folder, {withFileTypes: true}, (err, files) => {
  files.forEach(file => {
    if (file.isFile()) {
      fs.stat(folder + `/${file.name}`, (err, stats) => {
        splitedStr = file.name.toString().split('.');
        console.log(splitedStr[0] + ' - ' + splitedStr[1] + ' - ' +  stats.size / 1024 + 'kb');
      });
    }
  });
});

