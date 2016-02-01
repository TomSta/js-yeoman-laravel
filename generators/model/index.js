  
  var generators = require('yeoman-generator'),
      laravel = require('./laravel_factories'),
      _ = require('lodash');
      
  module.exports = laravel.Base.extend({

    prompting: {
         promptForFields: function(){
             if(this.options.fields) this.modelQuestions();
         }
    },
    
    writing: function() {
     this.addFactory();
     this.addMigration();
     this.addFromTemplate( 'model' );
     this.addFromTemplate( 'controller' );
     this.addFromTemplate( 'repositoryInterface' );
     this.addFromTemplate( 'repository' );
     this.addFromTemplate( 'addView' );
    },

  });


