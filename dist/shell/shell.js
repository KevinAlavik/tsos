"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeShell = exports.createShell = void 0;
const text_1 = require("../input/text");
const prompt_1 = require("./prompt");
const handle_1 = require("./handle");
let run = true;
async function createShell(mem) {
    while (run) {
        let command = (0, text_1.input)((0, prompt_1.prompt)(mem));
        (0, handle_1.handleCommand)(await command, mem);
    }
}
exports.createShell = createShell;
function closeShell() {
    run = false;
}
exports.closeShell = closeShell;
