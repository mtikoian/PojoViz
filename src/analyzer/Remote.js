'use strict';
var _ = require('lodash');
var GenericAnalyzer = require('./Inspector');

function Remote(options) {
  var me = this;
  GenericAnalyzer.call(this, options);
  this.remote = true;
}

Remote.prototype = Object.create(GenericAnalyzer.prototype);

/**
 * @override
 */
Remote.prototype.inspectSelf = function () {
};

/**
 * @override
 */
Remote.prototype.fetch = function () {
  var me = this;
  var pojoviz = global.pojoviz;
  console.log('fetching from remote with this', this);

  return pojoviz.remote.nodeGlobal(me.prepareConfig())
      .then(function (json) {
        me.json = json;
      });
};

Remote.prototype.prepareConfig = function () {
  var options = _.merge({}, this);
  options.analyzerConfig = {
    visitConstructors: options.analyzer.visitConstructors,
    visitSimpleFunctions: options.analyzer.visitSimpleFunctions,
    visitArrays: options.analyzer.visitArrays,
    levels: options.analyzer.levels
  };
  delete options.analyzer;
  return options;
};

module.exports = Remote;