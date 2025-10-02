const fs = require('fs');
const path = require('path');

const logsDir = path.join(process.cwd(), 'Logs');

// remove Log files
if (fs.existsSync(logsDir)) {
    const files = fs.readdirSync(logsDir);

    files.forEach(file => {
        console.log(`delete files...${file}`);
        fs.unlinkSync(path.join(logsDir, file));
    });

    fs.rmdirSync(logsDir);
    console.log('Logs directory removed');
}
