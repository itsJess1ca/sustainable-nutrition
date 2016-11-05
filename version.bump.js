'use strict';

const pkgJson = require('./package.json');
const fs = require('fs');

const CURRENT_VERSION = pkgJson.version;

fs.writeFile('./src/environments/version.ts', `export const APP_VERSION = "${CURRENT_VERSION}";`, (err) => {
  if (err) throw err;
  console.log("It\'s Saved!");
});
