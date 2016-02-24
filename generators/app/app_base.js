
var  generator = require('yeoman-generator'),
     spawn = require('child_process').spawn,
     wiring = require('html-wiring'),
     //below gets generator injected in constructor in bootstrap method
     policies,
     locs;

module.exports.Base = generator.Base.extend({

  constructor: function () {
    generator.Base.apply(this,arguments);
    this.policies = require('./policies')(this);
    this.bootstrapDependencies();
  },

  bootstrapDependencies: function () {

  }

});
