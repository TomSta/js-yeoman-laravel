
var  generator = require('yeoman-generator'),
     _ = require('lodash'),
     spawn = require('child_process').spawn,
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
    this.locationsFile = "../../configs/cnf_locations.json";
    this.namespace = '';
    this.bootstrapDependencies();
  },

  bootstrapDependencies: function () {
    locs = require('./laravel-locations')(this);
    inserts = require('../inserts')(this);

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
  
  addFactory: function () { 
    var current = wiring.readFileAsString(locs.locations.modelFactory),
        newFactory = current + "\n" + inserts.build('factory');
        wiring.writeFileFromString( newFactory, locs.locations.modelFactory );
  },

  addMigration: function () {
     var command = spawn('php', ['artisan', 'make:migration', this.name]);
     var context = this; //for reference addWithFieldsBuild

     /* get migration file created by laravel 
        and assign it as a destination file for new migration
     */

     command.stdout.on('data', function (data) {
        //create migrat
        var migrationFile = data.toString().split(' ')[2].trim()+".php";
        locs.locations.migrationFileDestination += migrationFile;
        context.addWithFieldsBuild('migration');
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
            default: 'App',
            store: true
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
                name: "repository",
                value: "repository",
                checked: true
              },
              {
                name: "factory",
                value: "factory",
                checked: true
              },
              {
                name: "migration",
                value: "migration",
                checked: true
              },
            ],
            store: true
     
          }],
          typeAnswers = [],
          done= this.async();
          
          for(i = 0; i < fields.length; i++)
          {
              questions.push({
                  type: 'rawlist',
                  name: fields[i]+'_type',
                  message: 'field type for '+fields[i],
                  store: true,
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
