require('babel-register')({
  presets: [
    'es2015-node5',
  ],
});
const config = require('./singleton');

console.log(config);

const config2 = require('./singleton');

console.log('Second..', config2);
