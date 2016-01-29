module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    shell: {
      tests: {
        command: "echo -e \\\\033c & mocha"
      }
   },
   watch: {
    php: {
      files: ['generators/**/*.js', 
            'test/**/*.js', 
            'Gruntfile.js'],
      tasks: ['shell:tests'],
      options: {
        spawn: false,
      },
    },
   },
  });


  // Default task(s).
  //grunt.registerTask('default', ['watch']);

}
