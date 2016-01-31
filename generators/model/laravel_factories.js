
var_ = require('lodash'),
     wiring = require('html-wiring');
     locs = require('./laravel-locations');
     formatters = require('../formatters');
     inserts = require('../inserts');


var generators = require('yeoman-generator');

module.exports.Base = generators.Base.extend({
  
  constructor: function () {
    generators.Base.apply(this,arguments);
    this.argument('name', { type: String, required: true });
    this.option('fields', {desc: 'fields for model'});
    this.modelProperties = [];
    this.namespace = '';
    locs.caller = inserts.caller = this;
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
        fields: inserts.build( 'migration')
      });
  },
 

  prepareFactory: function() {
    var current = wiring.readFileAsString(locs.getPath('modelFactory')),
        newFactory = current + "\n" + inserts.build('factory');
        wiring.writeFileFromString( newFactory, locs.getPath('modelFactory') );
        
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
