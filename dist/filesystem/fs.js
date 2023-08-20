"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystem = void 0;
class File {
    name;
    content;
    constructor(name, content) {
        this.name = name;
        this.content = content;
    }
}
class Directory {
    name;
    children = [];
    constructor(name) {
        this.name = name;
    }
    addFile(file) {
        this.children.push(file);
    }
    addDirectory(directory) {
        this.children.push(directory);
    }
}
class FileSystem {
    root;
    constructor() {
        this.root = new Directory('/');
    }
    findPath(path, currentDirectory = this.root) {
        const parts = path.split('/').filter(part => part !== '');
        if (parts.length === 0) {
            return currentDirectory;
        }
        const nextPart = parts.shift();
        const child = currentDirectory.children.find(item => item.name === nextPart);
        if (!child) {
            return null;
        }
        if (child instanceof Directory) {
            return this.findPath(parts.join('/'), child);
        }
        else {
            return parts.length === 0 ? child : null;
        }
    }
    createDirectory(path) {
        const parts = path.split('/').filter(part => part !== '');
        let currentDirectory = this.root;
        for (const part of parts) {
            let dir = currentDirectory.children.find(item => item.name === part);
            if (!dir) {
                dir = new Directory(part);
                currentDirectory.addDirectory(dir);
            }
            if (dir instanceof Directory) {
                currentDirectory = dir;
            }
            else {
                throw new Error(`A file with the same name '${part}' already exists in the path '${path}'.`);
            }
        }
    }
    createFile(path, content) {
        const parts = path.split('/').filter(part => part !== '');
        const fileName = parts.pop();
        if (!fileName) {
            throw new Error('Invalid path.');
        }
        const directoryPath = parts.join('/');
        const directory = this.findPath(directoryPath);
        if (!directory || !(directory instanceof Directory)) {
            throw new Error(`Directory '${directoryPath}' does not exist or path is invalid.`);
        }
        const existingFile = directory.children.find(item => item.name === fileName);
        if (existingFile instanceof File) {
            throw new Error(`A file with the name '${fileName}' already exists in the directory '${directoryPath}'.`);
        }
        const file = new File(fileName, content);
        directory.addFile(file);
    }
    readFile(path) {
        const file = this.findPath(path);
        if (file instanceof File) {
            return file.content;
        }
        else {
            throw new Error(`File '${path}' not found.`);
        }
    }
}
exports.FileSystem = FileSystem;
