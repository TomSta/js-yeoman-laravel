  
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
     this.log(this.modelProperties);   
     this.addFactory();
     this.addMigration();
    },

  });


