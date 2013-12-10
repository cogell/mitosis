module.exports = {
  compile: {
    options: {
      outputStyle: 'expanded',
      sourceComments: 'none'
    },
    files: {
      '<%= dist %>/css/main.css': '<%= app %>/styles/main.scss'
    }
  }
}