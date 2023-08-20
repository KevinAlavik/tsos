"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prompt = void 0;
function prompt(mem) {
    let currentPath = mem.read("currentPath");
    let user = mem.read("user");
    let host = mem.read("host");
    return `${user}@${host} (${currentPath}) $ `;
}
exports.prompt = prompt;
