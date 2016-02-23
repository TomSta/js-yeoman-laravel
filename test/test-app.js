var path = require('path');
var yoassert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs-extra');
var _ = require('lodash');
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
     assert = chai.assert;

describe('yaylar:app', function () {
 var helper, answers, modelName, appDir, viewsDir, file;

 describe('first install', function () {

   before( function (done) {
       helper = helpers.run( path.join(__dirname, '../generators/app') )
       .inTmpDir(function (dir) {
             var done = this.async(); // `this` is the RunContext object.
             fs.copy(path.join(__dirname, '../tmp_data'), dir, done);
       }).withArguments(['NewModel'])
       .withOptions({ fields: 'rambo,tytul' })
       .withPrompts({
           clone_laravel: true

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

   });

   it("asks if npm install should be run", function(){

   });


    it("asks if laravel repo should be cloned", function(){
      assert.isBoolean(answers.clone_laravel, 'is the tea ready');
    });



  });



});
