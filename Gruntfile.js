module.exports = function(grunt) {
  grunt.initConfig({
    less: {
      development: {
        options: {
          paths: ["./public/stylesheets/less"],
          yuicompress: true
        },
        files: {
          "./public/stylesheets/app.css": "./public/stylesheets/less/app.less"
        }
      },
      production: {
        options: {
          paths: ["./public/stylesheets/less"],
          cleancss: true
        },
        files: {
          "./public/stylesheets/app.css": "./public/stylesheets/less/app.less"
        }
      }
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: './',
          mainConfigFile: 'public/javascripts/main.js',
          stubModules: ['jsx'],
          name: 'public/javascripts/main',
          exclude: ['react', 'JSXTransformer', 'text'],
          out: 'public/javascripts/app.js'
        }
      }
    },

    uglify: {
      options: {
        mangle: {
          except: ['jQuery', 'require', 'React']
        }
      },
      my_target: {
        files: {
          './public/javascripts/app.js': ['./bower_components/requirejs/require.js', './public/javascripts/app.js']
        }
      }
    },

    watch: {
      files: "./public/stylesheets/less/*",
      tasks: ["less"]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', 'watch');
  grunt.registerTask('build', ['less:production', 'requirejs', 'uglify']);
};