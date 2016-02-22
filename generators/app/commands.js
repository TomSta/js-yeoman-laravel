var spawn = require('child_process').execSync,
     command;


  this.getLaravel = function(){
    try {
      command = spawn('git clone https://github.com/laravel/laravel .');
      return true;
    } catch (e) {
      //console.log('no success, but', e.toString());
      return false;
    }
  }

  this.getComposer = function(){
    try {
      spawn('wget https://getcomposer.org/composer.phar');
      spawn('chmod +x ./composer.phar');
      return true;
    } catch (e) {
      return false;
    }
  }

  this.runComposer = function(){
    try {
      command = spawn('./composer.phar install');
      return true;
    } catch (e) {
      return false;
    }
  }
