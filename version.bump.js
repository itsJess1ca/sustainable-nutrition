'use strict';

const pkgJson = require('./package.json');
const fs = require('fs');


const CURRENT_VERSION = pkgJson.version;


fs.writeFile('./src/environments/version.ts', `export const APP_VERSION = "${CURRENT_VERSION}";`, (err) => {
  if (err) throw err;
  console.log("Version environment variable updated.");
});

fs.readFile('./src/assets/service-worker.js', {encoding: 'utf8'}, (err, data) => {
  if (err) throw err;

  const newData = data
    .replace(/const VERSION = '[\S].*';/g, `const VERSION = '${CURRENT_VERSION}';`);

  fs.writeFile('./src/service-worker.js', newData, (err) => {
    if (err) throw err;
    console.log("Service worker version updated.");
  });
});
