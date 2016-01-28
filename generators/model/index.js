  
  var generators = require('yeoman-generator'),
      laravel = require('./laravel_factories');
      

  module.exports = laravel.Base.extend({

   constructor: function() {

      generators.Base.apply(this,arguments);
      this.argument('name', { type: String, required: true });
      this.modelProperties = [];
   },

    prompting: {
          modelQuestions: function() {
              this._propertiesPrompt()
          },
          extrasQuestions: function(){
          }
    },


    writing: function() {
     this.log(this.modelProperties);   
     this.addFactory();
     this.addMigration();
    },

  });


