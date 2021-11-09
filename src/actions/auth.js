import { auth, googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';

import { uiFinishLoading, uiStartLoading } from './ui';
import { errors } from '../helpers/error';
import { cleanNotes } from './notes';

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(uiStartLoading());
    auth.signInWithEmailAndPassword(auth.getAuth(), email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(uiFinishLoading())
      })
      .catch(e => { 
        console.log(e.message)
        swal ( "Error!!" , errors(e.message)  ,  "error" );
        
        dispatch(uiFinishLoading());
      })
  }

}

export const startGoogleLogin = () => {
  return (dispatch) => {
    auth.signInWithPopup(auth.getAuth(), googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName))
      })
      .catch( e =>{
        swal ( "Error!!" , errors(e.message)  ,  "error" );

      }

      )
  }
}

export const startRegisterWithEmailPassword = (email, password, name) => {
  return (dispatch) => {
    auth.createUserWithEmailAndPassword(auth.getAuth(), email, password)
      .then(async ({ user }) => {
        await auth.updateProfile(auth.getAuth().currentUser, { displayName: name });

        dispatch(login(user.uid, user.displayName));
      })
      .catch((error) => {
        console.log(error);
        Swal.fire('Error', error.message, 'error');
      })
  }
}



export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  }
})

export const startLogout = () => {
  return async(dispatch) => {
    await auth.signOut(auth.getAuth());
    
    dispatch(logout());
    dispatch(cleanNotes());
  }
}

export const logout = () => ({
  type: types.logout
})