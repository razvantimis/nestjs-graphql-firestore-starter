import * as admin from "firebase-admin";
import * as fireorm from 'fireorm';

import { getServerConfig } from "src/server-config";

let firebaseApp: admin.app.App | null = null;
export function getFirebaseApp() {
  return firebaseApp;
}

export async function initFirebase() {
  if (!firebaseApp) {
    const { serviceAccount, databaseURL } = getServerConfig().firebase;
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL
    });
    const firestore = admin.firestore();
    firestore.settings({ timestampsInSnapshots: true });
    fireorm.initialize(firestore);
  }
}


