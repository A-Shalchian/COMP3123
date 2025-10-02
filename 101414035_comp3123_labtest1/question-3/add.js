const fs = require('fs');
const path = require('path');

const logsDir = path.join(process.cwd(), 'Logs');

// create Logs directory if it doesn't exist
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

// change current process to the new Logs directory
process.chdir(logsDir);

// create 10 log files and write some text
for (let i = 0; i < 10; i++) {
    const fileName = `log${i}.txt`;
    fs.writeFileSync(fileName, `I am log file number ${i}`);
    console.log(fileName);
}
