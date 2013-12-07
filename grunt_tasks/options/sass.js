module.exports = {
  options: {
    // includePaths: ''
  },
  compile: {
    options: {
      outputStyle: 'expanded',
      sourceComments: 'none'
    },
    files: {
      '<%= dist %>/main.css': '<%= app %>/styles/main.scss'
    }
  }
}