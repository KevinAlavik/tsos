import { FileSystem } from './filesystem/fs'; // Update with the actual path to your filesystem module
try {
    const fs = new FileSystem();
    fs.createDirectory('/home');
    fs.createDirectory('/home/user');
    fs.createFile('/home/user/file1.txt', 'Hello, World!');
    fs.createFile('/home/user/file2.txt', 'This is a test.');
    console.log('File Content:', fs.readFile('/home/user/file1.txt'));
    console.log('File Content:', fs.readFile('/home/user/file2.txt'));
    // Uncomment the following lines to test error cases
    fs.createFile('/home/user', 'Invalid file'); // Should throw an error (directory exists with the same name)
    console.log(fs.readFile('/home/user/unknown.txt')); // Should throw an error (file not found)
}
catch (error) {
    console.error('Error:', error.message);
}
