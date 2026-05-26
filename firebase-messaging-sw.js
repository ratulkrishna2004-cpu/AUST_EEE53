importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyA42cAhFc4ygHqmkZTIr2Rc87eEF_QA4R4",
    authDomain: "spardho-53.firebaseapp.com",
    databaseURL: "https://spardho-53-default-rtdb.firebaseio.com",
    projectId: "spardho-53",
    storageBucket: "spardho-53.firebasestorage.app",
    messagingSenderId: "1042755226180",
    appId: "1:1042755226180:web:76d4202bfc0352a240ca11"
});

const messaging = firebase.messaging();

// Background notification handler
messaging.onBackgroundMessage(function(payload) {
    console.log('Background message received:', payload);
    const notificationTitle = payload.notification.title || 'নতুন Notice!';
    const notificationOptions = {
        body: payload.notification.body || 'AUST EEE-53 এ নতুন notice এসেছে।',
        icon: '/Logo-batch.png',
        badge: '/Logo-batch.png',
        vibrate: [200, 100, 200],
        data: { url: payload.data && payload.data.url ? payload.data.url : '/' }
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Notification click — open the site
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    const targetUrl = (event.notification.data && event.notification.data.url) ? event.notification.data.url : '/';
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
            for (const client of clientList) {
                if (client.url.includes(self.location.origin) && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) return clients.openWindow(targetUrl);
        })
    );
});
