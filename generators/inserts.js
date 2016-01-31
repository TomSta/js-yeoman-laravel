module.exports = {
    migrationInsert: function ()
    {
          return this.formatProperties('migration').join("\n");
    },
     
    factoryInsert: function()
    {
        var newFactory = wiring.readFileAsString(locs.getTemplatePath('factoryInsert'));

        return newFactory
          .replace("<fields>", this.formatProperties('factory').join(",\n"))
          .replace("<modelName>",this.caller.name);
    },

    formatProperties: function ( formatter )
    {
        var fields = [], i = 0, caller = this.caller;
        for(i; i < this.caller.modelProperties.length; i++){
          fields.push(
            formatters.get(formatter, this.caller.modelProperties[i])
          );
        }
        return fields;
    },

    build: function ( what ) {
      return this[what+'Insert']();
    }
  }
