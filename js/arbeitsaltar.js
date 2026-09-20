/**
 * UNIVERSUM — Arbeitsaltar (So sei es)
 * Soft + Hard + Feld · Ethik-Gate · Rückkehr · 24h Hard-Sperre
 * German, no Gendersprache. Praxis-Ton.
 * Data: arbeitsaltar-soft/hard/feld.js (loaded before this file)
 */
(function (global) {
  'use strict';

  const CAT_ORDER = ["Alltag", "Schutz", "Energie", "Liebe", "Trennung", "Hard", "Feld"];
  const LOCK_KEY = "universum_arbeitsaltar_hardLock_v1";

  const soft = global.__AA_SOFT__ || [];
  const hard = global.__AA_HARD__ || [];
  const feld = global.__AA_FELD__ || [];
  const ARBEITSALTAR = soft.concat(hard, feld);

  function getHardLock() {
    try {
      const raw = localStorage.getItem(LOCK_KEY);
      if (!raw) return null;
      const lock = JSON.parse(raw);
      if (!lock || !lock.until) return null;
      if (Date.now() >= lock.until) {
        localStorage.removeItem(LOCK_KEY);
        return null;
      }
      return lock;
    } catch (_) { return null; }
  }

  function setHardLock(ritualId, title) {
    const until = Date.now() + 24 * 3600 * 1000;
    const lock = { until: until, ritualId: ritualId, title: title || ritualId, at: Date.now() };
    try { localStorage.setItem(LOCK_KEY, JSON.stringify(lock)); } catch (_) {}
    return until;
  }

  function clearHardLock() {
    try { localStorage.removeItem(LOCK_KEY); } catch (_) {}
  }

  function hardLockActive() {
    return getHardLock();
  }

  function hoursLeft(until) {
    if (!until) return 0;
    return Math.max(0, Math.ceil((until - Date.now()) / 3600000));
  }

  function listAll() {
    return ARBEITSALTAR.slice();
  }

  function listByTag(tag) {
    if (!tag || tag === 'Alle') return listAll();
    return ARBEITSALTAR.filter(function (r) { return r.tag === tag; });
  }

  function getById(id) {
    return ARBEITSALTAR.find(function (r) { return r.id === id || r.srcId === id; }) || null;
  }

  function fillPlaceholders(text, vars) {
    vars = vars || {};
    return String(text || '')
      .replace(/\[Name\]/g, vars.Name || '[Name]')
      .replace(/\[A\]/g, vars.A || '[A]')
      .replace(/\[B\]/g, vars.B || '[B]')
      .replace(/\[Thema\]/g, vars.Thema || '[Thema]');
  }

  function materialize(ritual, vars) {
    if (!ritual) return null;
    const v = vars || {};
    const clone = Object.assign({}, ritual);
    clone.steps = (ritual.steps || []).map(function (s) {
      return Object.assign({}, s, { text: fillPlaceholders(s.text, v) });
    });
    clone.intention = fillPlaceholders(ritual.intention, v);
    clone._vars = v;
    return clone;
  }

  function isHardBlocked(ritual) {
    if (!ritual || ritual.side !== 'hard' || ritual.exemptLock) return null;
    return hardLockActive();
  }

  global.UniversumArbeitsaltar = {
    CAT_ORDER: CAT_ORDER,
    ARBEITSALTAR: ARBEITSALTAR,
    listAll: listAll,
    listByTag: listByTag,
    getById: getById,
    fillPlaceholders: fillPlaceholders,
    materialize: materialize,
    getHardLock: getHardLock,
    setHardLock: setHardLock,
    clearHardLock: clearHardLock,
    hardLockActive: hardLockActive,
    hoursLeft: hoursLeft,
    isHardBlocked: isHardBlocked
  };
})(typeof window !== 'undefined' ? window : globalThis);
