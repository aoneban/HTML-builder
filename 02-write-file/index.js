const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');

fs.writeFile(path.join(__dirname, 'textForWords.txt'), '', (err) => {
  if (err) throw err;
});

stdout.write('\nПривет, RSS-scool студент! Напиши какую-нибудь фразу...\n');
process.on('SIGINT', () => {
  stdout.write('\nУдачи в изучении Node.js!\n');
  process.exit();
});
stdin.on('data', (data) => {
  const name = data.toString();
  const forExit = data.toString().trim();
  if (forExit === 'exit') {
    stdout.write('\nУдачи в изучении Node.js!\n');
    process.exit();
  }
  stdout.write(`\nВы добавили в файл text2 следующую фразу: ${name}\n`);
  fs.appendFile(path.join(__dirname, 'text2.txt'), name, (err) => {
    if (err) throw err;
  });
});
