module.exports = function(grunt) {
  require('jit-grunt')(grunt);
  grunt.global = grunt.file.readJSON('config/global.json');
  grunt.removeArray = function(arr){
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
  };
  grunt.getAllPageConfig = function (dir){
    var final = {
      options: {
              compress: true,
              mangle: true
            }
    };
    final['js'] = {};final['js']['files'] = {};final['css'] = {};final['css']['files'] = {};
    var src = grunt.file.expand({},[dir + "*"]) + '';
    var s = src.split(",");
    for (var i = 0; i < s.length; i++) {
    var ss = s[i] + '';
    var file = ss.split("/").pop().split('.');
    var index = file.indexOf("json");
    var f = grunt.removeArray(file,"json").join(".");
    // res[f] = {};
    // res[f]['js'] = require("./" + grunt.global['dir']['config-js'] + require("./" + s[i])['js-file']);
    // res[f]['css'] = require("./" + grunt.global['dir']['config-css'] + require("./" + s[i])['css-file']);
    final['js']['files'][grunt.global['dir']['build']+ 'js/' + f + ".js"] = require("./" + grunt.global['dir']['config-js'] + require("./" + s[i])['js-file']).map(function(e){
       return grunt.global['dir']['js'] + e;
    });
    // final['css']['files'][grunt.global['dir']['build']+ 'css/' + f + ".css"] = require("./" + grunt.global['dir']['config-css'] + require("./" + s[i])['css-file']).map(function(e){
    //    return grunt.global['dir']['css'] + e;
    // });
    }
    grunt.log.write(JSON.stringify(final));
    return final;
  };
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: grunt.getAllPageConfig("config/pages/"),
    watch: {
      home: {
        files: ['src/sass/*.sass'],
        tasks: [''],
      },
    }
    clean: {
      all: ['build/'],
      js: ['build/js/'],
      css: ['build/css/']
    }

  });
  //  grunt.log.write(grunt.file.expand({},["config/pages/*"]));
  // Default task(s).
  grunt.registerTask('default', ['clean:all','uglify']);
  grunt.registerTask('watch', ['watch']);
  grunt.registerTask('echo', 'echo global.build');
}
