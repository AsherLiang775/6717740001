import React, { useState } from 'react';
import NoteForm from './NoteForm';
import './NoteItem.css';

const NoteItem = ({ note, onUpdateNote, onDeleteNote }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditSubmit = (newText) => {
        onUpdateNote(note.id, newText);
        setIsEditing(false);
    };

    const noteDate = new Date(note.timestamp);
    const day = noteDate.getDate();
    const month = noteDate.toLocaleString('en-US', { month: 'short' });

    return (
        <div className="note-item">
            {isEditing ? (
                <NoteForm
                    initialValue={note.text}
                    onAddNote={handleEditSubmit}
                />
            ) : (
                <>
                    <div className="note-date">
                        <span className="note-day">{day}</span>
                        <span className="note-month">{month}</span>
                    </div>

                    <div className="note-content">
                        <p>{note.text}</p>
                        <div className="note-buttons">
                            <button onClick={() => setIsEditing(true)} className="note-edit-button">编辑</button>
                            <button onClick={() => onDeleteNote(note.id)} className="note-delete-button">删除</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default NoteItem;