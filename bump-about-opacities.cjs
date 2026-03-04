const fs = require('fs');
const path = require('path');

const aboutPath = path.join(__dirname, 'client/src/pages/About.tsx');
let text = fs.readFileSync(aboutPath, 'utf8');

// Increase opacity of glowing blur orbs
text = text.replace(/bg-\[#00A8E8\]\/7/g, 'bg-[#00A8E8]/20');
text = text.replace(/bg-\[#00A8E8\]\/8/g, 'bg-[#00A8E8]/20');
text = text.replace(/bg-\[#ECAA00\]\/6/g, 'bg-[#ECAA00]/15');
text = text.replace(/bg-\[#ECAA00\]\/7/g, 'bg-[#ECAA00]/15');

// Increase opacity of SVG shapes (text- color for currentColor SVGs)
text = text.replace(/text-\[#00A8E8\]\/8/g, 'text-[#00A8E8]/20');
text = text.replace(/text-\[#00A8E8\]\/6/g, 'text-[#00A8E8]/15');
text = text.replace(/text-\[#ECAA00\]\/6/g, 'text-[#ECAA00]/15');
text = text.replace(/text-\[#ECAA00\]\/10/g, 'text-[#ECAA00]/20');

// Increase border ring opacities
text = text.replace(/border-\[#00A8E8\]\/10/g, 'border-[#00A8E8]/25');
text = text.replace(/border-\[#00A8E8\]\/15/g, 'border-[#00A8E8]/30');
text = text.replace(/border-\[#ECAA00\]\/10/g, 'border-[#ECAA00]/25');
text = text.replace(/border-\[#ECAA00\]\/15/g, 'border-[#ECAA00]/30');

fs.writeFileSync(aboutPath, text);
console.log('Bumped opacities for background elements in About.tsx');
