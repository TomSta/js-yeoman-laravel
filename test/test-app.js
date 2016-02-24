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
 var helper, answers, policies;

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


    it("asks if laravel repo should be cloned", function(){
          console.log(helper.generator);
       assert.isBoolean(answers.clone_laravel);
    });

    it("asks if composer should be run", function(){
        assert.isBoolean(answers.composer_install);
    });

    it("asks if npm install should be run", function(){
         assert.isBoolean(answers.npm_install);
    });

    it("has access to policies", function(){
      policies = helper.generator.policies;
      assert.isObject(policies);
      assert.isFunction(policies.canInstallComposer);
    });

    it("should download composer if it's the first run", function(){
      helper.generator.config.set('composer_installed', false);
      expect(policies.canInstallComposer()).to.equal(true);
    });

    it("should not download composer if it's run again", function(){
      helper.generator.config.set('composer_installed', true);
      expect(policies.canInstallComposer()).to.equal(false);
    });

  });

});
