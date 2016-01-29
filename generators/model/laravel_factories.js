
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
  },
      
  addFactory: function () { 
    this.prepareFactory(); 
  },
  
  addMigration: function () { 
    this.prepareMigration(); 
  }, 

  addModel: function () {
    this.prepareModel();  
  },

  
  addController: function () {
    this.prepareController();  
  },
  
  addRepository: function () {
    this.prepareRepositoryInterface();
    this.prepareRepository();
  },

  
  prepareController: function () {
    console.log(locs.db.controllerFile);
    console.log(locs.db.controllerDir+this.name+"Controller.php");
    this.fs.copyTpl(
      this.templatePath(locs.db.controllerFile),
      this.destinationPath(locs.db.controllerDir+this.name+"Controller.php"),
      {
        namespace: this.namespace,
        model: this.name
      });
  },

  prepareRepositoryInterface: function () {
    var path = locs.db.interfacesDir
                +this.name+"RepositoryInterface.php";
                      
    var migration = this.fs.copyTpl(
      this.templatePath(locs.db.repositoryInterfaceFile),
      this.destinationPath(
                  locs.db.interfacesDir
                  +this.name+"RepositoryInterface.php"
                ),
      {
        namespace: this.namespace,
        model: this.name
      });
  },

  prepareRepository: function () {
    var migration = this.fs.copyTpl(
      this.templatePath(locs.db.repositoryFile),
      this.destinationPath(locs.db.repositoryDir+this.name+"Repository.php"),
      {
        namespace: this.namespace,
        model: this.name
      });
  },

  prepareModel: function () {
    var newContent = this.buildMigrationInsert();
    var migration = this.fs.copyTpl(
      this.templatePath(locs.db.modelFile),
      this.destinationPath(locs.db.modelDir+this.name+".php"),
      {
        namespace: this.namespace,
        model: this.name
      });
  },
  
  prepareMigration: function () {
    var newContent = this.buildMigrationInsert();
    var migration = this.fs.copyTpl(
      this.templatePath(locs.db.modelMigration),
      this.destinationPath(this.getMigrationFileName()),
      {
        name: this.name.toLowerCase(),
        fields: this.buildMigrationInsert()
      });
  },
  getMigrationFileName: function () {
    return locs.db.modelMigrationDir + "create_" 
           + this.name.toLowerCase() + "s_table.php"
  },

  prepareFactory: function() {
    var current = wiring.readFileAsString(this.destinationPath(locs.db.modelFactory)),
        factoryInsert = this.buildFactoryInsert(),
        newFactory = current + "\n" + factoryInsert;

        wiring.writeFileFromString(
              newFactory,
              this.destinationPath(locs.db.modelFactory)
        );
  },

  buildMigrationInsert: function()
  {
        var fields = [],
            i = 0;
        
        for(i; i < this.modelProperties.length; i++){
          fields.push(this.formatMigrationField(this.modelProperties[i]));
        }
        
        return fields.join("\n");
    
  },

  buildFactoryInsert: function()
  {
        var pathInsert = this.templatePath(locs.db.modelFactoryInsert),
        newFactory = wiring.readFileAsString(pathInsert),
        i = 0,
        fields = [];
        
        for(i; i < this.modelProperties.length; i++){
          fields.push(this.formatFactoryField(this.modelProperties[i]));
        }

        return newFactory
          .replace("<fields>", fields.join(",\n"))
          .replace("<modelName>",this.name);
  },

  formatFactoryField: function(modelField)
  {
        return '\t"'+ modelField.name +'" => ' 
                    + this.getFaker(modelField.type);
  },

  formatMigrationField: function(modelField)
  {
        var created =  '\t'+ this.getMigration(modelField.type)
                    + modelField.name
                    + "');"
        return created;
  },

  getMigration: function (fieldType)
  {
    switch (fieldType) {
        case 'string':
          return "$table->string('";
        case 'double':  
          return "$table->double('";
        case 'integer':
          return "$table->integer('";
        case 'datetime':
          return "$table->datetime('";
        case 'text':
          return "$table->text('";
        default:
          return "$table->string('";
    }
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

