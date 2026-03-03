const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\83b1054a-e69e-470b-ad5f-c628d71cfe1f';
const destDir = path.join(__dirname, 'client/src/assets');

fs.copyFileSync(path.join(srcDir, 'media__1772515945702.png'), path.join(destDir, 'milestone-2025mar-1.png'));
fs.copyFileSync(path.join(srcDir, 'media__1772515954300.png'), path.join(destDir, 'milestone-2025mar-2.png'));
fs.copyFileSync(path.join(srcDir, 'media__1772515965468.jpg'), path.join(destDir, 'milestone-2025mar-3.jpg'));
fs.copyFileSync(path.join(srcDir, 'media__1772515976595.png'), path.join(destDir, 'milestone-2025mar-4.png'));
fs.copyFileSync(path.join(srcDir, 'media__1772515985974.png'), path.join(destDir, 'milestone-2025mar-5.png'));

console.log('Successfully copied 2025 milestone images!');
