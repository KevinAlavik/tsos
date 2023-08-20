import { Memory } from "../memory/mem";
import { clear } from "../utils";
import { closeShell } from "../shell/shell";
import { reboot } from "../boot/boot";

interface Command {
    name: string;
    description: string;
    usage?: string;
    handler: (args: string[], mem: Memory) => void;
}

const commands: Command[] = [
    {
        name: "help",
        description: "Display available commands.",
        handler: () => {
            console.log("Available commands:");
            commands.forEach(cmd => {
                console.log(`- ${cmd.name}: ${cmd.description}`);
                if (cmd.usage) {
                    console.log(`  Usage: ${cmd.usage}`);
                }
            });
        }
    },
    {
        name: "exit",
        description: "Exit tsos.",
        handler: () => {
            console.log("Goodbye!!");
            closeShell()
            process.exit(0);
        }
    },
    {
        name: "clear",
        description: "Clears the screen.",
        handler: () => {
            clear();
        }
    },
    {
        name: "echo",
        description: "Prints the inputed text.",
        usage: "echo [text]",
        handler: (args) => {
            if (args.length > 0) {
                console.log(args.join(" "));
            } else {
                console.log("Usage: echo [text]");
            }
        }
    },
    {
        name: "wm",
        description: "Writes the value to memory.",
        usage: "wm <name> <value>",
        handler: (args, mem) => {
            if (args.length >= 2) {
                const [name, value] = args;
                const update = mem.update(name, value);
                if (!update) {
                    mem.write(name, value);
                    console.log(`Updated memory key "${name}" with value "${value}".`);
                } else {
                    console.log(`Added memory key "${name}" with value "${value}".`);
                }
            } else {
                console.log("Usage: wm <name> <value>");
            }
        }
    },
    {
        name: "lm",
        description: "Dumps memory.",
        handler: (args, mem) => {
            console.log("Memory dump:");
            console.log(mem.dump());
        }
    },
    {
        name: "reboot",
        description: "Reboots the os",
        handler: () => {
            reboot();
        }
    }
];

export function handleCommand(command: string, mem: Memory): void {
    const [commandName, ...args] = command.split(' ');

    const selectedCommand = commands.find(cmd => cmd.name === commandName);
    if (selectedCommand) {
        selectedCommand.handler(args, mem);
    } else if (commandName === '') {

    } else {
        console.log("Unknown command. Type 'help' for available commands.");
    }
}
