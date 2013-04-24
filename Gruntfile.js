module.exports = function(grunt) {
'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: [  'app/js/*.js', 
				'app/js/directives/*.js',
				'app/js/services/*.js',
				'app/js/filters/*.js', 
				'app/js/controllers/*.js' 
				],
        dest: 'app/production/build.js'
      }
    },
	less: {
		base: {
			src: 'app/less/base/*.less',
			dest: 'app/css/base.css',
			options: {
				yuicompress: true
			}
		}
    },
	jshint: {
		all: ['Gruntfile.js', 'app/js/filters.js'],
		options:{
			globalstrict: true,
			jquery: true,
			node: true,
			globals: { "angular": false }
		}
    },
	
	karma: {
		unit: {
			configFile: 'config/karma.conf.js',
			autoWatch: true
		}
	}
  });
  
  

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  //Load the plugin that provies the "less" task.
  grunt.loadNpmTasks('grunt-contrib-less');
  
  //Load the plugin that provies the "jsHint" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  
  //Load the plugin that provides the "karma" task.
  grunt.loadNpmTasks('grunt-karma');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'less', 'jshint']);

};