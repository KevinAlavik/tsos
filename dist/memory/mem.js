"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Memory = void 0;
class Memory {
    data = {};
    constructor(initialData = {}) {
        this.data = initialData;
    }
    write(name, value) {
        this.data[name] = value;
    }
    read(name) {
        return this.data[name];
    }
    update(name, newValue) {
        if (this.data.hasOwnProperty(name)) {
            this.data[name] = newValue;
            return true;
        }
        else {
            return false;
        }
    }
    dump() {
        console.log(this.data);
    }
}
exports.Memory = Memory;
