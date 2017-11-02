import { appTokenKey, firebaseAuth } from '../constants';

export default () => (!!firebaseAuth.currentUser || !!localStorage.getItem(appTokenKey));
