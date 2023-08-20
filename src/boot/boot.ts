import { Memory } from "../memory/mem";
import { createShell, closeShell } from "../shell/shell"; // Assuming you have a closeShell function
import { clear } from "../utils";
import { input } from "../input/text";

async function bootShell(mem: Memory) {
    clear();
    console.log("Welcome to tsos v1.0");
    console.log("You need to setup tsos");
    let name = await input("Please enter what we should call you: ");
    let host = await input("Please enter what we should call the computer: ");
    mem.write("currentPath", "/");
    mem.write("user", name);
    mem.write("host", host);
    createShell(mem);
}

export async function boot() {
    let mem = new Memory();
    await bootShell(mem);
}

export async function reboot() {
    await closeShell();
    let mem = new Memory();
    await bootShell(mem);
}