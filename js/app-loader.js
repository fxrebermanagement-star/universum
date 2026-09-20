/** Assembles UNIVERSUM app.js from parts then runs it. */
(function () {
  var s = "";
  var n = 8;
  for (var i = 0; i < n; i++) {
    var p = window["__APP_PART_" + i + "__"];
    if (typeof p !== "string") {
      console.error("UNIVERSUM: app part missing", i);
      return;
    }
    s += p;
  }
  (0, eval)(s);
})();
