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
import { firebaseConfig } from './firebase.config';

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