'use strict';

const pkgJson = require('./package.json');
const fs = require('fs');

const CURRENT_VERSION = pkgJson.version;

console.log(CURRENT_VERSION);
