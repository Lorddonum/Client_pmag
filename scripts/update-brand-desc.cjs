const fs = require('fs');
const path = require('path');

const enLocalePath = path.join(__dirname, '../client/src/locales/en.json');
const enData = JSON.parse(fs.readFileSync(enLocalePath, 'utf8'));

enData.brand.plDesc = "Paralight specializes in over 500 LED aluminum profiles across all sizes and application scenarios, offering a vast array of colors, finishes, and fully customizable solutions.";
enData.brand.mlDesc = "Maglinear Lighting delivers cutting-edge magnetic track systems and high-performance commercial lighting solutions designed for modularity, precision, and modern architectural excellence.";

fs.writeFileSync(enLocalePath, JSON.stringify(enData, null, 2));
console.log("Updated brand descriptions in English locale");
