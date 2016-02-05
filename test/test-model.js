var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs-extra');
var _ = require('lodash');
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

describe('yaylar:model', function () {
 var helper, answers, modelName, appDir, viewsDir, file;

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
            tytul_type: 'integer',
            creationList: ['model','factory', 
                           'controller', 'repository',
                           'views', 'migration' ]
        })
        .on('end', function(){
          answers = helper.answers;
          modelName = helper.args[0];
          appDir = 'app/';
          viewsDir = "resources/views/";
          done();
        });
        
    });

   beforeEach ( function () {
     file = null;
   } ); 
    
//   describe('creates migration', function () {
//     it('file', function () {    
//         assert.file([
//             'database/migrations/create_newmodels_table.php'
//             ]);
//     });
//
//     it('with filled up table', function () {
//          assert.fileContent(
//               'database/migrations/create_newmodels_table.php',
//               "$table->string('rambo');");
//     });
//   });
    
    describe('creates factory', function () {
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
        file = appDir+modelName+'.php'

        assert.file([ file ]);
        assert.fileContent( file, 'class '+modelName);
          
      });
    
    });

    describe("creates repository", function () {
      
  
      it("interface", function () {
        file = appDir+'Interfaces/'+modelName+'RepositoryInterface.php';
        assert.file([ file ]); 
      });

      it("file implementing interface", function () {
        var file = appDir +'Repositories/'+modelName+'Repository.php';
        assert.fileContent( file, modelName+'Repository implements '+ modelName+'RepositoryInterface');
      });

    
    });

    describe("creates controller", function () {

      beforeEach ( function () {
        file = appDir + 'Http/Controllers/'+modelName+'Controller.php';
      } );
      
      it('in the right place', function () {
        assert.file([ file ]); 
      });

      it("with methods for crud", function () {
        var methods = ['index', 'show', 'create', 'update'];
        methods.forEach(function(element){
          assert.fileContent( file, 'public function '+element );
        });

      });

      it("that gets injected repository and request", function () {
        assert.fileContent( file, '$request' ) ;
      });

    });
    
    describe("creates laravel view", function () {
      var viewsDir, addViewFile, indexViewFile, field1, field2;

      before ( function () {
           viewsDir = "resources/views/"+modelName.toLowerCase(),
           addViewFile = viewsDir +"/add.blade.php",
           indexViewFile = viewsDir + "/index.blade.php";
           field1 = helper.generator.modelProperties[0].name;
           field2 = helper.generator.modelProperties[1].name;
      });

      it("files for index, adding new model", function () {
        assert.file([ addViewFile ]); 
      });
    
      it("add model file contain form with fields", function () {
        assert.fileContent( addViewFile, field1 );
      });
       
    });


  });   
  
});
