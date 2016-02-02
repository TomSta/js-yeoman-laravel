module.exports = {
    get: function(what, modelField) {
      return this[what+'Field'](modelField);
    },

    addViewField: function ( mF ) {
      console.log("inside formatters");
      var start = "@include('formfields.",
          middle, finish = "', ["
                 +"'title'=> '" + mF.name + "',"
                 + "'name' => '"+mF.name.toLowerCase()+"'])";

      switch ( mF.type ) {
        case 'integer':
        case 'double':
          middle = "integerInput";
          break;
        case 'datetime':
          middle = "datetimeInput";
          break;
        case 'blob':
          middle = "fileInput";
          break;
        case 'text':                 
          middle = "textareaInput"; 
          break;
        case 'string': 
          middle = "textInput"; 
          break;
        default:
          middle = "textInput";
          break;
      }
      //console.log(start);
      return start+middle+finish;
    },

    migrationField: function ( modelField ) {
      var start = '\t', middle, finish = modelField.name + "');";
      switch (modelField.type) {
          case 'string':
            middle = "$table->string('";
          case 'double':  
            middle = "$table->double('";
          case 'integer':
            middle = "$table->integer('";
          case 'datetime':
            middle =  "$table->datetime('";
          case 'text':
            middle = "$table->text('";
          default:
            middle = "$table->string('";
      }

      return start+middle+finish;
    },

    factoryField: function(modelField){
      switch(modelField.type){
        case 'string':
          finish = "$faker->name";
        case 'double':  
        case 'integer':
          finish = "$faker->randomNumber(1)";
        case 'datetime':
          finish = "$faker->datetime()";
        case 'text':
          finish = "$faker->sentence";
        default:
          finish = '$faker->name';
      }
      return '\t"' + modelField.name + '" => ' + finish;
    },

  }
