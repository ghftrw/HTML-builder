const fs = require('fs');
const process = require('process');

fs.open('./02-write-file/text.txt', 'a', (err) => {
  if (err) throw err;
});

console.log('Введите текст: ');

process.stdin.on('data', data => {
  if (data.toString() === 'exit\r\n') {
    console.log('Текс введен.');
    process.exit();
  }
  fs.appendFile('./02-write-file/text.txt', data, (err) => {
    if (err) throw err;
  });
});


process.on('SIGINT', () => {
  console.log(' Текс введен.');
  process.exit();
});
