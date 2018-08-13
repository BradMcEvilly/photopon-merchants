module.exports = {
  options: {
    name: 'photoponConstants',
    dest: 'src/js/constants.js',
    constants: 'src/config/default.json'
  },
  development: {
    constants: 'src/config/development.json'
  },
  production: {
    constants: 'src/config/production.json'
  }
}