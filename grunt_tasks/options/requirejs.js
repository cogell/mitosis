module.exports = {
  build: {
    options: {
      baseUrl: '<%= app %>',
      optimize: 'uglify',
      preserveLicenseComments: true,
      useStrict: false,
      wrap: true,
      mainConfigFile: '<%= app %>/require_config.js',
      removeCombined: false,
      findNestedDependencies: true,
      name: 'main',
      out: '<%= dist %>/main.min.js',
      waitSeconds: 7,
      logLevel: 0
    }
  }
}