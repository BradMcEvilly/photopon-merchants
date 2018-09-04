module.exports = {
  options: {
    name: 'photoponConstants',
    dest: 'src/js/constants.js',
    constants: 'src/config/default.json'
  },
  local: {
    constants: 'src/config/local.json'
  },
  development: {
    constants: 'src/config/development.json'
  },
  production: {
    constants: 'src/config/production.json'
  }
}