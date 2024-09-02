class NoteStorage {
    notes;

    constructor() {
        this.notes = new Map();
    }

    addOne(note) {
        this.notes.set(note.id, note);
    }

    getAll() {
        return Array.from(this.notes.values()).map(note => note.getData());
    }

    getOneById(id) {
        return this.notes.get(id);
    }

    updateOne(note) {
        if (this.notes.has(note.id)) {
            this.notes.set(note.id, note);
            return true;
        }
        return false;
    }

    deleteOne(id) {
        return this.notes.delete(id);
    }
}

export const noteStorage = new NoteStorage();