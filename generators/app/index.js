  'use strict';

  var generators = require('yeoman-generator'),
         commands = require('./commands'),
        answers;

  module.exports = generators.Base.extend({

    firstMethod: function(){
      this.log('Yo generator!');
    },


    prompting: function () {
     var done = this.async();
     this.prompt([{
       type    : 'confirm',
       name    : 'clone_laravel',
       message : 'clone laravel'
     },{
       type    : 'confirm',
       name    : 'npm_install',
       message : 'run npm install?'
     },{
       type    : 'confirm',
       name    : 'run composer install?',
       message : 'run npm install?'
     }

   ], function (answers_prompt) {
       answers = answers_prompt;
       done();
     }.bind(this));
    },

  writing: function(){

    },
    installing: function(){

      // this.log('Getting Laravel...');
      // var msg = commands.getLaravel() ? 'got Laravel' : 'Got error so you already have it!';
      // this.log(msg);

      // this.log('Getting Composer...');
      // var msg = commands.getComposer() ? 'got Composer' : 'Got error while installing Composer';
      // this.log(msg);

      // this.log('Running Composer...');
      // var msg = commands.runComposer() ? 'done running Composer' : 'Got error while running composer install!';
      // this.log(msg);

      // this.log('Installing other dependencies (npm / bower)...');
      // this.npmInstall();



    },
    end: function () {
      this.conflicter.force = false;
    }
  });
