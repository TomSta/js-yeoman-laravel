  
  var generators = require('yeoman-generator'),
      laravel = require('./laravel_factories'),
      _ = require('lodash');
      

  module.exports = laravel.Base.extend({



    prompting: {
          modelQuestions: function() {
              if(this.options.fields){
                var i = 0,
                    fields = this.options.fields.split(','),
                    typeQuestions = [],
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
                        console.log('from extraOptions model props', this.modelProperties);
                        console.log('from extraOptions answers', answers);
                        this.modelProperties = this._combine(this.modelProperties, answers);
                        console.log('combined as', this.modelProperties);
                        done();
                }.bind(this));      
              }
          },
          extrasQuestions: function(){
              
                
              
            },
          

    },
    
              _combine: function(vars, types){
              vars = vars.split(',');
              var combined = [];
              vars.forEach(function(element) {
                  console.log("element "+element);
                  console.log(types['someVar_type']);
                  combined.push(
                     { 
                       name: element,
                       type: types[element+"_type"]
                     }      
                  );
              }, this);
              
              return combined;
          },


    writing: function() {
     this.log(this.modelProperties);   
     this.addFactory();
     this.addMigration();
    },

  });


