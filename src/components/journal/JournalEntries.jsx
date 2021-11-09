import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { activeNote } from '../../actions/notes';
import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {
  const dispatch = useDispatch();

  const {notes} = useSelector(state => state.notes);

  return (
    <div className="journal__entries" >
       {
         notes.map((note) => (
           <JournalEntry key={note.id} {...note} onClick={(note) => handleEntryClick()}/>
         ))
       }
    </div>
  )
}
