import { firebaseAuth, googleProvider } from '../../constants';

export const loginWithGoogle = () => firebaseAuth().signInWithRedirect(googleProvider)

export const logout = () => firebaseAuth().signOut();
