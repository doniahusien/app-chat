import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw';

const messaging = getMessaging();

onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
   
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
