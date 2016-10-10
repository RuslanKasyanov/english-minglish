var nconf = require('nconf');

/**
 * Setup nconf to user:
 *  argv() - command-line arguments
 *  env()  - environment variables
 *  file() - variable from file
 */
nconf.argv()
     .env()
     .file({ file: './config/main.json' });

module.exports = nconf;