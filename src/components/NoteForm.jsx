import React, { useState } from 'react';
import './NoteForm.css';

const NoteForm = ({ onAddNote, initialValue = '' }) => {
    const [noteText, setNoteText] = useState(initialValue);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (noteText.trim()) {
            onAddNote(noteText);
            if (!initialValue) {
                setNoteText('');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder={initialValue ? 'Edit your notes...' : 'Add your notes...'}
                rows="4"
                style={{ width: '100%', marginBottom: '10px', padding: '10px', boxSizing: 'border-box' }}
            ></textarea>
            <button type="submit" className="add-note-button">
                {initialValue ? 'Save' : 'Add notes'}
            </button>
        </form>
    );
};

export default NoteForm;