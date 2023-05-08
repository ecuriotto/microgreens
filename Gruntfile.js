module.exports = function (grunt) {
  grunt.initConfig({
    concat: {
      options: {
        separator: '\n',
      },
      dist: {
        src: [
          'views/index.html',
          'views/header.html',
          'views/home.html',
          'views/why.html',
          'views/what.html',
          'views/partials/donate.html',
          'views/plants.html',
          'views/partials/donate.html',
          'views/chemicals.html',
          'views/partials/donate.html',
          'views/contacts.html',
          'views/footer.html',
          'views/partials/modal5Reasons.html',
          'views/partials/modalSinglePlant.html',
          'views/libraries.html',
        ],
        dest: 'dist/public/index.html',
      },
    },
    copy: {
      public: {
        src: 'public/**/*',
        dest: 'dist/',
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['copy', 'concat']);
};