import { Note } from '../model/note';
import { RollupStateHandler } from '../shared/rollup-state-handler';
import { noteStorage } from '../storage/noteStorage';

export class NoteController {
    async createNote(data) {
        if (!data.title) {
            return await RollupStateHandler.handleReport({
                error: 'Note title must be provided.',
            });
        }

        return await RollupStateHandler.advanceWrapper(() => {
            const newNote = new Note(data);
            noteStorage.addOne(newNote);
            return {
                ok: true,
                message: 'Note created successfully!',
                data: newNote.getData(),
            };
        });
    }

    async getAllNotes() {
        return await RollupStateHandler.inspectWrapper(() =>
            noteStorage.getAll()
        );
    }

    async getNoteById(data) {
        const noteId = data[0];
        const note = noteStorage.getOneById(noteId);
        if (!note) {
            return await RollupStateHandler.handleReport({
                error: `Note not found for id '${noteId}'.`,
            });
        }
        return await RollupStateHandler.inspectWrapper(() => note.getData());
    }

    async updateNote(data) {
        const { id, ...updateData } = data;
        const note = noteStorage.getOneById(id);
        if (!note) {
            return await RollupStateHandler.handleReport({
                error: `Note not found for id '${id}'.`,
            });
        }

        return await RollupStateHandler.advanceWrapper(() => {
            note.update(updateData);
            noteStorage.updateOne(note);
            return {
                ok: true,
                message: `Note '${note.id}' updated successfully!`,
                data: note.getData(),
            };
        });
    }

    async deleteNote(data) {
        const noteId = data.id;
        return await RollupStateHandler.advanceWrapper(() => {
            const deleted = noteStorage.deleteOne(noteId);
            if (deleted) {
                return {
                    ok: true,
                    message: `Note '${noteId}' deleted successfully!`,
                };
            } else {
                return {
                    ok: false,
                    message: `Note '${noteId}' not found or could not be deleted.`,
                };
            }
        });
    }
}