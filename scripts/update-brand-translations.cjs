const fs = require('fs');
const path = require('path');

const translations = {
    zh: {
        plDesc: "Paralight专注于提供超过500种适用于各类尺寸和应用场景的LED铝型材，提供丰富的颜色、表面处理以及完全可定制的解决方案。",
        mlDesc: "Maglinear Lighting提供尖端的磁吸轨道系统和高性能商业照明解决方案，专为模块化、高精度和现代建筑的卓越设计而打造。"
    },
    vi: {
        plDesc: "Paralight chuyên về hơn 500 cấu hình nhôm LED trên mọi kích thước và kịch bản ứng dụng, cung cấp một loạt các màu sắc, lớp hoàn thiện và các giải pháp có thể tùy chỉnh hoàn toàn.",
        mlDesc: "Maglinear Lighting cung cấp các hệ thống ray từ tính tiên tiến và các giải pháp chiếu sáng thương mại hiệu suất cao được thiết kế cho tính mô-đun, độ chính xác và sự xuất sắc của kiến trúc hiện đại."
    },
    hi: {
        plDesc: "Paralight सभी आकारों और अनुप्रयोग परिदृश्यों में 500 से अधिक एलईडी एल्यूमीनियम प्रोफाइल में माहिर है, जो रंगों, फिनिश और पूरी तरह से अनुकूलन योग्य समाधानों की एक विशाल श्रृंखला प्रदान करता है।",
        mlDesc: "Maglinear Lighting अत्याधुनिक मैग्नेटिक ट्रैक सिस्टम और उच्च-प्रदर्शन वाले वाणिज्यिक प्रकाश समाधान प्रदान करता है जिन्हें मॉड्यूलरिटी, सटीकता और आधुनिक वास्तुशिल्प उत्कृष्टता के लिए डिज़ाइन किया गया है।"
    },
    tr: {
        plDesc: "Paralight, tüm boyut ve uygulama senaryolarında 500'den fazla LED alüminyum profil konusunda uzmanlaşmış olup, geniş bir renk, yüzey kaplaması yelpazesi ve tamamen özelleştirilebilir çözümler sunmaktadır.",
        mlDesc: "Maglinear Lighting, modülerlik, hassasiyet ve modern mimari mükemmellik için tasarlanmış son teknoloji manyetik ray sistemleri ve yüksek performanslı ticari aydınlatma çözümleri sunar."
    },
    de: {
        plDesc: "Paralight ist auf über 500 LED-Aluminiumprofile in allen Größen und für alle Anwendungsszenarien spezialisiert und bietet eine große Auswahl an Farben, Oberflächen und vollständig individualisierbaren Lösungen.",
        mlDesc: "Maglinear Lighting liefert hochmoderne magnetische Stromschienensysteme und leistungsstarke kommerzielle Beleuchtungslösungen, die für Modularität, Präzision und moderne architektonische Exzellenz konzipiert sind."
    },
    ru: {
        plDesc: "Paralight специализируется на более чем 500 алюминиевых профилях для светодиодных лент любых размеров и для любых сценариев применения, предлагая огромный выбор цветов, вариантов отделки и полностью настраиваемых решений.",
        mlDesc: "Maglinear Lighting предлагает передовые магнитные трековые системы и высокопроизводительные коммерческие осветительные решения, разработанные с акцентом на модульность, точность и современное архитектурное совершенство."
    }
};

const localesDir = path.join(__dirname, '../client/src/locales');

for (const [lang, vars] of Object.entries(translations)) {
    const p = path.join(localesDir, `${lang}.json`);
    if (fs.existsSync(p)) {
        const data = JSON.parse(fs.readFileSync(p, 'utf8'));
        if (data.brand) {
            data.brand.plDesc = vars.plDesc;
            data.brand.mlDesc = vars.mlDesc;
            fs.writeFileSync(p, JSON.stringify(data, null, 2));
            console.log(`Updated ${lang}.json`);
        }
    }
}
