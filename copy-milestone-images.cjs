const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\83b1054a-e69e-470b-ad5f-c628d71cfe1f';
const destDir = path.join(__dirname, 'client/src/assets');

fs.copyFileSync(path.join(srcDir, 'media__1772515834175.png'), path.join(destDir, 'milestone-2023jan-1.png'));
fs.copyFileSync(path.join(srcDir, 'media__1772515851419.png'), path.join(destDir, 'milestone-2023jan-2.png'));
fs.copyFileSync(path.join(srcDir, 'media__1772515861393.png'), path.join(destDir, 'milestone-2023jan-3.png'));
fs.copyFileSync(path.join(srcDir, 'media__1772515885258.png'), path.join(destDir, 'milestone-2024jul-1.png'));
fs.copyFileSync(path.join(srcDir, 'media__1772515892507.png'), path.join(destDir, 'milestone-2024jul-2.png'));

console.log('Successfully copied milestone images!');
