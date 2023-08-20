import { input } from "../input/text";
import { prompt } from "./prompt";
import { Memory } from "../memory/mem";
import { handleCommand } from "./handle";

let run: boolean = true; 

export async function createShell(mem: Memory) {
    while (run) {
        let command = input(prompt(mem))
        handleCommand(await command, mem);
    }
}

export function closeShell() {
    run = false
}