import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { activeNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

  const { active: note } = useSelector(state => state.notes);
  const dispatch = useDispatch();
  const activeId = useRef(note.id);

  const [formValues, handleInputChange, reset] = useForm(note);

  useEffect(() => {

    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }

  }, [note, reset])

  useEffect(() => {
    dispatch(activeNote(formValues.id, { ...formValues }));

  }, [formValues, dispatch])

  const { body, title, date, url } = formValues;

  return (
    <div className="notes__main-content">

      <NotesAppBar />

      <div className="notes__content">
        <input
          type="text"
          name="title"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
          value={title}
          onChange={handleInputChange}
        />
        <textarea
          className="notes__textarea"
          name="body"
          placeholder="What happened today"
          value={body}
          onChange={handleInputChange}
        ></textarea>

        {
          note.url &&
          <div className="notes__img">
            <img src={`${note.url}`} alt="Imagen" />

          </div>
        }
      </div>
      
    </div>
  )
}
