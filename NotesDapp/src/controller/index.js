import { NoteController } from './noteController';

const noteController = new NoteController();

export const controller = {
    createNote: noteController.createNote.bind(noteController),
    getAllNotes: noteController.getAllNotes.bind(noteController),
    getNoteById: noteController.getNoteById.bind(noteController),
    updateNote: noteController.updateNote.bind(noteController),
    deleteNote: noteController.deleteNote.bind(noteController),
};