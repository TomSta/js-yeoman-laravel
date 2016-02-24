var path = require('path'),
      yoassert = require('yeoman-assert'),
      helpers = require('yeoman-test'),
      fs = require('fs-extra'),
      _ = require('lodash'),
      chai = require('chai'),
      expect = chai.expect,
      should = chai.should(),
      assert = chai.assert;

describe('yaylar:app', function () {
 var helper, answers;

 describe('first install', function () {

   before( function (done) {
       helper = helpers.run( path.join(__dirname, '../generators/app') )
       .inTmpDir(function (dir) {
             var done = this.async(); // `this` is the RunContext object.
             fs.copy(path.join(__dirname, '../tmp_data'), dir, done);
       }).withArguments(['NewModel'])
       .withOptions({ fields: 'rambo,tytul' })
       .withPrompts({
           clone_laravel: true,
           npm_install: true,
           composer_install: true,

       })
       .on('end', function(){
         answers = helper.answers;
         modelName = helper.args[0];
         appDir = 'app/';
         viewsDir = "resources/views/";
         done();
       });

   });




   it("asks if composer should be run", function(){
      assert.isBoolean(answers.composer_install);
   });

   it("asks if npm install should be run", function(){
       assert.isBoolean(answers.npm_install);
   });

    it("asks if laravel repo should be cloned", function(){
      assert.isBoolean(answers.clone_laravel);
    });



  });



});
