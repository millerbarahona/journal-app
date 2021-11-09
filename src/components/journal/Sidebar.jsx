import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {

  const dispatch = useDispatch();
  const { name } = useSelector(state => state.auth);

  const handleLogOut = () => {
    dispatch(startLogout());
  }

  const handleAddEntry = () => {
    dispatch(startNewNote());
  }

  return (
    <aside className="journal__sidebar">
      <div className="journal__sidebar-navbar">

        <h3 className="">
          <i className="far fa-moon-stars"></i>
          <span> {name}</span>
        </h3>

        <button
          className="btn"
          onClick={handleLogOut}
        >
          Log Out
        </button>
      </div>

      <div
        className="journal__new-entry"
        onClick={ handleAddEntry }
      >
        <i className="far fa-calendar-plus fa-4x"></i>
        <p>New Entry</p>

      </div>

      <JournalEntries />

    </aside>
  )
}
