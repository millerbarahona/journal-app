import React from 'react'
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { startDeleting, startSaveNote, startUpLoading } from '../../actions/notes';

export const NotesAppBar = () => {

  const dispatch = useDispatch();
  const { active } = useSelector(state => state.notes);
  const noteDate = moment(active.date);

  const handleSaveNote = () => {
    dispatch(startSaveNote(active));
  }

  const handleUpdateImg = () => {
    document.querySelector('#fileSelector').click();
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(startUpLoading(file));
    }

  }

  const handleDelete = () => {
    dispatch(startDeleting(active.id));
  }

  return (
    <div className="notes__appbar">
      <span> {noteDate.format('MMMM')} {noteDate.format('Do')} of {noteDate.format('YYYY')}</span>

      <input
        id="fileSelector"
        type="file"
        name="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <div>
        <button
          className="btn btn-primary"
          onClick={handleUpdateImg}
        >
          Picture
        </button>

        <button
          className="btn btn-primary"
          onClick={handleSaveNote}
        >
          Save
        </button>

        <button
          className="btn btn-danger"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  )
}
