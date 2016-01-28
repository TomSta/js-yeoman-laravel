  
  var generators = require('yeoman-generator'),
      _ = require('lodash'),
      laravel = require('./laravel_factories');
      

  module.exports = laravel.Base.extend({

    constructor: function() {

      generators.Base.apply(this,arguments);
      this.argument('name', { type: String, required: true });
      this.log("log from", this.name);

    },

    prompting: {
          modelQuestions: function() {
              this._propertiesPrompt()
          },
          extrasQuestions: function(){
          }
    },


    writing: function() {
      this._prepareFactory();
      this.log('and now writing');
      this._addFactory();

    },


    _addFactory: function() {


     // wiring.writeFileFromString(file, path); 
    },

  });


