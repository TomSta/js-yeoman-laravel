  
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
     if ( this.creationList.indexOf('factory') > -1)
       this.addFactory();

     if ( this.creationList.indexOf('model') > -1)
       this.addFromTemplate( 'model' );

     if ( this.creationList.indexOf('controller') > -1)
       this.addFromTemplate( 'controller' );
     
     if ( this.creationList.indexOf('repository') > -1)
     {
       this.addFromTemplate( 'repository' );
       this.addFromTemplate( 'repositoryInterface' );
     }
     
     if ( this.creationList.indexOf('views') > -1)
     {
       this.addFromTemplate( 'indexView' );
       this.addWithFieldsBuild( 'addView' );
     }
     
     if ( this.creationList.indexOf('migration') > -1)
       this.addMigration();
//       this.addWithFieldsBuild( 'migration' );
    },

  });


