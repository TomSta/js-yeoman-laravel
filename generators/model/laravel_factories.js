
var  generator = require('yeoman-generator'),
     _ = require('lodash'),
     formatters = require('../formatters'),
     wiring = require('html-wiring'),
     //below gets generator injected in constructor in bootstrap method
     inserts,
     locs;

module.exports.Base = generator.Base.extend({
  
  constructor: function () {
    generator.Base.apply(this,arguments);
    this.argument('name', { type: String, required: true });
    this.option('fields', {desc: 'fields for model'});
    this.modelProperties = [];
    this.namespace = '';
    this.bootstrapDependencies();
  },

  bootstrapDependencies: function () {
    locs = require('./laravel-locations')(this);
    inserts = require('../inserts')(this);

  }, 
    
  addFactory: function () { 
    this.prepareFactory(); 
  },

  addAddView: function () {
    this.prepareAddView();
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
 
  prepareAddView: function () {
    var parameters = {
        name: this.name.toLowerCase(),
        fields: inserts.build( 'addView'),
        someParam: "222dddd"
      };
    
    console.log(parameters);
    this.fs.copyTpl(
      locs.getTemplatePath('addView'),
      locs.getDestinationPath('addView'),
      parameters
    );
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
