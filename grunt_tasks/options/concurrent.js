module.exports = {
  dev: {
    tasks:[
      'copy:index',
      'copy:dep',
      'copy:html',
      'copy:fonts',
      'copy:js',
      'copy:requirejs',
      'less:compileBS',
      'sass:compile'
    ]
  }
}