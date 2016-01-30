
var exports = module.exports = {},
     _ = require('lodash'),
     wiring = require('html-wiring');
     locs = require('./laravel-locations');


var generators = require('yeoman-generator');

exports.Base = generators.Base.extend({
  
  constructor: function () {
    generators.Base.apply(this,arguments);
    this.argument('name', { type: String, required: true });
    this.option('fields', {desc: 'fields for model'});
    this.modelProperties = [];
    this.namespace = '';
    locs.caller = this;
  },
      
  addFactory: function () { 
    this.prepareFactory(); 
  },
  
  addMigration: function () { 
    this.prepareMigration(); 
  },

  addFromTemplate: function ( what ) {
    locs.copyTemplate( what );
  },

  prepareMigration: function () {
    this.fs.copyTpl(
      this.templatePath(locs.db().migrationFile),
      this.destinationPath(locs.db().migrationFileDestination),
      {
        name: this.name.toLowerCase(),
        fields: this.buildMigrationInsert()
      });
  },

  Formatter: {
    get: function(what, modelField) {
      return this[what+'Field'](modelField);
    },

    migrationField: function (modelField)
    {
      var start = '\t', middle, finish = modelField.name + "');";
      switch (modelField.type) {
          case 'string':
            middle = "$table->string('";
          case 'double':  
            middle = "$table->double('";
          case 'integer':
            middle = "$table->integer('";
          case 'datetime':
            middle =  "$table->datetime('";
          case 'text':
            middle = "$table->text('";
          default:
            middle = "$table->string('";
      }

      return start+middle+finish;
    },

    factoryField: function(modelField){
      switch(modelField.type){
        case 'string':
          finish = "$faker->name";
        case 'double':  
        case 'integer':
          finish = "$faker->randomNumber(1)";
        case 'datetime':
          finish = "$faker->datetime()";
        case 'text':
          finish = "$faker->sentence";
        default:
          finish = '$faker->name';
      }
      return '\t"' + modelField.name + '" => ' + finish;
    },

  },
  
  buildMigrationInsert: function()
  {
        var fields = [],
            i = 0;
        
        for(i; i < this.modelProperties.length; i++){
          fields.push(this.Formatter.get('migration', this.modelProperties[i]));
        }
        
        return fields.join("\n");
  },

  buildFactoryInsert: function()
  {
        var pathInsert = this.templatePath(locs.db().modelFactoryInsert),
        newFactory = wiring.readFileAsString(pathInsert),
        i = 0,
        fields = [];
        
        for(i; i < this.modelProperties.length; i++){
          fields.push(this.Formatter.get('factory', this.modelProperties[i]));
        }

        return newFactory
          .replace("<fields>", fields.join(",\n"))
          .replace("<modelName>",this.name);
  },

  prepareFactory: function() {
    var current = wiring.readFileAsString(this.destinationPath(locs.db().modelFactory)),
        factoryInsert = this.buildFactoryInsert(),
        newFactory = current + "\n" + factoryInsert;

        wiring.writeFileFromString(
              newFactory,
              this.destinationPath(locs.db().modelFactory)
        );
  },




     
  _combine: function(vars, types){
        var combined = [];
        vars.forEach(function(element) {
            combined.push(
                { 
                name: element,
                type: types[element+"_type"]
                }      
            );
        }, this);
        
        return combined;
  },

  modelQuestions: function() {
    if(this.options.fields){
      var i = 0,
          fields = this.options.fields.split(','),
          typeQuestions = [{
            type: 'input',
            name: 'namespace',
            message: 'set model namespace',
            default: 'App\\'
          }],
          typeAnswers = [],
          done= this.async();
          
          for(i = 0; i < fields.length; i++)
          {
              typeQuestions.push({
                  type: 'rawlist',
                  name: fields[i]+'_type',
                  message: 'field type for '+fields[i],
                  choices: [
                      "string",
                      "integer",
                      "datetime",
                      "text",
                      "time",
                      "blob",
                      "double"
                  ]});
          }
          
          this.prompt(typeQuestions, function (answers) {
              this.modelProperties = this._combine(fields, answers);
              this.namespace = answers.namespace;
              done();
      }.bind(this));      
    }
  }
});
