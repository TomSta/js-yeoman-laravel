var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs-extra');
var _ = require('lodash');
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

describe('yaylar:model', function () {
 var helper;

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
          done();
        });
        
        
    });
       
    it('create migration file with fields', function () {    
        assert.file([
            'database/migrations/create_newmodels_table.php'
            ]);

         assert.fileContent(
              'database/migrations/create_newmodels_table.php',
              "$table->string('rambo');");
    });
       
    it('adds factory in ModelFactories', function () {
         assert.fileContent(
              'database/factories/ModelFactory.php',
              '"rambo" => $faker->name');
    }); 


    describe("model creation", function () {
    
      it("gets namespace from prompt", function () {
        expect(helper.answers).to.include.keys('namespace');
        expect(helper.answers.namespace).to.contain('App\\');
      });

      it("adds model", function () {
        assert.file([
          'app/'+helper.args[0]+'.php'
          ]);
      });
    
    });
    
 
  });   
  
});
