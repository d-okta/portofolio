// Dijalankan sebelum render agar bahasa dan mode gerak tidak berkedip.
(function () {
  var d = document.documentElement;
  try { var l = localStorage.getItem('lang'); if (l === 'en' || l === 'id') d.lang = l; } catch (e) {}
  d.classList.add('js');
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) d.classList.add('motion');
})();
