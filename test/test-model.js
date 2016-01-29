var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs-extra');
var _ = require('lodash');
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

describe('yaylar:model', function () {
 var helper, answers, args;

 describe('crud generator', function () {
    
    before( function (done) {
        helper = helpers.run( path.join(__dirname, '../generators/model') )
        .inTmpDir(function (dir) {
              var done = this.async(); // `this` is the RunContext object.
              fs.copy(path.join(__dirname, '../tmp_data'), dir, done);
        }).withArguments(['NewModel'])
        .withOptions({ fields: 'rambo,tytul' })
        .withPrompts({
            namespace: 'App\\',
            rambo_type: 'string',
            tytul_type: 'integer'
        })
        .on('end', function(){
          answers = helper.answers;
          args = helper.args;
          done();
        });
        
        
    });
    
    describe('creates migration', function () {
      it('file', function () {    
          assert.file([
              'database/migrations/create_newmodels_table.php'
              ]);
      });

      it('and fills up table structure', function () {
           assert.fileContent(
                'database/migrations/create_newmodels_table.php',
                "$table->string('rambo');");
      });
    });
    
    describe('creates factory for models', function () {
      it('and adds factory in laravel\'s ModelFactor.php', function () {
           assert.fileContent(
                'database/factories/ModelFactory.php',
                '"rambo" => $faker->name');
      }); 
    });

    describe("creates model", function () {
    
      it("with namespace from prompt", function () {
        expect(answers).to.include.keys('namespace');
        expect(answers.namespace).to.contain('App\\');
      });

      it("with model from template", function () {
        assert.file([
          'app/'+args[0]+'.php'
          ]);
      });
    
    });
    
 
  });   
  
});
