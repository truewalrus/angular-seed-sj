module.exports = function(grunt) {
'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
		mangle: false
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
			src: ['app/less/base/*.less', 'app/less/third-party/*.less'],
			dest: 'app/production/css/base.css',
			options: {
				yuicompress: true
			}
		}
    },
	jshint: {
		all: ['Gruntfile.js', 
				'app/js/*.js', 
				'app/js/directives/*.js',
				'app/js/services/*.js',
				'app/js/filters/*.js', 
				'app/js/controllers/*.js'
			],
		options:{
			globalstrict: true,
			jquery: true,
			node: true,
			sub: true,
			globals: { "angular": false, "FB": false, "window": false, "document":false, "navigator": false}
		}
    },
	
	karma: {
		unit: {
			configFile: 'config/karma.conf.js',
			autoWatch: true
		}
	},
	concat: {
    dist: {
		src: ['app/lib/third-party-js/*.js'],
		dest: 'app/production/lib/js/third-party.js'
    }
  }
  });
  
  

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  //Load the plugin that provides the "less" task.
  grunt.loadNpmTasks('grunt-contrib-less');
  
  //Load the plugin that provides the "jsHint" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  
  //Load the plugin that provides the "karma" task.
  grunt.loadNpmTasks('grunt-karma');
  
  //Load the plugin that provides the "concatenate" task.
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'less', 'jshint', 'concat']);
  
  

};