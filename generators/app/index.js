  'use strict';

  var generators = require('yeoman-generator');

  module.exports = generators.Base.extend({

    firstMethod: function(){
      this.log('Yo generator!');
    },

    writing: function(){
      
    }
  });



