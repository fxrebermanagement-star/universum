/**
 * UNIVERSUM — wire Arbeitsaltar into Rituals.getRitual / listArbeitsaltar
 * Load after rituals.js and arbeitsaltar.js
 */
(function (global) {
  'use strict';
  var R = global.UniversumRituals;
  if (!R) return;
  var baseGet = R.getRitual;
  R.getRitual = function (id) {
    var hit = baseGet ? baseGet(id) : null;
    if (hit) return hit;
    var AA = global.UniversumArbeitsaltar;
    if (AA && AA.getById) return AA.getById(id);
    return null;
  };
  R.listArbeitsaltar = function () {
    var AA = global.UniversumArbeitsaltar;
    return (AA && AA.listAll) ? AA.listAll() : [];
  };
})(typeof window !== 'undefined' ? window : globalThis);
