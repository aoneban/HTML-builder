const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');

fs.writeFile(
    path.join(__dirname, 'text2.txt'),
    '',
    (err) => {
        if (err) throw err;
        //console.log('Файл был создан');
    }
);

stdout.write('Hello RSS-scool student! Write please some phrase...\n')
stdin.on('data', data => {
  const name = data.toString();
  if (name == 'exit') {
    stdout.write(`\nGoodby!`);
    process.exit();
  }
  stdout.write(`\nYou add to file text2.txt phrase: ${name}`);
  fs.appendFile(
    path.join(__dirname,'text2.txt'),
    name,
    err => {
        if (err) throw err;
    } 
);
});