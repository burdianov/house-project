import { FirebaseOptions, getApp, initializeApp } from 'firebase/app';

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
};

function createFirebaseApp(config: FirebaseOptions) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

export default function initFirebase() {
  createFirebaseApp(firebaseConfig);
}

// const firebaseApp = createFirebaseApp(firebaseConfig);

// export const firebaseAuth = getAuth(firebaseApp);
