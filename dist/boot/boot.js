"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reboot = exports.boot = void 0;
const mem_1 = require("../memory/mem");
const shell_1 = require("../shell/shell"); // Assuming you have a closeShell function
const utils_1 = require("../utils");
const text_1 = require("../input/text");
async function bootShell(mem) {
    (0, utils_1.clear)();
    console.log("Welcome to tsos v1.0");
    console.log("You need to setup tsos");
    let name = await (0, text_1.input)("Please enter what we should call you: ");
    let host = await (0, text_1.input)("Please enter what we should call the computer: ");
    mem.write("currentPath", "/");
    mem.write("user", name);
    mem.write("host", host);
    (0, shell_1.createShell)(mem);
}
async function boot() {
    let mem = new mem_1.Memory();
    await bootShell(mem);
}
exports.boot = boot;
async function reboot() {
    await (0, shell_1.closeShell)();
    let mem = new mem_1.Memory();
    await bootShell(mem);
}
exports.reboot = reboot;
