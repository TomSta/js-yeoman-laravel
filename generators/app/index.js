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
       name    : 'composer_install',
       message : 'download and run composer install?'
     }

   ], function (answers_prompt) {
       answers = answers_prompt;
       done();
     }.bind(this));
    },

  writing: function(){

    },
    installing: function(){
      var msg;
      if(answers.clone_laravel)
      {
        this.log('Getting Laravel...');
        msg = commands.getLaravel() ? 'got Laravel' : 'Got error so you already have it!';
        this.log(msg);
      }

      if(answers.composer_install)
      {
        this.log('Getting Composer...');
        msg = commands.getComposer() ? 'got Composer' :  'Got error while installing Composer';
        this.log(msg);
        this.log('Running Composer...');
        msg = commands.runComposer() ? 'done running composer install' :  'Got error while running composer install!';
        this.log(msg);
      }

      if(answers.npm_install)
      {
        this.log('Running npm install...');
        this.npmInstall();
      }

    },
    end: function () {
      this.conflicter.force = false;
    }
  });
