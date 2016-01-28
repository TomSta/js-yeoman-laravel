var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs-extra');
var _ = require('lodash');

describe('yaylar:model', function () {
 var helper;

 describe('full', function () {
    
    before( function (done) {
        helper = helpers.run( path.join(__dirname, '../generators/model') )
        .inTmpDir(function (dir) {
        //     // `dir` is the path to the new temporary directory
             //fs.copySync(path.join(__dirname, '../database'), dir)
              var done = this.async(); // `this` is the RunContext object.
              fs.copy(path.join(__dirname, '../tmp_data'), dir, done);
        }).withArguments(['NewModel'])
        .withOptions({ fields: 'rambo,tytul' })
        .withPrompts({
            rambo_type: 'string',
            tytul_type: 'integer'
        })
        .on('end', done);
        
        
    });
       
    it('should create migrations file for model', function () {    
        assert.file([
            'database/migrations/create_newmodels_table.php'
            ]);
    });
       
    it('adds factory in ModelFactories', function () {
         assert.fileContent(
              'database/factories/ModelFactory.php',
              '"rambo" => $faker->name');
    }); 

    it('adds migration fields in migrations', function () {
         assert.fileContent(
              'database/migrations/create_newmodels_table.php',
              "$table->string('rambo');");
    }); 


 
  });   
  
});