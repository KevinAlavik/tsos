import { Memory } from "../memory/mem";

export function prompt(mem: Memory) {
    let currentPath = mem.read("currentPath")
    let user = mem.read("user")
    let host = mem.read("host")
    return `${user}@${host} (${currentPath}) $ `
}