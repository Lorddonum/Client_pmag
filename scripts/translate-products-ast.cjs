const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, '../client/src/pages/Products.tsx');
let code = fs.readFileSync(target, 'utf8');

if (!code.includes('useTranslation')) {
    code = code.replace(
        /import \{ useState, useMemo, useEffect, useCallback, useRef \} from "react";/,
        'import { useState, useMemo, useEffect, useCallback, useRef } from "react";\nimport { useTranslation } from "react-i18next";'
    );
    code = code.replace(
        'export default function Products() {',
        'export default function Products() {\n  const { t } = useTranslation();'
    );
}

const map = {
    '>Explore Our Collection<': ">{t('products.explore')}<",
    '>Paralight Profiles<': ">{t('products.pl_title')}<",
    '>Maglinear Lighting<': ">{t('products.ml_title')}<",
    '>Premium LED Aluminum Profiles<': ">{t('products.pl_sub')}<",
    '>Magnetic Track Lighting & Commercial Lights Systems<': ">{t('products.ml_sub')}<",
    '>All Products<': ">{t('products.all_products')}<",
    '>Paralight<': ">{t('products.paralight')}<",
    '>Product Catalog<': ">{t('products.catalog')}<",
    '>Find Products<': ">{t('products.find')}<",
    '>All Series<': ">{t('products.all_series')}<",
    '>Hot Selling<': ">{t('products.hot_selling')}<",
    '>Contact Us<': ">{t('products.contact_us')}<",
    '>Need help choosing the right product? Our team is ready to assist you.<': ">{t('products.need_help')}<",
    '>Email<': ">{t('products.email')}<",
    '>Phone / WhatsApp<': ">{t('products.phone')}<",
    '>Back to Catalog<': ">{t('products.back')}<",
    '>Model<': ">{t('products.model')}<",
    '>Category<': ">{t('products.category')}<",
    '>Download PDF<': ">{t('products.download_pdf')}<",
    '>Overview<': ">{t('products.overview')}<",
    '>Specifications<': ">{t('products.specs')}<",
    '>Drawings<': ">{t('products.drawings')}<",
    '>Accessories<': ">{t('products.accessories')}<",
    'title="Click to enlarge"': 'title={t("products.click_enlarge")}',
    '>Packaging Method<': ">{t('products.pkg_method')}<",
    '>Product Description<': ">{t('products.prod_desc')}<",
    '>Key Features<': ">{t('products.key_feat')}<",
    '>Application<': ">{t('products.app')}<",
    '>Material<': ">{t('products.material')}<",
    '>Finish<': ">{t('products.finish')}<",
    '>Color Options<': ">{t('products.color_opt')}<",
    '>Standard Length<': ">{t('products.std_len')}<",
    '>Installation<': ">{t('products.install')}<",
    '>Packaging Information<': ">{t('products.pkg_info')}<",
    '>Method<': ">{t('products.method')}<",
    '>Description<': ">{t('products.descText')}<",
    '>(Additional Fee)<': ">{t('products.add_fee')}<",
    '>Control Integration<': ">{t('products.ctrl_int')}<",
    '>Technical Specifications<': ">{t('products.tech_spec')}<",
    '>Technical Drawings<': ">{t('products.tech_draw')}<",
    '>Technical drawings available upon request<': ">{t('products.avail_req')}<",
    '>Contact us for detailed specifications<': ">{t('products.contact_spec')}<",
    '>Previous<': ">{t('products.prev')}<",
    '>Next<': ">{t('products.next')}<",
    '>Accessories Specification<': ">{t('products.acc_spec')}<",
    '>NO.<': ">{t('products.no')}<",
    '>QTY<': ">{t('products.qty')}<",
    '>Remarks<': ">{t('products.remarks')}<",
    '>Related Products<': ">{t('products.related')}<",
    '>View All<': ">{t('products.view_all')}<",
    '>Frequently Asked Questions<': ">{t('products.faq')}<",
    '>Request Custom Solution<': ">{t('products.req_custom')}<",
    '>Need a Custom Version?<': ">{t('products.need_custom')}<",
    '>We can customize this product to meet your specific requirements. Whether you need different dimensions, finishes, or technical specifications, our engineering team is ready to help.<': ">{t('products.custom_desc')}<",
    '>Email Custom Request<': ">{t('products.email_custom')}<",
    '>Call:<': ">{t('products.call')}<",
    '>Loading products...<': ">{t('products.loading')}<",
    '>No products found<': ">{t('products.no_found')}<",
    '>Try adjusting your filters<': ">{t('products.try_adj')}<",
    '>View Details<': ">{t('products.view_details')}<",
    'placeholder="Search by name or model..."': 'placeholder={t("products.search")}'
};

for (const [k, v] of Object.entries(map)) {
    code = code.split(k).join(v);
}

// Special case for pagination text: Showing X of Y products
code = code.replace(
    />Showing (\{[^}]+\}) of (\{[^}]+\}) products</g,
    ">{t('products.showing')}$1{t('products.of')}$2{t('products.products_l')}<"
);

// For FAQ constant:
code = code.replace(
    /const faqs = \[\s*\{\s*q: "What is the minimum order quantity\?.*\}[\s\S]*?\];/g,
    `const faqs = [
    { q: "products.faq_list.0.q", a: "products.faq_list.0.a" },
    { q: "products.faq_list.1.q", a: "products.faq_list.1.a" },
    { q: "products.faq_list.2.q", a: "products.faq_list.2.a" },
    { q: "products.faq_list.3.q", a: "products.faq_list.3.a" },
    { q: "products.faq_list.4.q", a: "products.faq_list.4.a" },
    { q: "products.faq_list.5.q", a: "products.faq_list.5.a" }
  ];`
);

// Then in the render mapping for faqs, map over it
code = code.replace(
    />\{faq\.q\}</g,
    '>{t(faq.q)}<'
);
code = code.replace(
    />\{faq\.a\}</g,
    '>{t(faq.a)}<'
);

fs.writeFileSync(target, code);
console.log('Done');
