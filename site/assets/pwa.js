if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  /* quando uma versão nova do site assume o controle, recarrega uma vez para não ficar com scripts velhos */
  const tinha = !!navigator.serviceWorker.controller; let recarregou = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => { if (tinha && !recarregou) { recarregou = true; location.reload(); } });
  addEventListener('load', () => navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).catch(() => {}));
}
