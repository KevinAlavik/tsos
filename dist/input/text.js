"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.input = void 0;
const readline = require("readline");
function input(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}
exports.input = input;
