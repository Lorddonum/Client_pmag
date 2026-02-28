import sharp from "sharp";
import fs from "fs";
import path from "path";

const ARTIFACT_DIR = "C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\585037ab-12b9-4c03-bd7f-937e711266a1";
const TARGET_DIR = path.join(__dirname, "../client/public/about/shipping");

const files = [
    "media__1772240738787.jpg",
    "media__1772240745258.jpg",
    "media__1772240748433.jpg",
    "media__1772240751056.jpg",
    "media__1772240753204.jpg",
];

if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
}

async function convert() {
    for (let i = 0; i < files.length; i++) {
        const inputPath = path.join(ARTIFACT_DIR, files[i]);
        const outputPath = path.join(TARGET_DIR, `${i + 1}.webp`);

        await sharp(inputPath)
            .webp({ quality: 80 })
            .toFile(outputPath);

        console.log(`Converted ${files[i]} -> shipping/${i + 1}.webp`);
    }
}

convert().catch(console.error);
