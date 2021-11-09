import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";
import swal from 'sweetalert';
import { fileUpload } from "../helpers/fileUpload";


//react-redux
export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { auth } = getState();

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    }

    const doc = await db.addDoc(db.collection(db.getFirestore(), `${auth.uid}/journal/notes`), newNote);
    const notes = await loadNotes(auth.uid);

    dispatch(activeNote(doc.id, newNote));
    dispatch(addNote(newNote, doc.id));
  }
}

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note
  }
})

export const addNote = (note, id) => ({
  type: types.notesAddNew,
  payload: {
    ...note,
    id
  }
})

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {

    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));

  }
}

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes
})

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {

    const { uid } = getState().auth;

    if (!note.url) {
      delete note.url;
    }

    const noteToFirestore = { ...note };
    await db.setDoc(db.doc(db.getFirestore(), `${uid}/journal/notes/${note.id}`), noteToFirestore);

    dispatch(refreshNote(note.id, noteToFirestore));
    swal('Saved', 'Entry saved!!','success');
  }
}

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id,
    note: {
      id,
      ...note
    }
  }
})

export const startUpLoading = ( file ) => {
  return async (dispatch, getState) => {
    const {active: activeNote} = getState().notes;
    
    swal({
      title:'Uploading...',
      text: 'Please wait',      
      closeOnClickOutside: false,
      buttons: false,
      icon: 'loading'
    })
    const fileUrl = await fileUpload(file);
    activeNote.url = fileUrl

    swal.close();

    dispatch(startSaveNote(activeNote));
  }
}

export const startDeleting = ( id ) => {
  return async (dispatch, getState) => {

    const uid = getState().auth.uid;
    await db.deleteDoc(db.doc(db.getFirestore() ,`${uid}/journal/notes/${id}`));

    dispatch( deleteNote(id) );
  }
}

export const deleteNote = ( id ) => ({
  type: types.notesDelete,
  payload: id
})

export const cleanNotes = () => ({
  type: types.cleanNotes
})
