
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
    var current = wiring.readFileAsString(locs.getPath('modelFactory')),
        newFactory = current + "\n" + inserts.build('factory');
        wiring.writeFileFromString( newFactory, locs.getPath('modelFactory') );
  },

  addWithFieldsBuild: function ( what ) {
    this.fs.copyTpl(
      locs.getTemplatePath( what ),
      locs.getDestinationPath( what ),
      {
        name: this.name.toLowerCase(),
        fields: inserts.build( what )
      });
  }, 

  addFromTemplate: function ( what ) {
    locs.copyTemplate( what );
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
          questions = [{
            type: 'input',
            name: 'namespace',
            message: 'set model namespace',
            default: 'App'
          }, {
            type: 'checkbox',
            name: 'creationList',
            message: 'What do you want to create?',
            choices: [
              {
                name: "model",
                value: "model",
                checked: true
              },
              {
                name: "controller",
                value: "controller",
                checked: true
              },
              {
                name: "views",
                value: "views",
                checked: true
              },
              {
                name: "views",
                value: "migration",
                checked: true
              },
            ]
     
          }],
          typeAnswers = [],
          done= this.async();
          
          for(i = 0; i < fields.length; i++)
          {
              questions.push({
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
          
          this.prompt(questions, function (answers) {
              this.modelProperties = this._combine(fields, answers);
              this.namespace = answers.namespace;
              this.creationList = answers.creationList;
              done();
      }.bind(this));      
    }
  }
});
