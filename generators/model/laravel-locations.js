'use strict';

var exports = module.exports = {};

exports.db = function() { 
  return {
    modelFactory: "database/factories/ModelFactory.php",
    modelFactoryInsert: "database/factories/ModelFactory_insert.php",
    modelMigration: "database/migrations/migration.php",
    modelMigrationDir: "database/migrations/",
    modelFile: "app/model.php",
    modelFileDestination: "app/"+this.caller.name+".php",
    controllerFile: "app/Http/Controllers/Controller.php",
    controllerFileDestination: "app/Http/Controllers/"+this.caller.name+"Controller.php",
    repositoryFile: "app/Repositories/Repository.php",
    repositoryFileDestination: "app/Repositories/"+this.caller.name+"Repository.php",
    modelDir: "app/",
    repositoryDir: "app/Repositories/",
    repositoryInterfaceFile: "app/Interfaces/RepositoryInterface.php",
    repositoryInterfaceFileDestination: "app/Interfaces/"+this.caller.name+"RepositoryInterface.php",
    interfacesDir: "app/Interfaces/",
    controllerDir: "app/Http/Controllers/"
  }
}

exports.getTemplatePath = function ( what ){
   return this.caller
          .templatePath( this.db()[what+'File'] );
}

exports.getDestinationPath = function ( what ){
   return this.caller
          .destinationPath( this.db()[what+'FileDestination'] );
}

exports.copyTemplate = function ( thing, extraFunction ) {

    if ( extraFunction ) extraFunction(); 
    
    this.caller.fs.copyTpl(
        locs.getTemplatePath( thing ), 
        locs.getDestinationPath( thing ),
        {
          namespace: this.caller.namespace,
          model: this.caller.name
        }
    );
}
