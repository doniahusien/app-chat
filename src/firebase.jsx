import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
const firebaseConfig = {
  apiKey: "AIzaSyAjpvPTwxzsznT_fPI65wrYefxkjQ5KEJY",
  authDomain: "chat-abba2.firebaseapp.com",
  projectId: "chat-abba2",
  storageBucket: "chat-abba2.appspot.com",
  messagingSenderId: "338338187980",
  appId: "1:338338187980:web:d2746ecaef326b26bc9069"
};
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { app, messaging };