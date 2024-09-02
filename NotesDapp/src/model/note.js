import crypto from 'node:crypto';

export class Note {
    id;
    createdAt;
    title;
    content;
    tags;

    constructor({ title, content, tags = [] }) {
        this.id = crypto.randomUUID();
        this.createdAt = Date.now();
        this.title = title;
        this.content = content;
        this.tags = tags;
    }

    update({ title, content, tags }) {
        if (title) this.title = title;
        if (content) this.content = content;
        if (tags) this.tags = tags;
    }

    getData() {
        return {
            id: this.id,
            createdAt: this.createdAt,
            title: this.title,
            content: this.content,
            tags: this.tags,
        };
    }
}