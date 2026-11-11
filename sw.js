/* Service worker: nhận thông báo đẩy (Firebase Cloud Messaging) lúc app đóng, hiện thông báo và cộng số trên biểu tượng. */
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });

function tangSo() {
  return caches.open('qlx').then(function (c) {
    return c.match('badge').then(function (r) { return r ? r.text() : '0'; }).then(function (t) {
      var n = (parseInt(t, 10) || 0) + 1;
      return c.put('badge', new Response(String(n))).then(function () {
        if (self.navigator.setAppBadge) return self.navigator.setAppBadge(n);
      });
    });
  }).catch(function () { /* số trên biểu tượng không bắt buộc */ });
}

self.addEventListener('push', function (e) {
  var d = {};
  try { d = e.data ? e.data.json() : {}; } catch (x) { /* bỏ qua */ }
  var m = d.data || d.notification || {};
  // iPhone bắt buộc mọi lần đẩy phải hiện thông báo.
  e.waitUntil(tangSo().then(function () {
    return self.registration.showNotification(m.title || 'Quản lý xe', { body: m.body || '', icon: 'icon-192.png', badge: 'icon-192.png' });
  }));
});

self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (cs) {
    for (var i = 0; i < cs.length; i++) if ('focus' in cs[i]) return cs[i].focus();
    return self.clients.openWindow('./');
  }));
});
