'use strict';

module.exports = function(generator){
  var module = {};
  module.generator = generator;
  
  module.db = function() { 
    return {
      modelFactory: "database/factories/ModelFactory.php",
      factoryInsertFile: "database/factories/ModelFactory_insert.php",
      modelMigrationDir: "database/migrations/",
      migrationFile: "database/migrations/migration.php",
      migrationFileDestination: "database/migrations/create_"+ this.generator.name.toLowerCase() + "s_table.php",
      modelFile: "app/model.php",
      modelFileDestination: "app/"+this.generator.name+".php",
      controllerFile: "app/Http/Controllers/Controller.php",
      controllerFileDestination: "app/Http/Controllers/"+this.generator.name+"Controller.php",
      repositoryFile: "app/Repositories/Repository.php",
      repositoryFileDestination: "app/Repositories/"+this.generator.name+"Repository.php",
      modelDir: "app/",
      repositoryDir: "app/Repositories/",
      repositoryInterfaceFile: "app/Interfaces/RepositoryInterface.php",
      repositoryInterfaceFileDestination: "app/Interfaces/"+this.generator.name+"RepositoryInterface.php",
      interfacesDir: "app/Interfaces/",
      controllerDir: "app/Http/Controllers/"
    }
  }


  module.getPath = function ( what ){
     return this.generator
            .destinationPath( this.db()[what] );
  }

  module.getTemplatePath = function ( what ){
     return this.generator
            .templatePath( this.db()[what+'File'] );
  }

  module.getDestinationPath = function ( what ){
     return this.generator
            .destinationPath( this.db()[what+'FileDestination'] );
  }

  module.copyTemplate = function ( thing, extraFunction ) {

      if ( extraFunction ) extraFunction(); 
      
      this.generator.fs.copyTpl(
          this.getTemplatePath( thing ), 
          this.getDestinationPath( thing ),
          {
            namespace: this.generator.namespace,
            model: this.generator.name
          }
      );
  }

  return module;

};


