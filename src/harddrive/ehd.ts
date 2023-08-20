import * as fs from 'fs';

interface DiskInfo {
    label: string;
    type: string;
    size: number;
}

interface Disk {
    DiskInfo: DiskInfo;
    Content: Content[];
}

type Content = File | Directory;

interface File {
    type: 'file';
    name: string;
    content: string;
}

interface Directory {
    type: 'directory';
    name: string;
    content: Content[];
}

class EmulatedHardDrive {
    label: string = '';
    type: string = '';
    size: number = 0;
    path: string = '';
    content: Disk | null = null;

    constructor() {
        this.label = '';
        this.type = '';
        this.size = 0;
        this.path = '';
        this.content = null;
    }

    public loadDisk(diskPath: string): Disk | null {
        try {
            const diskContent = fs.readFileSync(diskPath, 'utf-8');
            const diskData = JSON.parse(diskContent) as Disk;

            this.label = diskData.DiskInfo.label;
            this.type = diskData.DiskInfo.type;
            this.size = diskData.DiskInfo.size;
            this.path = diskPath;
            this.content = diskData;

            return diskData;
        } catch (error) {
            console.error('Error loading disk:', error.message);
            return null;
        }
    }

    private updateDiskContent(diskPath: string, content: Disk): void {
        try {
            const updatedDiskContent = JSON.stringify(content, null, 2);
            fs.writeFileSync(diskPath, updatedDiskContent, 'utf-8');
        } catch (error) {
            console.error('Error updating disk content:', error.message);
        }
    }

    
    private writeContent(diskPath: string, sector: number, content: string): void {
        try {
            const diskContent = fs.readFileSync(diskPath, 'utf-8');
            const diskData = JSON.parse(diskContent) as Disk;

            if (sector >= 0 && sector < diskData.DiskInfo.size) {
                diskData.Content[sector] = {
                    type: 'file',
                    name: '',
                    content: content,
                };

                const updatedDiskContent = JSON.stringify(diskData, null, 2);
                fs.writeFileSync(diskPath, updatedDiskContent, 'utf-8');
            } else {
                console.error('Invalid sector:', sector);
            }
        } catch (error) {
            console.error('Error writing content:', error.message);
        }
    }

    public createFile(filePath: string, content: string): void {
        const parts = filePath.split('/');
        const fileName = parts.pop();
        const directoryPath = parts.join('/');

        if (fileName && directoryPath) {
            const diskPath = this.path;
            this.writeContent(diskPath, 0, content); // Assuming sector 0 for simplicity
        } else {
            console.error('Invalid file path:', filePath);
        }
    }

    public createDirectory(directoryPath: string): void {
        const parts = directoryPath.split('/');
        const directoryName = parts.pop();
        const parentPath = parts.join('/');

        if (directoryName && parentPath) {
            if (this.content) {
                const parentDirectory = this.findDirectory(this.content.Content, parentPath);
                if (parentDirectory) {
                    const newDirectory: Directory = {
                        type: 'directory',
                        name: directoryName,
                        content: [],
                    };
                    parentDirectory.content.push(newDirectory);

                    const diskPath = this.path;
                    this.updateDiskContent(diskPath, this.content);
                } else {
                    console.error('Parent directory not found:', parentPath);
                }
            } else {
                console.error('Disk content not loaded.');
            }
        } else {
            console.error('Invalid directory path:', directoryPath);
        }
    }

    private findDirectory(content: Content[], directoryPath: string): Directory | null {
        for (const item of content) {
            if (item.type === 'directory' && item.name === directoryPath) {
                return item;
            } else if (item.type === 'directory' && directoryPath.startsWith(item.name + '/')) {
                const remainingPath = directoryPath.substr(item.name.length + 1);
                return this.findDirectory(item.content, remainingPath);
            }
        }
        return null;
    }
}

export { EmulatedHardDrive, DiskInfo, Content };
