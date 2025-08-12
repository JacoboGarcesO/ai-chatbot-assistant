import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  type User as FirebaseUser
} from 'firebase/auth';
import type { User } from '../types/User';
import { UserRole } from '../types/User';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const mapFirebaseUserToUser = (firebaseUser: FirebaseUser): User => ({
  id: firebaseUser.uid,
  name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Usuario',
  email: firebaseUser.email || '',
  role: UserRole.CUSTOMER,
  createdAt: new Date(firebaseUser.metadata.creationTime || Date.now()),
  updatedAt: new Date(),
  avatar: firebaseUser.photoURL || 'https://avatars.githubusercontent.com/u/155118605?v=4'
});

export const firebaseService = {
  async signInWithEmail(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return mapFirebaseUserToUser(userCredential.user);
    } catch (error) {
      throw new Error('Error al iniciar sesión con email y contraseña');
    }
  },

  async signInWithGoogle(): Promise<User> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return mapFirebaseUserToUser(result.user);
    } catch (error) {
      throw new Error('Error al iniciar sesión con Google');
    }
  },

  async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error('Error al cerrar sesión');
    }
  },

  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        callback(mapFirebaseUserToUser(firebaseUser));
      } else {
        callback(null);
      }
    });
  },

  getCurrentUser(): User | null {
    const firebaseUser = auth.currentUser;
    return firebaseUser ? mapFirebaseUserToUser(firebaseUser) : null;
  }
};