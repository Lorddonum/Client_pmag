const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, 'client/src/assets');
const filesToConvert = [
    'milestone-2023jan-1.png',
    'milestone-2023jan-2.png',
    'milestone-2023jan-3.png',
    'milestone-2024jul-1.png',
    'milestone-2024jul-2.png',
    'milestone-2025mar-1.png',
    'milestone-2025mar-2.png',
    'milestone-2025mar-3.jpg',
    'milestone-2025mar-4.png',
    'milestone-2025mar-5.png',
];

async function convert() {
    for (const file of filesToConvert) {
        const inputPath = path.join(dir, file);
        if (!fs.existsSync(inputPath)) {
            console.log(`File not found, skipping: ${inputPath}`);
            continue;
        }
        const ext = path.extname(file);
        const basename = path.basename(file, ext);
        const outputPath = path.join(dir, `${basename}.webp`);

        try {
            await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
            console.log(`Converted ${file} to ${basename}.webp`);
            fs.unlinkSync(inputPath);
            console.log(`Deleted original ${file}`);
        } catch (err) {
            console.error(`Error converting ${file}:`, err);
        }
    }
}

convert();
