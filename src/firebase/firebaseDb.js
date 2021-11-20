import { firebaseApp } from "./firebaseInit";
import { getFirestore} from "firebase/firestore"

console.log(firebaseApp)
export const db = getFirestore();