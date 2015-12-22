// which version of ember data are you using? this one looks like 1.11/12?

// need util
var isNode = typeof isNode === 'undefined' ? false : true;

/*globals najax, Ember*/
var nodeAjax = function(url, type, options) {
  var adapter = this;

  return new Ember.RSVP.Promise(function(resolve, reject) {
    var hash = adapter.ajaxOptions(url, type, options);

    hash.success = function(json, textStatus, jqXHR) {
      json = adapter.ajaxSuccess(jqXHR, json);
      Ember.run(null, resolve, json);
    };

    hash.error = function(jqXHR, textStatus, errorThrown) {
      Ember.run(null, reject, adapter.ajaxError(jqXHR, jqXHR.responseText, errorThrown));
    };

    najax(hash);
  }, 'DS: RESTAdapter#ajax ' + type + ' to ' + url);
};

export default {
  name: 'ajax-service',

  initialize: function(application) {
    if (!isNode) { return; }

    application.register('ajax:node', nodeAjax, { instantiate: false });
    application.inject('adapter', 'ajax', 'ajax:node');
  }
};
