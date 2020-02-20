import { getFireStore } from "src/utils/firebase";

export async function getUserByFirebaseToken(context: {
  user: { uid: string };
}): Promise<any> {
  if (!context || !context.user) return null;
  const firebaseUid = context.user.uid;
  console.log(context.user);
  return (
    await getFireStore()
      .collection("users")
      .doc(firebaseUid)
      .get()
  ).data();
}
