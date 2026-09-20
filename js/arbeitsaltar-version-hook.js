(function (global) {
  'use strict';
  var S = global.UniversumStorage;
  if (S && Object.prototype.hasOwnProperty.call(S, 'APP_VERSION')) {
    try { S.APP_VERSION = '5.33.13'; } catch (_) {}
  }
})(typeof window !== 'undefined' ? window : globalThis);
