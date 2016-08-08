module.exports = function(grunt) {
  var script = require('./grunt-tasks/script').init(grunt),
    banner = script.banner;

  var moduleName = 'app-${app}',
    srcPath = '${app}',
    distPath = srcPath + '-dist',
    distAssetsPath = distPath + '/assets/',
    distModulesPath = distPath + '/modules/',
    distTplsPath = distPath + '/tpls/';

  grunt.initConfig({
    jst: { //预编译underscore模板
      build: {
        files: [{
          expand: true,
          cwd: srcPath + '/modules/',
          src: ['**/*.html'],
          dest: srcPath + '/modules/',
          ext: '-html.js' //编译后文件扩展名，a.html-->a-html.js
        }]
      },
      options: {
        amd: true, //输出AMD模块文件，即用define函数包起来
        namespace: false,
        prettify: true, //编译成一行
        templateSettings: { //配置underscore模板语法
          evaluate: /##([\s\S]+?)##/g,
          interpolate: /\{\{(.+?)\}\}/g,
          escape: /\{\{\{\{-([\s\S]+?)\}\}\}\}/g
        }
      }
    },
    less: {
      parse: {
        files: {
          '${app}/assets/style/all.css': [srcPath + '/assets/style/all.less']
        }
      }
    },
    copy: {
      all: {
        files: [{
          expand: true,
          cwd: srcPath,
          src: ['**/*.*', '!**/*.less', '!less'],
          dest: distPath
        }]
      }
    },
    imagemin: { // Task
      assets: { // Another target
        options: { // Target options
          optimizationLevel: 3
        },
        files: [{
          expand: true, // Enable dynamic expansion
          cwd: distAssetsPath + 'images/', // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],
          dest: distAssetsPath + 'images/' // Destination path prefix
        }]
      }
    },
    transport: {
      options: {
        // Task-specific options go here.
        debug: false,
        parsers: {
          '.js': [script.jsParser],
          '.html': [script.htmlParser]
        }
      },
      main: {
        options: {
          idleading: moduleName + '/'
        },
        files: [{
          expand: true,
          cwd: distPath,
          src: 'app.js',
          dest: distPath
        }]
      },
      modules: {
        options: {
          idleading: moduleName + '-modules/'
        },
        files: [{
          expand: true,
          cwd: distModulesPath,
          src: '**/*.js',
          dest: distModulesPath
        }]
      },
      tpls: {
        options: {
          idleading: moduleName + '-tpls/'
        },
        files: [{
          expand: true,
          cwd: distTplsPath,
          src: '**/*.js',
          dest: distTplsPath
        }]
      },
      "tpls.html": {
        options: {
          idleading: moduleName + '-tpls/'
        },
        files: [{
          expand: true,
          cwd: distTplsPath,
          src: '**/*.html',
          dest: distTplsPath
        }]
      }
    },
    uglify: {
      options: {
        banner: banner,
        mangle: true,
        compress: {
          drop_console: true
        }
      },
      main: {
        files: [{
          expand: true,
          cwd: distPath,
          src: 'app.js',
          dest: distPath
        }]
      },
      assets: {
        files: [{
          expand: true,
          cwd: distAssetsPath,
          src: ['**/*.js', '**/*.json'],
          dest: distAssetsPath
        }]
      },
      modules: {
        files: [{
          expand: true,
          cwd: distModulesPath,
          src: ['**/*.js', '!**/*.min.js'],
          dest: distModulesPath
        }]
      },
      tpls: {
        files: [{
          expand: true,
          cwd: distTplsPath,
          src: ['**/*.js', '!**/*.min.js'],
          dest: distTplsPath
        }]
      }
    },
    cssmin: {
      options: {
        banner: banner,
        processImport: false
      },
      assets: {
        files: [{
          expand: true,
          cwd: distAssetsPath + 'style',
          src: ['**/*.css', '!**/*.min.css'],
          dest: distAssetsPath + 'style'
        }]
      }
    },
    htmlmin: {
      tpls: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: distTplsPath,
          src: ['**/*.html', '!**/*.min.html'],
          dest: distTplsPath
        }]
      }
    },
    concat: {
      options: {
        stripBanners: true,
        banner: banner
      },
      js: {
        files: [{
          src: [
            distTplsPath + '**/*.js',
            distModulesPath + '**/*.js',
            distPath + '/app.js'
          ],
          dest: distPath + '/app.js',
          nonull: true
        }]
      }
    },
    clean: {
      all: { //清理所有dist文件
        files: [{
          src: [distPath + '/**']
        }]
      }
    },
    cleanempty: {
      src: [distPath + '/**']
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      src: [srcPath + '/**/*.js', '!' + srcPath + '/**/*-html.js']
    },
    watch: {
      jst: {
        files: [srcPath + '/modules/**/*.html'],
        tasks: ['jst'], //自动执行underscore模板预编译任务
        options: {
          event: ['changed', 'added', 'deleted']
        }
      },
      less: {
        files: [srcPath + '/**/*.less'],
        tasks: ['less'],
        options: {
          event: ['changed', 'added', 'deleted']
        }
      },
      css: {
        files: [srcPath + '/**/*.css'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-cleanempty');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('dev', [
    'jst',
    'watch'
  ]);
  grunt.registerTask('build', [
    'clean',
    'jst',
    'jshint',
    'copy',
    'transport:tpls.html'
  ]);
  grunt.registerTask('release', [
    'clean',
    'jst',
    'jshint',
    'copy',
    'transport',
    'concat',
    'uglify',
    'htmlmin',
    'cssmin',
    'cleanempty'
  ]);
};
