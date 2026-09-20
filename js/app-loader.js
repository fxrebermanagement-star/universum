/** Assembles UNIVERSUM app.js from sub-chunks then runs it. */
(function () {
  var s = "";
  var parts = 16, subs = 3;
  for (var i = 0; i < parts; i++) {
    for (var j = 0; j < subs; j++) {
      var p = window["__APP_P" + i + "S" + j + "__"];
      if (typeof p !== "string") {
        console.error("UNIVERSUM: app chunk missing", i, j);
        return;
      }
      s += p;
    }
  }
  (0, eval)(s);
})();
