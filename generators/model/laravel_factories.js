
var exports = module.exports = {},
     wiring = require('html-wiring');
     locs = require('./laravel-locations');
     var modelProperties = [];

 var generators = require('yeoman-generator');

 exports.Base = generators.Base.extend({

    _prepareFactory: function() {
      var current = wiring.readFileAsString(locs.db.modelFactory),
          factoryInsert = this.buildFactoryInsert(),
          newFactory = current + "\n" + factoryInsert;

          this.log(newFactory);
    },

    buildFactoryInsert: function()
    {
          var pathInsert = this.templatePath(locs.db.modelFactoryInsert),
          newFactory = wiring.readFileAsString(pathInsert),
          i = 0,
          fields = [];
          
          for(i; i < modelProperties.length; i++){
            fields.push(this.formatFactoryField(modelProperties[i]));
          }

          return newFactory
            .replace("<fields>", fields.join(",\n"))
            .replace("<modelName>",this.name);
    },

    formatFactoryField: function(modelField)
    {
      var fName = modelField[0],
          fType = modelField[1],
          combined = '\t"'+ fName +'" => ' 
                      + this.getFaker(fType);

          return combined;                
    },

    getFaker: function(fieldType){
       switch(fieldType){
          case 'string':
            return "$faker->name";
          case 'double':  
          case 'integer':
            return "$faker->randomNumber(1)";
          case 'datetime':
            return "$faker->datetime()";
          case 'text':
            return "$faker->sentence";
          default:
            return '$faker->name';
       }
    },

    _propertiesPrompt: function (as){
        var done = as || this.async();

        this.prompt({
                type: 'input',
                name: 'var_name',
                message: 'Wanna add model field?'
              }
, function (answers) {
               if(answers.var_name.length > 0){
                  this._typesPrompt(done, answers);
                }
                else {
                  this.log('not pushing');
                  done();
                }
              }.bind(this));
    },

   _typesPrompt: function (promise, modelFields) {

                this.prompt([
                {
                type: 'rawlist',
                name: 'var_type',
                message: 'var type',
                choices: [
                  "string",
                  "integer",
                  "datetime",
                  "text",
                  "time",
                  "blob",
                  "double"
                ]
              }], function (answers) {
                this.log('chosen');
                modelProperties.push([
                    modelFields.var_name,
                    answers.var_type
                    ]);
                this._propertiesPrompt(promise);
              }.bind(this));


   },
  });

