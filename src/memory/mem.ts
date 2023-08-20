export class Memory {
    private data: { [key: string]: any } = {};

    constructor(initialData: { [key: string]: any } = {}) {
        this.data = initialData;
    }

    write(name: string, value: any) {
        this.data[name] = value;
    }

    read(name: string): any {
        return this.data[name];
    }

    update(name: string, newValue: any) {
        if (this.data.hasOwnProperty(name)) {
            this.data[name] = newValue;
            return true;
        } else {
            return false;   
        }
    }

    dump() {
        console.log(this.data)
    }
}
