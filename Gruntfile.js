module.exports = function(grunt) {
  // require('jit-grunt')(grunt);
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
    var final = {};
    final['uglify'] = {
      options: {
              compress: true,
              mangle: true
            },
    };
    final['watch'] = {};
    // final['js'] = {};final['js']['files'] = {};
    // final['css'] = {};final['css']['files'] = {};
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
    var rqs = require("./" + s[i]);
    grunt.log.write();
    var datafx = require("./" + grunt.global['dir']['config-js'] + rqs['js-file']).map(function(e){
       return grunt.global['dir']['js'] + e;
    });
    final['uglify'][f] = {};
    final['uglify'][f]['files'] = {};
    final['uglify'][f]['files'][grunt.global['dir']['build']+ 'js/' + f + ".js"] = datafx;
    final['watch'][f] = {};
    final['watch'][f]['files'] = [s[i],grunt.global['dir']['config-js'] + rqs['js-file'] + ".json"];
    for(var ix = 0;ix<datafx.length;ix++){
      final['watch'][f]['files'].push(datafx[ix]);
    }
    final['watch'][f]['tasks'] = ['uglify:' + f];

    // final['css']['files'][grunt.global['dir']['build']+ 'css/' + f + ".css"] = require("./" + grunt.global['dir']['config-css'] + require("./" + s[i])['css-file']).map(function(e){
    //    return grunt.global['dir']['  css'] + e;
    // });
    }

    return final;
  };
  // Project configuration.
  grunt.pageConf = grunt.getAllPageConfig(grunt.global['dir']['config-page']);
  // grunt.log.write(grunt.pageConf);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: grunt.pageConf['watch'],
    uglify: grunt.pageConf['uglify'],
    clean: {
      all: ['build/'],
      js: ['build/js/'],
      css: ['build/css/']
    }
  });
  //  grunt.log.write(grunt.file.expand({},["config/pages/*"]));

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  // Default task(s).
  grunt.registerTask('default', ['clean:all','uglify']);
  grunt.registerTask('start-server', ['clean:all','uglify','watch']);

  // grunt.registerTask('default', ['watch']);
  grunt.registerTask('w', ['watch:json']);
  grunt.registerTask('echo', 'echo grunt.global');
}
