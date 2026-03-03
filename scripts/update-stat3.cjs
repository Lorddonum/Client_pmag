const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '../client/src/locales');
const newStat3 = {
    en: "Shipments",
    zh: "发货量",
    vi: "Lô hàng",
    hi: "शिपमेंट",
    tr: "Sevkiyat",
    de: "Sendungen",
    ru: "Поставки"
};

for (const [lang, val] of Object.entries(newStat3)) {
    const p = path.join(localesDir, `${lang}.json`);
    if (fs.existsSync(p)) {
        const data = JSON.parse(fs.readFileSync(p, 'utf8'));
        if (data.global) {
            data.global.stat3 = val;
            fs.writeFileSync(p, JSON.stringify(data, null, 2));
        }
    }
}
console.log("Updated global.stat3");
