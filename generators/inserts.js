var wiring = require('html-wiring'),
    formatters = require('./formatters');

module.exports = function (generator) {

  var module = {};
  
  module.generator = generator;
  module.locs = require('./model/laravel-locations')(generator);

  module.migrationInsert = function () {
    return this.formatProperties('migration').join("\n");
  },
     
  module.factoryInsert = function() {
    var newFactory = wiring.readFileAsString(this.locs.getTemplatePath('factoryInsert'));

    return newFactory
      .replace("<fields>", this.formatProperties('factory').join(",\n"))
      .replace("<modelName>",this.generator.name);
    },

  module.formatProperties = function ( formatter ) {
    var fields = [], i = 0;

    for(i; i < this.generator.modelProperties.length; i++){
      fields.push(
        formatters.get(formatter, this.generator.modelProperties[i])
       );
    }
    return fields;
  },

  module.build = function ( what ) {
    return this[what+'Insert']();
  }

  return module;
}
