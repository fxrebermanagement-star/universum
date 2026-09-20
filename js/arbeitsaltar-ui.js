(function (global) {
  'use strict';
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function toast(msg, ms, kind) {
    var host = $('#toast-host');
    if (!host) return;
    var el = document.createElement('div');
    el.className = 'toast' + (kind === 'warn' ? ' warn' : kind === 'error' ? ' error' : '');
    el.textContent = msg;
    host.appendChild(el);
    setTimeout(function () { el.classList.add('out'); setTimeout(function () { el.remove(); }, 240); }, ms || 2400);
  }
  var cat = 'Alle';
  var timer = null;
  function clearTimer() { if (timer) { clearInterval(timer); timer = null; } }
  function closeRunner() {
    clearTimer();
    var r = $('#ritual-runner');
    if (r) r.classList.remove('open');
  }
  function openRunner(title) {
    var r = $('#ritual-runner');
    if (!r) return null;
    r.classList.add('open');
    if ($('#rr-title')) $('#rr-title').textContent = title || 'Arbeitsaltar';
    return $('#rr-content');
  }
  function fmt(s) { return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }
  function goEigene() {
    var nav = document.querySelector('[data-nav="rituale"]');
    if (nav) nav.click();
    setTimeout(function () {
      $$('[data-rtab]').forEach(function (b) {
        var on = b.dataset.rtab === 'custom';
        b.classList.toggle('active', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      $$('[data-rpanel]').forEach(function (p) {
        p.classList.toggle('hidden', p.dataset.rpanel !== 'custom');
      });
      render();
    }, 60);
  }
  function render() {
    var AA = global.UniversumArbeitsaltar;
    var listEl = $('#arbeitsaltar-list');
    var catsEl = $('#arbeitsaltar-cats');
    var banner = $('#arbeitsaltar-lock-banner');
    if (!listEl || !AA) return;
    var lock = AA.hardLockActive && AA.hardLockActive();
    if (banner) {
      if (lock) {
        banner.hidden = false;
        banner.textContent = 'Hard-Sperre aktiv noch ca. ' + AA.hoursLeft(lock.until) +
          ' h · Letztes Hard: ' + (lock.title || lock.ritualId) + '. Soft und Dank bleiben frei.';
      } else { banner.hidden = true; banner.textContent = ''; }
    }
    var order = AA.CAT_ORDER || [];
    var cats = ['Alle'].concat(order);
    if (catsEl) {
      catsEl.innerHTML = cats.map(function (c) {
        var on = c === cat;
        return '<button type="button" class="chip' + (on ? ' on' : '') + '" data-aa-cat="' +
          esc(c) + '" aria-pressed="' + (on ? 'true' : 'false') + '">' + esc(c) + '</button>';
      }).join('');
      $$('#arbeitsaltar-cats [data-aa-cat]').forEach(function (btn) {
        btn.onclick = function () { cat = btn.dataset.aaCat || 'Alle'; render(); };
      });
    }
    var all = AA.listByTag ? AA.listByTag(cat) : AA.listAll();
    var grouped = {};
    all.forEach(function (r) { (grouped[r.tag || 'Alltag'] = grouped[r.tag || 'Alltag'] || []).push(r); });
    var keys = Object.keys(grouped).sort(function (a, b) {
      var ia = order.indexOf(a), ib = order.indexOf(b);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    });
    function itemHtml(r) {
      var hard = r.side === 'hard';
      var blocked = !!(AA.isHardBlocked && AA.isHardBlocked(r));
      var love = r.srcId === 'anz' ? ' · Liebe soft' :
        (r.srcId === 'bindung' || r.srcId === 'bindung2' ? ' · Liebe hard' : '');
      var px = r.srcId === 'ueber' ? ' · Person-X' : '';
      return '<div class="ritual-item' + (hard ? ' aa-hard' : ' aa-soft') + (blocked ? ' aa-blocked' : '') + '">' +
        '<button type="button" class="ritual-item-main" data-aa-ritual="' + esc(r.id) + '"' +
        (blocked ? ' disabled' : '') + '>' +
        '<span class="r-ico">' + (r.ico || '✦') + '</span><span><div class="r-name">' + esc(r.name) +
        '<span class="fav-badge ' + (hard ? 'aa-hard-badge">Hard' : 'aa-soft-badge">Soft') + '</span></div>' +
        '<div class="r-meta">' + esc(r.subtitle || '') + ' · ' + (r.steps || []).length + ' Schritte' +
        love + px + (blocked ? ' · 24h-Sperre' : '') + (r.softGate ? ' · Soft-Gate' : '') +
        (hard ? ' · Ethik-Gate' : '') + '</div></span></button></div>';
    }
    listEl.innerHTML = keys.length ? keys.map(function (k) {
      return '<p class="group-label aa-group">' + esc(k) + '</p>' + grouped[k].map(itemHtml).join('');
    }).join('') : '<p class="hint-sm">Keine Rituale in dieser Kategorie.</p>';
    $$('#arbeitsaltar-list [data-aa-ritual]').forEach(function (btn) {
      btn.onclick = function () {
        if (btn.disabled) { toast('Hard gesperrt — 24h. Soft und Dank bleiben frei.', 2800, 'warn'); return; }
        var r = AA.getById(btn.dataset.aaRitual);
        if (r) start(r); else toast('Ritual nicht gefunden', 2400, 'warn');
      };
    });
  }
  function start(ritual) {
    var AA = global.UniversumArbeitsaltar;
    var blocked = AA.isHardBlocked && AA.isHardBlocked(ritual);
    if (blocked) {
      toast('Hard-Sperre aktiv (~' + AA.hoursLeft(blocked.until) + ' h). Soft bleibt frei.', 3200, 'warn');
      return;
    }
    goEigene();
    var flow = { ethikOk: false, softGateOk: false, vars: {} };
    function cancel() { closeRunner(); toast('Abgebrochen', 2200, 'warn'); }
    function softGate() {
      var c = openRunner(ritual.name);
      c.innerHTML = '<div class="rr-step"><h2>Soft-Gate</h2><p class="section-sub">' + esc(ritual.name) +
        ' — nicht Rache.</p><p class="notice ethics-line">Soft hält die 9.</p>' +
        '<div class="safety-check" style="text-align:left;width:100%">' +
        '<label><input type="checkbox" id="aa-sg1"> Ich setze Ausgleich, nicht Rache.</label>' +
        '<label><input type="checkbox" id="aa-sg2"> Ich bleibe bei der 9.</label></div>' +
        '<div class="rr-actions"><button type="button" class="primary" id="aa-sg-ok" disabled>Weiter</button>' +
        '<button type="button" id="aa-sg-x">Abbrechen</button></div></div>';
      function sync() { $('#aa-sg-ok').disabled = !($('#aa-sg1').checked && $('#aa-sg2').checked); }
      $('#aa-sg1').onchange = sync; $('#aa-sg2').onchange = sync;
      $('#aa-sg-ok').onclick = function () { flow.softGateOk = true; prep(); };
      $('#aa-sg-x').onclick = cancel;
    }
    function ethikGate() {
      var c = openRunner(ritual.name);
      c.innerHTML = '<div class="rr-step"><h2>Ethik-Gate · Hard</h2><p class="section-sub">' + esc(ritual.name) + '</p>' +
        '<div class="notice ethics-line"><strong>Preis</strong><br>' + esc(ritual.price || 'Du trägst den Preis.') + '</div>' +
        '<div class="notice ethics-line"><strong>Gegenseite</strong><br>' + esc(ritual.gegen || 'Das Feld gleicht aus.') + '</div>' +
        '<div class="safety-check" style="text-align:left;width:100%">' +
        '<label><input type="checkbox" id="aa-eg1"> Ich kenne den Preis und trage ihn.</label>' +
        '<label><input type="checkbox" id="aa-eg2"> Ich kenne die Gegenseite.</label>' +
        '<label><input type="checkbox" id="aa-eg3"> Ich kehre danach vollständig zurück (9).</label></div>' +
        '<div class="rr-actions"><button type="button" class="primary" id="aa-eg-ok" disabled>Hard bestätigen</button>' +
        '<button type="button" id="aa-eg-x">Abbrechen</button></div></div>';
      function sync() {
        $('#aa-eg-ok').disabled = !($('#aa-eg1').checked && $('#aa-eg2').checked && $('#aa-eg3').checked);
      }
      ['aa-eg1','aa-eg2','aa-eg3'].forEach(function (id) { $('#' + id).onchange = sync; });
      $('#aa-eg-ok').onclick = function () { flow.ethikOk = true; prep(); };
      $('#aa-eg-x').onclick = cancel;
    }
    function needs() {
      var need = ritual.need || [];
      var c = openRunner(ritual.name);
      var fields = need.map(function (k) {
        return '<div class="form-row"><label>' + esc(k) + '</label><input type="text" data-aa-var="' +
          esc(k) + '" value="' + esc(flow.vars[k] || '') + '" autocomplete="off" /></div>';
      }).join('');
      c.innerHTML = '<div class="rr-step"><h2>Platzhalter</h2><p class="section-sub">' +
        esc(ritual.side === 'hard' ? 'HARD' : 'SOFT') + ' · Namen / Thema.</p>' + fields +
        '<div class="rr-actions"><button type="button" class="primary" id="aa-n-ok">Weiter</button>' +
        '<button type="button" id="aa-n-x">Abbrechen</button></div></div>';
      $('#aa-n-ok').onclick = function () {
        $$('#rr-content [data-aa-var]').forEach(function (inp) {
          flow.vars[inp.dataset.aaVar] = (inp.value || '').trim();
        });
        if (need.some(function (k) { return !flow.vars[k]; })) {
          toast('Bitte alle Felder ausfüllen', 2400, 'warn'); return;
        }
        prep();
      };
      $('#aa-n-x').onclick = cancel;
    }
    function prep() {
      if (ritual.softGate && !flow.softGateOk) return softGate();
      if (ritual.side === 'hard' && !flow.ethikOk) return ethikGate();
      var need = ritual.need || [];
      if (need.length && need.some(function (k) { return !flow.vars[k]; })) return needs();
      var mat = AA.materialize(ritual, flow.vars);
      mat._aaNeedRueckkehr = ritual.side === 'hard' || !!need.length;
      run(mat);
    }
    function run(ritual) {
      var c = openRunner(ritual.name);
      var steps = ritual.steps || [];
      var i = 0;
      function safety() {
        var hard = ritual.side === 'hard';
        var items = hard ? [
          ['body', 'Körper: Ich bin nüchtern genug und fühle mich stabil genug für diese Praxis.'],
          ['purpose', 'Zweck: Preis und Gegenseite sind mir bewusst.'],
          ['return9', 'Rückkehr (9): Ich kehre vollständig zurück.'],
          ['closing', 'Abschluss: Ich schliesse bewusst und setze die 24h-Pause nach Hard.']
        ] : [
          ['body', 'Körper: Ich bin nüchtern genug und fühle mich stabil genug für diese Praxis.'],
          ['purpose', 'Zweck: Meine Absicht ist klar und ehrlich formuliert.'],
          ['boundaries', 'Grenzen: Ich respektiere meine und fremde Grenzen.'],
          ['closing', 'Abschluss: Ich schliesse bewusst und kehre in den Alltag zurück.']
        ];
        c.innerHTML = '<div class="rr-step"><h2>Sicherheitscheck</h2><p class="section-sub">' +
          esc(hard ? 'Hard · Ethik-Gate bestanden' : 'Arbeitsaltar · Soft — bei der 9.') + '</p>' +
          '<p class="notice ethics-line">So sei es — Enter-Taste der Praxis.</p>' +
          '<div class="safety-check" style="text-align:left;width:100%">' +
          items.map(function (x) {
            return '<label><input type="checkbox" data-safe="' + x[0] + '"> ' + esc(x[1]) + '</label>';
          }).join('') + '</div>' +
          '<div class="rr-actions"><button type="button" class="primary" id="aa-s-ok" disabled>Schwelle betreten</button>' +
          '<button type="button" id="aa-s-x">Verlassen</button></div></div>';
        var boxes = $$('#rr-content [data-safe]');
        var go = $('#aa-s-ok');
        function sync() { go.disabled = !boxes.every(function (b) { return b.checked; }); }
        boxes.forEach(function (b) { b.onchange = sync; });
        go.onclick = function () { step(0); };
        $('#aa-s-x').onclick = closeRunner;
      }
      function step(idx) {
        clearTimer();
        i = idx;
        if (i >= steps.length) {
          if (ritual._aaNeedRueckkehr) return rueck();
          return soSeiEs();
        }
        var s = steps[i];
        var rem = s.sec || 60;
        var prog = Math.round((i / Math.max(steps.length, 1)) * 100);
        c.innerHTML = '<div class="rr-step"><div class="rr-progress"><i style="width:' + prog + '%"></i></div>' +
          '<p class="section-sub">Schritt ' + (i + 1) + ' / ' + steps.length + '</p>' +
          '<h2>' + esc(s.title) + '</h2>' +
          '<div class="rr-timer" id="rr-timer">' + fmt(rem) + '</div>' +
          '<p class="rr-text">' + esc(s.text) + '</p>' +
          '<div class="rr-actions"><button type="button" class="primary" id="aa-next">Weiter</button>' +
          '<button type="button" id="aa-skip">Zeit lassen</button>' +
          '<button type="button" id="aa-x">Verlassen</button></div></div>';
        timer = setInterval(function () {
          rem--;
          var t = $('#rr-timer');
          if (t) t.textContent = fmt(Math.max(0, rem));
          if (rem <= 0) { clearTimer(); step(i + 1); }
        }, 1000);
        $('#aa-next').onclick = function () { clearTimer(); step(i + 1); };
        $('#aa-skip').onclick = function () { clearTimer(); step(i + 1); };
        $('#aa-x').onclick = closeRunner;
      }
      function rueck() {
        c.innerHTML = '<div class="rr-step"><h2>Rückkehr</h2>' +
          '<p class="section-sub">Pflicht vor «So sei es».</p>' +
          '<p class="rr-text">Ich kehre vollständig in mich zurück. Meine Energie gehört nur mir. Der Beobachter bleibt wach.</p>' +
          '<div class="safety-check" style="text-align:left;width:100%">' +
          '<label><input type="checkbox" id="aa-rk"> Rückkehr gespürt / gesprochen</label></div>' +
          '<div class="rr-actions"><button type="button" class="primary" id="aa-rk-ok" disabled>So sei es</button>' +
          '<button type="button" id="aa-rk-x">Verlassen</button></div></div>';
        var box = $('#aa-rk'), go = $('#aa-rk-ok');
        box.onchange = function () { go.disabled = !box.checked; };
        go.onclick = soSeiEs;
        $('#aa-rk-x').onclick = closeRunner;
      }
      function soSeiEs() {
        if (ritual.side === 'hard' && !ritual.exemptLock && AA.setHardLock) {
          AA.setHardLock(ritual.id, ritual.name);
        }
        var note = ritual.side === 'hard'
          ? '<p class="notice ethics-line">Hard abgeschlossen — 24h-Sperre greift. Dank bleibt frei.</p>'
          : '<p class="notice ethics-line">Soft · bei der 9. Die Arbeit ist dem Feld übergeben.</p>';
        c.innerHTML = '<div class="rr-step"><h2>SO SEI ES</h2><p class="section-sub">' + esc(ritual.name) +
          '</p>' + note + '<p class="rr-text">Es ist so. Alltag nimmt Raum.</p>' +
          '<div class="rr-actions"><button type="button" class="primary" id="aa-done">Kreis schliessen</button></div></div>';
        $('#aa-done').onclick = function () {
          closeRunner();
          toast('So sei es — Schwelle gehalten.');
          render();
        };
      }
      safety();
    }
    prep();
  }
  function boot() {
    if (!global.UniversumArbeitsaltar) {
      console.warn('Arbeitsaltar catalog missing');
      return;
    }
    document.addEventListener('click', function (ev) {
      var t = ev.target && ev.target.closest && ev.target.closest('[data-rtab="custom"]');
      if (t) setTimeout(render, 40);
    });
    setTimeout(function () {
      var panel = document.querySelector('[data-rpanel="custom"]:not(.hidden)');
      if (panel) render();
    }, 500);
    var closeBtn = $('#rr-close');
    if (closeBtn && !closeBtn.dataset.aaBound) {
      closeBtn.dataset.aaBound = '1';
      closeBtn.addEventListener('click', closeRunner);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  global.UniversumArbeitsaltarUI = { render: render, start: start, boot: boot };
})(typeof window !== 'undefined' ? window : globalThis);
