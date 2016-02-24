  'use strict';

  var generators = require('yeoman-generator'),
        appBase = require('./app_base'),
         commands = require('./commands'),
        answers;

  module.exports = appBase.Base.extend({

    prompting: function () {
     var done = this.async(),
          prompts = [];

     if(this.policies.canInstallComposer()) {
       prompts.push( {
         type    : 'confirm',
         name    : 'composer_install',
         message : 'Download and run composer install?'
       } );
     };

     if(this.policies.canCloneLaravel()) {
       prompts.push( {
         type    : 'confirm',
         name    : 'clone_laravel',
         message : 'Clone Laravel from Github?'
       } );
     };

     if(this.policies.canRunNpmInstall()) {
       prompts.push( {
         type    : 'confirm',
         name    : 'npm_install',
         message : 'Run NPM install?'
       } );
     };


     this.prompt(prompts, function (answers_prompt) {
       this.answers = answers_prompt;
       done();
     }.bind(this));
    },

  writing: function(){

    },
    installing: function(){
      var success;


      if(this.policies.canCloneLaravel()) {
        this.log('Getting Laravel...');
        success = commands.getLaravel() ? true : false;
        if(success)
        {
          this.config.set('laravel_cloned', true);
        }
      }

      if(this.policies.canInstallComposer()) {
          this.log('Getting Composer...');
          success = commands.getComposer() ? true : false;

          if(success)
          {
            this.config.set('composer_installed', true);
            this.log('Running Composer...');
            success = commands.runComposer() ? 'done running composer install' :  'Got error while running composer install!';
            this.log(success);
          }

      }

      if(this.policies.canRunNpmInstall()){
        this.log('Running npm install...');
                    this.config.set('npm_install_runned', true);
        this.npmInstall();
      }

    },
    end: function () {
      this.conflicter.force = false;
    }
  });
