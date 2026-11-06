const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, '..', 'site', 'assets', 'catalog.js'), 'utf8');
module.exports = JSON.parse(src.slice(src.indexOf('['), src.lastIndexOf(']') + 1));
