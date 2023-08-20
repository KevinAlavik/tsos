export function clear() {
    if (process.stdout.isTTY) {
        process.stdout.write('\x1B[2J\x1B[3J\x1B[H'); // ANSI escape codes to clear the terminal
    }
}
