/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-fastboot',

  includedCommands: function() {
    return {
      fastboot: require('./lib/commands/fastboot'),
      'fastboot:build': require('./lib/commands/fastboot-build')
    };
  },

  included: function(app) {
    // We serve the index.html from fastboot-dist, so this has to apply to both builds
    app.options.storeConfigInMeta = false;
  },

  contentFor: function(type) {
    if (type === 'body') {
      return "<!-- EMBER_CLI_FASTBOOT_BODY -->";
    }

    if (type === 'head') {
      return "<!-- EMBER_CLI_FASTBOOT_TITLE -->";
    }
  }
};
