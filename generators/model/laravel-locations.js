'use strict';

module.exports = function(generator){
  var module = { };

  module.generator = generator;
  
  module.config = function(){
     module.locations = require(generator.locationsFile);

     //change locations object to contain model name in paths 
     for(var loc in module.locations)
     {
        module.locations[loc] = module
                              .configTransforms(module.locations[loc]);  
     }
  }

  module.configTransforms = function (str) {
    return str
            .replace("GENERATORNAME", this.generator.name)
            .replace("GeneratorName", this.generator.name.toLowerCase());
  }
  


  module.getPath = function ( what ){
     return this.generator
            .destinationPath( this.db()[what] );
  }

  module.getTemplatePath = function ( what ){
     return this.generator
            .templatePath( this.locations[what+'File'] );
  }

  module.getDestinationPath = function ( what ){
     return this.generator
            .destinationPath( this.locations[what+'FileDestination'] );
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

  module.config();
  return module;

};


