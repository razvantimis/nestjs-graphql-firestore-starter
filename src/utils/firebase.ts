import * as admin from "firebase-admin";
import { getServerConfig } from "src/server-config";

let firebaseApp: admin.app.App | null = null;
let firestore: FirebaseFirestore.Firestore | null = null;
export function getFirebaseApp() {
  if (!firebaseApp) {
    const { serviceAccount, databaseURL } = getServerConfig().firebase;
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL
    });
    firestore = admin.firestore();
    firestore.settings({ timestampsInSnapshots: true });
  }
  return firebaseApp;
}

export function getFireStore() {
  return firestore!;
}

