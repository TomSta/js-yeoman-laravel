var spawn = require('child_process').execSync,
     command;

     module.exports = function (generator) {

       var module = {};

      module.canInstallComposer = function(){
          if (generator.config.get('composer_installed')) return false;
          return true;
      }

      module.canCloneLaravel = function(){
          if (generator.config.get('laravel_cloned')) return false;
          return true;
      }

      module.canRunNpmInstall = function(){
          if (generator.config.get('npm_install_runned')) return false;
          return true;
      }

    return module;
    }
