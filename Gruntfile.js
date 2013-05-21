module.exports = function(grunt) {
	'use strict';

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		// Uglify minifies and concatenates all js files for release.
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */'
			},
			release: {
				files: {
					'release/server.min.js': [ 'server.js' ],
					'release/app/js/app.min.js': [ 'app/js/**/*.js' ]
				}
			}
		},
		//converts less to css in app/production/css/base.css
		less: {
			base: {
				src: [
					'app/less/base/*.less',
					'app/less/third-party/*.less'
				],
				dest: 'app/production/css/base.css',
				options: {
					yuicompress: true
				}
			},
			release: {
				options: {
					yuicompress: true
				},
				files: {
					'release/app/css/base.min.css': [
						'app/less/base/*.less',
						'app/less/third-part/*.less'
					]
				}
			}
		},
		//runs all angularjs files through jshint for linting purposes
		jshint: {
			all: [
				'Gruntfile.js',
				'app/js/**/*.js'
			],
			//options set to make angular agree with jshint a bit more
			options:{
				globalstrict: true,
				jquery: true,
				node: true,
				sub: true,
				/*
				sets some global variable names that jshint will not throw errors for
				without this, it will complain that these global variables are not defined and such
				*/
				globals: {
					"angular":		false,
					"FB":			false,
					"window":		false,
					"document":		false,
					"navigator":	false
				}
			}
		},
		//not currently set up, karma is a testing plugin
		karma: {
			unit: {
				configFile: 'config/karma.conf.js',
				autoWatch: true
			}
		},
		/*
		concatenates all third party js files in app/lib/third-party-js inclusions into one file, app/production/lib/js/third-party.js 
		this allows for easier script inclusion in index.html
		*/
		concat: {
			third_party: {
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

	// Default task(s). Add task here if you want it to run every time grunt is run
	grunt.registerTask('default', ['less:base', 'jshint', 'concat']);
	
	grunt.registerTask('release', ['uglify:release', 'less:release']);

};