    var fields = require('../configs/fields.json'); 
    
    this.get = function(what, modelField) {
       return this.genericAdd( what, modelField );
    }

    this.genericAdd = function ( what, modelField ) {
      var field = fields.indent
                  + fields[what].start
                  + fields[what][modelField.type]
                  + fields[what].end;
      
      return field
            .replace("FIELDNAME", modelField.name)
            .replace("fieldname", modelField.name.toLowerCase());
  
    };
