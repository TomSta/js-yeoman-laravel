  'use strict';

  var generators = require('yeoman-generator'),
         commands = require('./commands');

  module.exports = generators.Base.extend({

    firstMethod: function(){
      this.log('Yo generator!');
    },
    writing: function(){

    },
    installing: function(){

      this.log('Getting Laravel...');
      var msg = commands.getLaravel() ? 'got Laravel' : 'Got error so you already have it!';
      this.log(msg);

      this.log('Getting Composer...');
      var msg = commands.getComposer() ? 'got Composer' : 'Got error while installing Composer';
      this.log(msg);

      this.log('Running Composer...');
      var msg = commands.runComposer() ? 'done running Composer' : 'Got error while running composer install!';
      this.log(msg);

      this.log('Installing other dependencies (npm / bower)...');
      this.npmInstall();



    },
    end: function () {
      this.conflicter.force = false;
    }
  });
