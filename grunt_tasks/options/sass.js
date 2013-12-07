module.exports = {
  options: {
    // includePaths: ''
  },
  dev: {
    options: {
      outputStyle: 'expanded',
      sourceComments: 'none'
    },
    files: {
      '<%= dist %>/main.css': '<%= app %>/styles/main.scss'
    }
  }
}