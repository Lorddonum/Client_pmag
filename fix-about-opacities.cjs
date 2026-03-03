const fs = require('fs');
const path = require('path');

const aboutPath = path.join(__dirname, 'client/src/pages/About.tsx');
let text = fs.readFileSync(aboutPath, 'utf8');

text = text.replace(/\[0\.08\]/g, '8');
text = text.replace(/\[0\.07\]/g, '7');
text = text.replace(/\[0\.06\]/g, '6');
text = text.replace(/\[0\.05\]/g, '5');
text = text.replace(/\[0\.04\]/g, '4');
text = text.replace(/\[0\.1\]/g, '10');
text = text.replace(/\[0\.15\]/g, '15');

fs.writeFileSync(aboutPath, text);
console.log('Fixed opacities in About.tsx');
