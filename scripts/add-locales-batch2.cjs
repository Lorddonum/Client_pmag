const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '../client/src/locales');

const newTexts = {
    en: {
        products: {
            explore: "Explore Our Collection", pl_title: "Paralight Profiles", ml_title: "Maglinear Lighting",
            pl_sub: "Premium LED Aluminum Profiles", ml_sub: "Magnetic Track Lighting & Commercial Lights Systems",
            all_products: "All Products", paralight: "Paralight", maglinear: "Maglinear Lighting", catalog: "Product Catalog",
            find: "Find Products", search: "Search by name or model...", all_series: "All Series", hot_selling: "Hot Selling",
            contact_us: "Contact Us", need_help: "Need help choosing the right product? Our team is ready to assist you.", email: "Email", phone: "Phone / WhatsApp",
            back: "Back to Catalog", model: "Model", category: "Category", download_pdf: "Download PDF",
            overview: "Overview", specs: "Specifications", drawings: "Drawings", accessories: "Accessories",
            click_enlarge: "Click to enlarge", pkg_method: "Packaging Method", prod_desc: "Product Description", key_feat: "Key Features",
            app: "Application", material: "Material", finish: "Finish", color_opt: "Color Options", std_len: "Standard Length", install: "Installation",
            pkg_info: "Packaging Information", method: "Method", descText: "Description", add_fee: "(Additional Fee)", ctrl_int: "Control Integration",
            tech_spec: "Technical Specifications", tech_draw: "Technical Drawings", avail_req: "Technical drawings available upon request", contact_spec: "Contact us for detailed specifications",
            prev: "Previous", next: "Next", acc_spec: "Accessories Specification", no: "NO.", qty: "QTY", remarks: "Remarks",
            related: "Related Products", view_all: "View All", faq: "Frequently Asked Questions", req_custom: "Request Custom Solution",
            need_custom: "Need a Custom Version?", custom_desc: "We can customize this product to meet your specific requirements. Whether you need different dimensions, finishes, or technical specifications, our engineering team is ready to help.",
            email_custom: "Email Custom Request", call: "Call: ", showing: "Showing ", of: " of ", products_l: " products", page: "Page ", loading: "Loading products...",
            no_found: "No products found", try_adj: "Try adjusting your filters", view_details: "View Details",
            faq_list: [
                { q: "What is the minimum order quantity?", a: "Our minimum order quantity varies by product. For aluminum profiles, the MOQ is typically 100 meters. For magnetic track lighting, the MOQ is 50 units. Please contact us for specific product requirements." },
                { q: "What are the lead times?", a: "Standard lead times are 2-3 weeks for stock items and 4-6 weeks for custom orders. Rush orders may be available upon request with additional fees." },
                { q: "Do you offer custom lengths?", a: "Yes, we offer custom cutting services for aluminum profiles. Please specify your required lengths when placing an order. Custom lengths may affect pricing and lead times." },
                { q: "What warranty do you provide?", a: "All our products come with a 3-year manufacturer warranty covering defects in materials and workmanship. LED components are warranted for 50,000 hours of operation." },
                { q: "How can I request a sample?", a: "Samples are available for evaluation. Please contact our sales team at inquiry@paralight.cc with your requirements. Sample costs may apply but are often credited towards bulk orders." },
                { q: "Do you ship internationally?", a: "Yes, we ship worldwide. Shipping costs and delivery times vary by destination. We work with reliable logistics partners to ensure safe and timely delivery." }
            ]
        },
        downloads: {
            resources: "Resources", dl_center: "Download ", center: "Center", desc: "Access product catalogues, specifications, and technical documentation for our complete range of architectural lighting solutions.",
            total: "Total Catalogues", paralight: "Paralight", maglinear: "Maglinear Lighting",
            search: "Search by name, model number, or series...", series: "Series:", loading: "Loading catalogues…",
            no_found: "No catalogues found", try_adj: "Try adjusting your search terms", check_back: "Check back soon for updates",
            files: "files", file: "file", showing: "Showing ", of: " of ", catalogues: " catalogues", need_custom: "Need a custom specification sheet?"
        },
        contact: {
            lets_connect: "Let's Connect", title1: "Light Up The ", title2: "Future Together", desc: "Whether you're a wholesaler, distributor, or working on a lighting project — our team is here to support you.",
            send_inquiry: "Send an Inquiry", visit_us: "Visit Us", call_us: "Call Us", email_us: "Email Us", get_in_touch: "Get in Touch",
            send_msg1: "Send us a ", send_msg2: "message", your_name: "Your Name *", email_addr: "Email Address *", whatsapp: "Whatsapp / Phone",
            company: "Company Name", country: "Country / Region", message: "Your Message", submit: "Submit Inquiry", prefer_call: "Prefer a Quick Call?",
            avail: "Available Monday - Saturday, 9am - 6pm CST", follow: "Follow Our Journey", hq: "Paralight Group HQ"
        }
    },
    zh: {
        products: {
            explore: "探索我们的系列", pl_title: "Paralight 铝型材", ml_title: "Maglinear 磁吸照明",
            pl_sub: "高端 LED 铝型材", ml_sub: "磁吸轨道照明及商业照明系统",
            all_products: "全部产品", paralight: "Paralight", maglinear: "Maglinear 照明", catalog: "产品目录",
            find: "查找产品", search: "按名称或型号搜索...", all_series: "全部系列", hot_selling: "热销产品",
            contact_us: "联系我们", need_help: "需要帮助选择合适的产品？我们的团队随时为您服务。", email: "邮箱", phone: "电话 / WhatsApp",
            back: "返回目录", model: "型号", category: "类别", download_pdf: "下载 PDF",
            overview: "概览", specs: "规格", drawings: "图纸", accessories: "配件",
            click_enlarge: "点击放大", pkg_method: "包装方式", prod_desc: "产品描述", key_feat: "主要特点",
            app: "应用", material: "材质", finish: "表面处理", color_opt: "颜色选项", std_len: "标准长度", install: "安装方式",
            pkg_info: "包装信息", method: "方式", descText: "描述", add_fee: "(需额外收费)", ctrl_int: "控制集成",
            tech_spec: "技术规格", tech_draw: "技术图纸", avail_req: "技术图纸可按需提供", contact_spec: "请联系我们获取详细规格",
            prev: "上一页", next: "下一页", acc_spec: "配件规格", no: "序号", qty: "数量", remarks: "备注",
            related: "相关产品", view_all: "查看全部", faq: "常见问题", req_custom: "请求定制解决方案",
            need_custom: "需要定制版本？", custom_desc: "我们可以根据您的具体要求定制该产品。无论您需要不同的尺寸、表面处理还是技术规格，我们的工程师团队随时为您提供帮助。",
            email_custom: "通过邮件提交定制需求", call: "致电：", showing: "显示 ", of: " / ", products_l: " 个产品", page: "第 ", loading: "正在加载产品...",
            no_found: "未找到产品", try_adj: "请尝试调整您的过滤条件", view_details: "查看详情",
            faq_list: [
                { q: "最小订购量是多少？", a: "我们的最小起订量因产品而异。铝型材的起订量通常为100米。磁吸轨道灯的起订量为50件。请联系我们获取具体产品的要求。" },
                { q: "交货时间需要多久？", a: "库存产品的标准交货时间为2-3周，定制订单为4-6周。加急订单可根据要求提供，可能会产生额外费用。" },
                { q: "是否提供定制长度？", a: "是的，我们为铝型材提供定制切割服务。请在下订单时说明您需要的长度。定制长度可能会影响定价和交货时间。" },
                { q: "你们提供什么保修？", a: "我们所有的产品均享有3年的制造商保修，涵盖材料和工艺缺陷。LED组件享有长达50,000小时的保修。" },
                { q: "如何索取样品？", a: "可提供评估样品。请通过 inquiry@paralight.cc 与我们的销售团队联系，说明您的需求。可能会收取样品费，但这通常会在批量订单中扣除。" },
                { q: "你们是否提供国际运输？", a: "是的，我们提供全球运送服务。运费和交货时间因目的地而异。我们与可靠的物流合作伙伴合作，确保安全按时交付。" }
            ]
        },
        downloads: {
            resources: "资源中心", dl_center: "下载中心", center: "", desc: "获取我们全系列建筑照明解决方案的产品目录、规格和技术文档。",
            total: "总目录数量", paralight: "Paralight", maglinear: "Maglinear 照明",
            search: "按名称、型号或系列搜索...", series: "系列：", loading: "正在加载目录...",
            no_found: "未找到目录", try_adj: "请尝试调整搜索条件", check_back: "敬请期待更多更新",
            files: "个文件", file: "个文件", showing: "显示 ", of: " / ", catalogues: " 个目录", need_custom: "需要定制规格书？"
        },
        contact: {
            lets_connect: "与我们分享", title1: "携手 ", title2: "点亮未来", desc: "无论您是批发商、分销商还是从事照明项目，我们的团队都会为您提供支持。",
            send_inquiry: "发送询价", visit_us: "欢迎来访", call_us: "致电我们", email_us: "电子邮件", get_in_touch: "联系我们",
            send_msg1: "给我们发送", send_msg2: "消息", your_name: "您的姓名 *", email_addr: "电子邮箱 *", whatsapp: " WhatsApp / 电话",
            company: "公司名称", country: "国家/地区", message: "您的信息", submit: "提交询价", prefer_call: "更倾向于电话沟通？",
            avail: "可用时间：周一至周六，CST 早上9点 - 下午6点", follow: "关注我们的旅程", hq: "Paralight 集团总部"
        }
    },
    vi: {
        products: {
            explore: "Khám phá bộ sưu tập", pl_title: "Thanh nhôm Paralight", ml_title: "Đèn Maglinear",
            pl_sub: "Thanh nhôm LED cao cấp", ml_sub: "Hệ thống chiếu sáng ray từ & Đèn thương mại",
            all_products: "Tất cả sản phẩm", paralight: "Paralight", maglinear: "Đèn Maglinear", catalog: "Danh mục sản phẩm",
            find: "Tìm sản phẩm", search: "Tìm kiếm bằng tên hoặc model...", all_series: "Tất cả các dòng", hot_selling: "Bán chạy",
            contact_us: "Liên hệ", need_help: "Cần trợ giúp chọn sản phẩm? Đội ngũ của chúng tôi sẵn sàng hỗ trợ bạn.", email: "Email", phone: "Điện thoại / WhatsApp",
            back: "Quay lại danh mục", model: "Model", category: "Danh mục", download_pdf: "Tải xuống PDF",
            overview: "Tổng quan", specs: "Thông số kỹ thuật", drawings: "Bản vẽ", accessories: "Phụ kiện",
            click_enlarge: "Nhấn để phóng to", pkg_method: "Phương pháp đóng gói", prod_desc: "Mô tả sản phẩm", key_feat: "Tính năng chính",
            app: "Ứng dụng", material: "Vật liệu", finish: "Bề mặt hoàn thiện", color_opt: "Tùy chọn màu sắc", std_len: "Chiều dài tiêu chuẩn", install: "Lắp đặt",
            pkg_info: "Thông tin đóng gói", method: "Phương pháp", descText: "Mô tả", add_fee: "(Có phí bổ sung)", ctrl_int: "Tích hợp đa điều khiển",
            tech_spec: "Thông số kỹ thuật", tech_draw: "Bản vẽ kỹ thuật", avail_req: "Bản vẽ kỹ thuật có sẵn theo yêu cầu", contact_spec: "Liên hệ để biết thông số kỹ thuật chi tiết",
            prev: "Trước", next: "Tiếp theo", acc_spec: "Thông số phụ kiện", no: "STT", qty: "Số lượng", remarks: "Ghi chú",
            related: "Sản phẩm liên quan", view_all: "Xem tất cả", faq: "Câu hỏi thường gặp", req_custom: "Yêu cầu giải pháp tùy chỉnh",
            need_custom: "Cần phiên bản tùy chỉnh?", custom_desc: "Chúng tôi có thể tùy chỉnh sản phẩm này để đáp ứng các yêu cầu cụ thể của bạn. Cho dù bạn cần kích thước, lớp hoàn thiện hay thông số kỹ thuật khác biệt, đội ngũ kỹ thuật của chúng tôi luôn sẵn sàng trợ giúp.",
            email_custom: "Email yêu cầu tùy chỉnh", call: "Gọi: ", showing: "Đang hiển thị ", of: " / ", products_l: " sản phẩm", page: "Trang ", loading: "Đang tải sản phẩm...",
            no_found: "Không tìm thấy sản phẩm", try_adj: "Vui lòng thử điều chỉnh bộ lọc của bạn", view_details: "Xem chi tiết",
            faq_list: [
                { q: "Số lượng đặt hàng tối thiểu là bao nhiêu?", a: "MOQ dao động tùy theo sản phẩm. Thanh nhôm thông thường là 100m. Đèn ray từ thông thường là 50 chi tiết. Vui lòng liên hệ với chúng tôi để biết chi tiết." },
                { q: "Thời gian giao hàng là bao lâu?", a: "Thời gian giao hàng tiêu chuẩn là 2-3 tuần cho hàng có sẵn và 4-6 tuần cho các đơn đặt hàng tùy chỉnh. Đơn đặt hàng gấp có thể được cung cấp theo yêu cầu với phụ phí." },
                { q: "Có cung cấp độ dài tùy chỉnh không?", a: "Có, chúng tôi cung cấp dịch vụ cắt theo yêu cầu cho thanh nhôm. Vui lòng chỉ định độ dài bạn cần khi đặt hàng. Thay đổi kích thước dài ngắn có thể ảnh hưởng đến giá và thời gian giao." },
                { q: "Thời gian bảo hành là bao lâu?", a: "Tất cả các sản phẩm của chúng tôi đều đi kèm với bảo hành của nhà sản xuất 3 năm đối với các lỗi về vật liệu và công nghệ. Linh kiện LED được bảo hành cho 50.000 giờ hoạt động." },
                { q: "Làm thế nào tôi có thể lấy mẫu thử?", a: "Có mẫu cho thử nghiệm. Vui lòng liên hệ với nhóm bán hàng của chúng tôi tại inquiry@paralight.cc để trình bày các yêu cầu. Chi phí lấy mẫu có thể được tính nhưng thường được trừ vào các đơn đặt hàng số lượng lớn." },
                { q: "Vận chuyển quốc tế?", a: "Có, chúng tôi vận chuyển trên toàn thế giới. Chi phí vận chuyển và thời gian giao hàng thay đổi theo điểm đến. Chúng tôi hợp tác với các đối tác logistics đáng tin cậy để đảm bảo giao hàng an toàn và kịp thời." }
            ]
        },
        downloads: {
            resources: "Tài liệu", dl_center: "Trung tâm ", center: "Tải xuống", desc: "Truy cập catalog sản phẩm, thông số kỹ thuật và tài liệu cho toàn bộ các giải pháp chiếu sáng kiến trúc của chúng tôi.",
            total: "Tổng số catalog", paralight: "Paralight", maglinear: "Đèn Maglinear",
            search: "Tìm kiếm bằng tên, model hoặc bộ sưu tập...", series: "Bộ sưu tập:", loading: "Đang tải danh mục...",
            no_found: "Không tìm thấy danh mục", try_adj: "Hãy thử điều chỉnh bộ lọc tìm kiếm", check_back: "Vui lòng kiểm tra lại sau để cập nhật",
            files: "tệp", file: "tệp", showing: "Hiển thị ", of: " / ", catalogues: " catalog", need_custom: "Cần một bảng thông số tùy chỉnh?"
        },
        contact: {
            lets_connect: "Hãy kết nối", title1: "Cùng nhau Thắp sáng ", title2: "Tương lai", desc: "Cho dù bạn là người bán buôn, nhà phân phối hay đang thực hiện dự án chiếu sáng — nhóm của chúng tôi luôn ở đây để hỗ trợ bạn.",
            send_inquiry: "Gửi Yêu Cầu", visit_us: "Đến Viếng Thăm", call_us: "Gọi Cho Chúng Tôi", email_us: "Gửi Email", get_in_touch: "Giữ Liên Lạc",
            send_msg1: "Gửi chúng tôi ", send_msg2: "tin nhắn", your_name: "Tên Bạn *", email_addr: "Địa chỉ Email *", whatsapp: "Whatsapp / Điện thoại",
            company: "Tên Công Ty", country: "Quốc gia / Khu vực", message: "Tin nhắn của bạn", submit: "Gửi thông tin tham vấn", prefer_call: "Thích Gọi Nhanh Hơn?",
            avail: "Thời gian làm việc Thứ Hai - Thứ Bảy, 9h sáng - 6h tối (Giờ Trung Quốc)", follow: "Theo dõi Hành trình", hq: "Trụ sở Paralight Group"
        }
    },
    hi: {
        products: {
            explore: "हमारा संग्रह एक्सप्लोर करें", pl_title: "Paralight प्रोफाइल", ml_title: "Maglinear लाइटिंग",
            pl_sub: "प्रीमियम LED एल्यूमिनियम प्रोफाइल", ml_sub: "मैग्नेटिक ट्रैक लाइटिंग और कमर्शियल लाइट सिस्टम",
            all_products: "सभी उत्पाद", paralight: "Paralight", maglinear: "Maglinear लाइटिंग", catalog: "उत्पाद कैटलॉग",
            find: "उत्पाद खोजें", search: "नाम या मॉडल द्वारा खोजें...", all_series: "सभी श्रृंखलाएं", hot_selling: "हॉट सेलिंग",
            contact_us: "हमसे संपर्क करें", need_help: "सही उत्पाद चुनने में मदद चाहिए? हमारी टीम आपकी सहायता के लिए तैयार है।", email: "ईमेल", phone: "फ़ोन / WhatsApp",
            back: "कैटलॉग पर वापस लौटें", model: "मॉडल", category: "श्रेणी", download_pdf: "पीडीएफ डाउनलोड करें",
            overview: "अवलोकन", specs: "विनिर्देश", drawings: "चित्र", accessories: "एसेसरीज",
            click_enlarge: "बड़ा करने के लिए क्लिक करें", pkg_method: "पैकेजिंग का तरीका", prod_desc: "उत्पाद विवरण", key_feat: "प्रमुख विशेषताएं",
            app: "अनुप्रयोग", material: "सामग्री", finish: "फिनिश", color_opt: "रंग विकल्प", std_len: "मानक लंबाई", install: "स्थापना",
            pkg_info: "पैकेजिंग जानकारी", method: "तरीका", descText: "विवरण", add_fee: "(अतिरिक्त शुल्क)", ctrl_int: "कंट्रोल इंटीग्रेशन",
            tech_spec: "तकनीकी विनिर्देश", tech_draw: "तकनीकी आरेखण", avail_req: "तकनीकी आरेखण अनुरोध पर उपलब्ध हैं", contact_spec: "विस्तृत विनिर्देशों के लिए हमसे संपर्क करें",
            prev: "पिछला", next: "अगला", acc_spec: "एक्सेसरीज विनिर्देश", no: "नंबर", qty: "मात्रा", remarks: "टिप्पणी",
            related: "संबंधित उत्पाद", view_all: "सभी देखें", faq: "अक्सर पूछे जाने वाले प्रश्न", req_custom: "कस्टम समाधान के लिए अनुरोध करें",
            need_custom: "कस्टम संस्करण चाहिए?", custom_desc: "हम आपकी विशिष्ट आवश्यकताओं को पूरा करने के लिए इस उत्पाद को अनुकूलित कर सकते हैं। चाहे आपको अलग-अलग आयाम, फिनिश या तकनीकी विनिर्देशों की आवश्यकता हो, हमारी इंजीनियरिंग टीम मदद के लिए तैयार है।",
            email_custom: "ईमेल कस्टम अनुरोध", call: "संपर्क करें: ", showing: "दिखाया जा रहा है ", of: " / ", products_l: " उत्पाद", page: "पृष्ठ ", loading: "उत्पाद लोड हो रहे हैं...",
            no_found: "कोई उत्पाद नहीं मिला", try_adj: "अपने फ़िल्टर समायोजित करने का प्रयास करें", view_details: "विवरण देखें",
            faq_list: [
                { q: "न्यूनतम आर्डर की मात्रा क्या है?", a: "हमारी न्यूनतम आदेश मात्रा उत्पाद के अनुसार भिन्न होती है। एल्यूमीनियम प्रोफाइल के लिए, MOQ आमतौर पर 100 मीटर है। मैग्नेटिक ट्रैक लाइटिंग के लिए, MOQ 50 इकाइयाँ है। कृपया विशिष्ट उत्पाद आवश्यकताओं के लिए हमसे संपर्क करें।" },
                { q: "लीड समय क्या हैं?", a: "स्टॉक आइटम के लिए मानक लीड समय 2-3 सप्ताह और कस्टम ऑर्डर के लिए 4-6 सप्ताह है। अतिरिक्त शुल्क के साथ अनुरोध पर तत्काल आदेश उपलब्ध हो सकते हैं।" },
                { q: "क्या आप कस्टम लंबाई प्रदान करते हैं?", a: "हाँ, हम एल्यूमीनियम प्रोफाइल के लिए कस्टम काटने की सेवाएं प्रदान करते हैं। कृपया आदेश देते समय अपनी आवश्यक लंबाई निर्दिष्ट करें। अनुकूलित लंबाई मूल्य निर्धारण और लीड समय को प्रभावित कर सकती है।" },
                { q: "आप क्या वारंटी प्रदान करते हैं?", a: "हमारे सभी उत्पाद सामग्री और कारीगरी में दोषों को कवर करने वाली 3 साल की निर्माता वारंटी के साथ आते हैं। LED कंपोनेंट 50,000 घंटे के संचालन के लिए वारंटीकृत हैं।" },
                { q: "मैं नमूने का अनुरोध कैसे कर सकता हूँ?", a: "मूल्यांकन के लिए नमूने उपलब्ध हैं। अपनी आवश्यकताओं के साथ कृपया inquiry@paralight.cc पर हमारी बिक्री टीम से संपर्क करें। नमूना लागत लागू हो सकती है लेकिन अक्सर थोक आदेशों के लिए श्रेय दिया जाता है।" },
                { q: "क्या आप अंतरराष्ट्रीय स्तर पर शिप करते हैं?", a: "हां, हम दुनिया भर में शिप करते हैं। शिपिंग लागत और वितरण समय गंतव्य के अनुसार भिन्न होते हैं। हम सुरक्षित और समय पर डिलीवरी सुनिश्चित करने के लिए विश्वसनीय रसद भागीदारों के साथ काम करते हैं।" }
            ]
        },
        downloads: {
            resources: "संसाधन", dl_center: "डाउनलोड ", center: "केंद्र", desc: "हमारे स्थापत्य प्रकाश समाधानों की संपूर्ण श्रृंखला के लिए उत्पाद कैटलॉग, विनिर्देश और तकनीकी दस्तावेज़ एक्सेस करें।",
            total: "कुल कैटलॉग", paralight: "Paralight", maglinear: "Maglinear लाइटिंग",
            search: "नाम, मॉडल नंबर या संग्रह से खोजें...", series: "श्रृंखला:", loading: "कैटलॉग लोड हो रहा है...",
            no_found: "कोई कैटलॉग नहीं मिला", try_adj: "अपने खोजशब्दों को समायोजित करने का प्रयास करें", check_back: "अपडेट के लिए जल्द ही वापस जांचें",
            files: "फ़ाइलें", file: "फ़ाइल", showing: "दिखाया जा रहा है ", of: " / ", catalogues: " कैटलॉग", need_custom: "कस्टम विनिर्देश पत्र की आवश्यकता है?"
        },
        contact: {
            lets_connect: "आइए जुड़ें", title1: "एक साथ जगमगाएं ", title2: "भविष्य", desc: "चाहे आप थोक व्यापारी हों, वितरक हों, या प्रकाश परियोजना पर काम कर रहे हों — हमारी टीम आपकी सहायता के लिए यहाँ है।",
            send_inquiry: "पूछताछ भेजें", visit_us: "विज़िट करें", call_us: "हमें कॉल करें", email_us: "हमें ईमेल करें", get_in_touch: "संपर्क में रहें",
            send_msg1: "हमें एक ", send_msg2: "संदेश भेजें", your_name: "आपका नाम *", email_addr: "ईमेल पता *", whatsapp: "Whatsapp / फोन",
            company: "कंपनी का नाम", country: "देश / क्षेत्र", message: "आपका संदेश", submit: "सम्पर्क सबमिट करें", prefer_call: "क्या आप जल्दी कॉल करना पसंद करेंगे?",
            avail: "सोमवार - शनिवार, सुबह 9 - शाम 6 बजे CST (चीन का समय)", follow: "हमे फॉलो करें", hq: "पैरलाइट ग्रुप मुख्यालय"
        }
    },
    tr: {
        products: {
            explore: "Koleksiyonumuzu Keşfedin", pl_title: "Paralight Profilleri", ml_title: "Maglinear Aydınlatma",
            pl_sub: "Özel LED Alüminyum Profilleri", ml_sub: "Manyetik Raylı Aydınlatma ve Ticari Işık Sistemleri",
            all_products: "Tüm Ürünler", paralight: "Paralight", maglinear: "Maglinear Aydınlatma", catalog: "Ürün Kataloğu",
            find: "Ürünleri Bul", search: "Ada veya modele göre arayın...", all_series: "Tüm Seriler", hot_selling: "Çok Satanlar",
            contact_us: "Bize Ulaşın", need_help: "Doğru ürünü seçmede yardıma mı ihtiyacınız var? Ekibimiz size yardımcı olmaya hazır.", email: "E-Posta", phone: "Telefon / WhatsApp",
            back: "Kataloğa Dön", model: "Model", category: "Kategori", download_pdf: "PDF İndir",
            overview: "Genel Bakış", specs: "Özellikler", drawings: "Çizimler", accessories: "Aksesuarlar",
            click_enlarge: "Büyütmek için tıklayın", pkg_method: "Paketleme Yöntemi", prod_desc: "Ürün Açıklaması", key_feat: "Temel Özellikler",
            app: "Uygulama", material: "Malzeme", finish: "Bitiş", color_opt: "Renk Seçenekleri", std_len: "Standart Uzunluk", install: "Kurulum",
            pkg_info: "Paketleme Bilgisi", method: "Yöntem", descText: "Açıklama", add_fee: "(Ek Ücretli)", ctrl_int: "Kontrol Entegrasyonu",
            tech_spec: "Teknik Özellikler", tech_draw: "Teknik Çizimler", avail_req: "Teknik çizimler talep üzerine mevcuttur", contact_spec: "Detaylı özellikler için bize ulaşın",
            prev: "Önceki", next: "Sonraki", acc_spec: "Aksesuar Özellikleri", no: "NO.", qty: "MKT", remarks: "Notlar",
            related: "İlgili Ürünler", view_all: "Tümünü Gör", faq: "Sıkça Sorulan Sorular", req_custom: "Özel Çözüm Talep Et",
            need_custom: "Özel bir versiyona mı ihtiyacınız var?", custom_desc: "Bu ürünü özel gereksinimlerinizi karşılayacak şekilde özelleştirebiliriz. Farklı boyutlara, kaplamalara veya teknik özelliklere ihtiyacınız varsa tasarım ve mühendislik ekibimiz yardıma hazırdır.",
            email_custom: "E-postayla Özel İstek", call: "Arayın: ", showing: "Gösteriliyor ", of: " / ", products_l: " ürün", page: "Sayfa ", loading: "Ürünler yükleniyor...",
            no_found: "Ürün bulunamadı", try_adj: "Filtrelerinizi ayarlamayı deneyin", view_details: "Detayları Gör",
            faq_list: [
                { q: "Minimum sipariş miktarı nedir?", a: "Minimum sipariş miktarımız ürüne göre değişir. Alüminyum profiller için MOQ genellikle 100 metredir. Manyetik raylı aydınlatma için MOQ 50 adettir. Lütfen belirli ürün gereksinimleri için bizimle iletişime geçin." },
                { q: "Teslim süreleri nelerdir?", a: "Stoktaki ürünler için standart teslimat süresi 2-3 hafta ve özel siparişler için 4-6 haftadır. Talep üzerine ek ücret karşılığında acil siparişler mevcuttur." },
                { q: "Özel uzunluklar sunuyor musunuz?", a: "Evet, alüminyum profiller için özel kesim hizmetleri sunuyoruz. Lütfen sipariş verirken istediğiniz uzunlukları belirtin. Özelleştirilmiş uzunluklar fiyatlandırmayı ve teslimat sürelerini etkileyebilir." },
                { q: "Ne tür bir garanti sağlıyorsunuz?", a: "Tüm ürünlerimiz malzeme ve işçilik hatalarına karşı 3 yıllık üretici garantisine sahiptir. LED bileşenleri 50.000 saat çalışma süresi garantilidir." },
                { q: "Nasıl numune talep edebilirim?", a: "Değerlendirme için örnekler mevcuttur. Lütfen inquiry@paralight.cc adresinden satış ekibimizle gereksinimlerinizi paylaşın. Örnek masrafları uygulanabilir ancak genellikle toplu siparişler için kredilendirilir." },
                { q: "Uluslararası gönderim yapıyor musunuz?", a: "Evet, dünya çapında gönderim yapıyoruz. Kargo ücretleri ve teslimat süreleri varış yerine göre değişir. Güvenli ve zamanında teslimatı garanti altına almak için güvenilir lojistik ortaklarıyla birlikte çalışıyoruz." }
            ]
        },
        downloads: {
            resources: "Kaynaklar", dl_center: "İndirme Merkezimiz", center: "", desc: "Mimari aydınlatma çözümlerimiz için ürün kataloglarına, teknik özelliklere ve teknik dokümantasyona erişin.",
            total: "Toplam Katalog", paralight: "Paralight", maglinear: "Maglinear Aydınlatma",
            search: "Ada, modele veya seriye göre ara...", series: "Seri:", loading: "Kataloglar yükleniyor...",
            no_found: "Katalog bulunamadı", try_adj: "Arama terimlerinizi ayarlamayı deneyin", check_back: "Güncellemeler için yakında tekrar kontrol edin",
            files: "dosya", file: "dosya", showing: "Gösteriliyor ", of: " / ", catalogues: " katalog", need_custom: "Özel bir doküman panosuna mı ihtiyacınız var?"
        },
        contact: {
            lets_connect: "Bağlantı Kuralım", title1: "Geleceği Birlikte ", title2: "Aydınlatalım", desc: "İster bir toptancı, distribütör veya aydınlatma projesinde çalışıyor olun — ekibimiz sizi desteklemek için burada.",
            send_inquiry: "Bir Soruşturma Gönder", visit_us: "Bizi Ziyaret Edin", call_us: "Bizi Arayın", email_us: "Bize Ulaşın", get_in_touch: "Temasta Olun",
            send_msg1: "Bize bir ", send_msg2: "mesaj gönderin", your_name: "İsminiz *", email_addr: "E-Posta Adresi *", whatsapp: "Whatsapp / Telefon",
            company: "Şirket İsmi", country: "Ülke / Bölge", message: "Mesajınız", submit: "İletişimi Gönder", prefer_call: "Hızlıca aramayımı tercih edersiniz?",
            avail: "Pazartesi - Cumartesi arası açık, saat 09:00 - 18:00 Çin Saati", follow: "Yolculuğumuzu Takip Edin", hq: "Paralight Grubu Genel Merkezi"
        }
    },
    de: {
        products: {
            explore: "Entdecken Sie unsere Kollektion", pl_title: "Paralight-Profile", ml_title: "Maglinear-Beleuchtung",
            pl_sub: "Erstklassige LED-Aluminiumprofile", ml_sub: "Magnetische Stromschienenbeleuchtung und gewerbliche Beleuchtungssysteme",
            all_products: "Alle Produkte", paralight: "Paralight", maglinear: "Maglinear-Beleuchtung", catalog: "Produktkatalog",
            find: "Produkte finden", search: "Nach Name oder Modell suchen...", all_series: "Alle Serien", hot_selling: "Verkaufsschlager",
            contact_us: "Kontaktiere uns", need_help: "Benötigen Sie Hilfe bei der Auswahl des richtigen Produkts? Unser Team ist bereit, Ihnen zu helfen.", email: "E-Mail", phone: "Telefon / WhatsApp",
            back: "Zurück zum Katalog", model: "Modell", category: "Kategorie", download_pdf: "PDF Herunterladen",
            overview: "Überblick", specs: "Spezifikationen", drawings: "Zeichnungen", accessories: "Zubehör",
            click_enlarge: "Klicken zum Vergrößern", pkg_method: "Verpackungsmethode", prod_desc: "Produktbeschreibung", key_feat: "Hauptmerkmale",
            app: "Anwendung", material: "Material", finish: "Finish", color_opt: "Farboptionen", std_len: "Standardlänge", install: "Installation",
            pkg_info: "Verpackungsinformationen", method: "Methode", descText: "Beschreibung", add_fee: "(Zusatzgebühr)", ctrl_int: "Steuerungsintegration",
            tech_spec: "Technische Spezifikationen", tech_draw: "Technische Zeichnungen", avail_req: "Technische Zeichnungen auf Anfrage erhältlich", contact_spec: "Kontaktieren Sie uns für detaillierte Spezifikationen",
            prev: "Vorherige", next: "Nächste", acc_spec: "Zubehör Spezifikation", no: "NR.", qty: "Menge", remarks: "Bemerkungen",
            related: "Ähnliche Produkte", view_all: "Alle ansehen", faq: "Häufig gestellte Fragen", req_custom: "Kundenspezifische Lösung anfordern",
            need_custom: "Benötigen Sie eine benutzerdefinierte Version?", custom_desc: "Wir können dieses Produkt an Ihre speziellen Anforderungen anpassen. Ob Sie andere Abmessungen, Finishes oder technische Spezifikationen benötigen, unser Engineering-Team ist bereit, Ihnen zu helfen.",
            email_custom: "E-Mail für Sonderanfertigung", call: "Anrufen: ", showing: "Zeigt ", of: " von ", products_l: " Produkte", page: "Seite ", loading: "Produkte werden geladen...",
            no_found: "Keine Produkte gefunden", try_adj: "Versuchen Sie, Ihre Filter anzupassen", view_details: "Details ansehen",
            faq_list: [
                { q: "Was ist die Mindestbestellmenge?", a: "Unsere Mindestbestellmenge variiert je nach Produkt. Für Aluminiumprofile beträgt das MOQ in der Regel 100 Meter. Für magnetische Stromschienenbeleuchtungen beträgt das MOQ 50 Einheiten. Bitte kontaktieren Sie uns für spezifische Produktanforderungen." },
                { q: "Wie lang sind die Lieferzeiten?", a: "Die Standardlieferzeiten betragen 2-3 Wochen für vorrätige Artikel und 4-6 Wochen für Sonderbestellungen. Eilbestellungen können auf Anfrage gegen Aufpreis möglich sein." },
                { q: "Bieten Sie benutzerdefinierte Längen an?", a: "Ja, wir bieten massgeschneiderte Zuschnittservices für Aluminiumprofile an. Bitte geben Sie bei der Bestellung Ihre gewünschte Länge an. Massgeschneiderte Längen können Preise und Lieferzeiten beeinflussen." },
                { q: "Welche Garantie bieten Sie an?", a: "Auf alle unsere Produkte gewähren wir eine dreijährige Herstellergarantie, die Material- und Verarbeitungsfehler abdeckt. Auf LED-Komponenten wird eine Garantie für 50.000 Betriebsstunden gewährt." },
                { q: "Wie kann ich ein Muster anfordern?", a: "Muster sind zur Bewertung verfügbar. Bitte kontaktieren Sie unser Vertriebsteam unter inquiry@paralight.cc mit Ihren Anforderungen. Musterkosten können anfallen, diese werden jedoch häufig auf Grossbestellungen gutgeschrieben." },
                { q: "Versenden Sie international?", a: "Ja, wir liefern weltweit. Die Versandkosten und die Lieferzeit hängen vom Bestimmungsort ab. Wir arbeiten mit zuverlässigen Logistikpartnern zusammen, um eine sichere und pünktliche Lieferung zu gewährleisten." }
            ]
        },
        downloads: {
            resources: "Ressourcen", dl_center: "Download-", center: "zentrum", desc: "Greifen Sie auf Produktkataloge, Spezifikationen und technische Dokumentationen für unser gesamtes Sortiment an architektonischen Beleuchtungslösungen zu.",
            total: "Gesamtkataloge", paralight: "Paralight", maglinear: "Maglinear-Beleuchtung",
            search: "Nach Name, Modellnummer oder Serie suchen...", series: "Serien:", loading: "Kataloge werden geladen...",
            no_found: "Keine Kataloge gefunden", try_adj: "Versuchen Sie Ihre Suchbegriffe anzupassen", check_back: "Schauen Sie bald wieder nach Updates",
            files: "Dateien", file: "Datei", showing: "Zeigt ", of: " von ", catalogues: " Kataloge", need_custom: "Benötigen Sie ein benutzerdefiniertes Spezifikationsblatt?"
        },
        contact: {
            lets_connect: "Lassen Sie uns verbinden", title1: "Lass uns die ", title2: "Zukunft zusammen beleuchten", desc: "Egal, ob Sie Großhändler, Händler sind oder an einem Beleuchtungsprojekt arbeiten – unser Team ist da, um Sie zu unterstützen.",
            send_inquiry: "Eine Anfrage senden", visit_us: "Besuchen Sie uns", call_us: "Rufen Sie uns an", email_us: "Senden Sie uns eine E-Mail", get_in_touch: "Komm in Kontakt",
            send_msg1: "Sende uns eine ", send_msg2: "Nachricht", your_name: "Dein Name *", email_addr: "E-Mail Address *", whatsapp: "Whatsapp / Telefon",
            company: "Name der Firma", country: "Land / Region", message: "Deine Nachricht", submit: "Anfrage Absenden", prefer_call: "Bevorzugen Sie einen kurzen Anruf?",
            avail: "Verfügbar von Montag - Samstag, 9:00 - 18:00 Uhr CST (Chinesische Zeit)", follow: "Verfolge unsere Reise", hq: "Hauptsitz der Paralight Group"
        }
    },
    ru: {
        products: {
            explore: "Изучите нашу коллекцию", pl_title: "Профили Paralight", ml_title: "Освещение Maglinear",
            pl_sub: "Алюминиевые светодиодные профили премиум-класса", ml_sub: "Магнитное трековое освещение и коммерческие осветительные системы",
            all_products: "Все продукты", paralight: "Paralight", maglinear: "Освещение Maglinear", catalog: "Каталог продукции",
            find: "Найти продукты", search: "Поиск по названию или модели...", all_series: "Все серии", hot_selling: "Горячие предложения",
            contact_us: "Связаться с нами", need_help: "Нужна помощь в выборе нужного продукта? Наша команда готова помочь вам.", email: "Эл. Почта", phone: "Телефон / WhatsApp",
            back: "Вернуться в каталог", model: "Модель", category: "Категория", download_pdf: "Скачать PDF",
            overview: "Обзор", specs: "Технические характеристики", drawings: "Чертежи", accessories: "Аксессуары",
            click_enlarge: "Нажмите, чтобы увеличить", pkg_method: "Способ упаковки", prod_desc: "Описание продукта", key_feat: "Ключевые особенности",
            app: "Применение", material: "Материал", finish: "Отделка", color_opt: "Варианты цвета", std_len: "Стандартная длина", install: "Монтаж",
            pkg_info: "Информация об упаковке", method: "Способ", descText: "Описание", add_fee: "(Дополнительная плата)", ctrl_int: "Интеграция управления",
            tech_spec: "Технические характеристики", tech_draw: "Технические чертежи", avail_req: "Технические чертежи предоставляются по запросу", contact_spec: "Свяжитесь с нами для получения подробных спецификаций",
            prev: "Назад", next: "Вперед", acc_spec: "Спецификация аксессуаров", no: "№", qty: "Кол-во", remarks: "Примечания",
            related: "Сопутствующие товары", view_all: "Смотреть все", faq: "Часто задаваемые вопросы", req_custom: "Запросить индивидуальное решение",
            need_custom: "Вам нужна кастомизированная версия?", custom_desc: "Мы можем настроить этот продукт в соответствии с вашими конкретными требованиями. Если вам нужны другие размеры, отделка или технические характеристики, наша команда инженеров готова помочь.",
            email_custom: "Эл. письмо запрос на заказ", call: "Звоните: ", showing: "Показано ", of: " из ", products_l: " продуктов", page: "Страница ", loading: "Загрузка продуктов...",
            no_found: "Товары не найдены", try_adj: "Попробуйте настроить фильтры", view_details: "Смотреть детали",
            faq_list: [
                { q: "Каков минимальный объем заказа?", a: "Наше минимальное количество заказа зависит от продукта. Для алюминиевых профилей MOQ обычно составляет 100 метров. Для магнитного трекового освещения MOQ составляет 50 единиц. Пожалуйста, свяжитесь с нами для получения информации о конкретных требованиях к продукции." },
                { q: "Каковы сроки выполнения заказа?", a: "Стандартные сроки выполнения заказов составляют 2–3 недели для товаров на складе и 4–6 недель для индивидуальных заказов. Срочные заказы могут быть доступны по запросу за дополнительную плату." },
                { q: "Вы предлагаете нестандартную длину?", a: "Да, мы предлагаем услуги резки на заказ для алюминиевого профиля. При оформлении заказа укажите требуемую длину. Индивидуальная длина может повлиять на цены и время выполнения заказа." },
                { q: "Какую гарантию вы предоставляете?", a: "На всю нашу продукцию распространяется 3-летняя гарантия производителя на дефекты материалов и изготовления. Гарантия на светодиодные компоненты составляет 50 000 часов работы." },
                { q: "Как мне запросить образец?", a: "Для ознакомления доступны образцы. Пожалуйста, свяжитесь с нашим отделом продаж по адресу inquiry@paralight.cc с вашими требованиями. Плата за образцы может взиматься, но она часто зачисляется для оптовых заказов." },
                { q: "Вы отправляете продукцию за границу?", a: "Да, мы отправляем во все страны мира. Стоимость доставки и время в пути зависят от пункта назначения. Мы сотрудничаем с надежными логистическими партнерами для обеспечения безопасной и своевременной доставки." }
            ]
        },
        downloads: {
            resources: "Ресурсы", dl_center: "Центр ", center: "Загрузок", desc: "Получите доступ к каталогам продукции, спецификациям и технической документации по нашему полному спектру решений для архитектурного освещения.",
            total: "Всего каталогов", paralight: "Paralight", maglinear: "Освещение Maglinear",
            search: "Поиск по названию, модели или серии...", series: "Серия:", loading: "Загрузка каталогов...",
            no_found: "Каталоги не найдены", try_adj: "Попробуйте настроить условия поиска", check_back: "Зайдите попозже, будут обновления",
            files: "файл(ов)", file: "файл", showing: "Показано ", of: " из ", catalogues: " каталогов", need_custom: "Нужен индивидуальный лист спецификации?"
        },
        contact: {
            lets_connect: "Давайте свяжемся", title1: "Осветим Будущее ", title2: "Вместе", desc: "Независимо от того, являетесь ли вы оптовиком, дистрибьютором или работаете над проектом освещения — наша команда всегда готова поддержать вас.",
            send_inquiry: "Отправить запрос", visit_us: "Посетите Нас", call_us: "Позвоните Нам", email_us: "Напишите Нам", get_in_touch: "Свяжитесь с Нами",
            send_msg1: "Отправьте нам ", send_msg2: "сообщение", your_name: "Ваше имя *", email_addr: "Эл. Почта *", whatsapp: "Whatsapp / Телефон",
            company: "Название компании", country: "Страна / Регион", message: "Ваше сообщение", submit: "Отправить Запрос", prefer_call: "Предпочитаете быстрый звонок?",
            avail: "Доступно с понедельника по субботу, с 9 до 18 часов (китайское время)", follow: "Следите За Нами", hq: "Штаб-квартира Paralight Group"
        }
    }
};

Object.entries(newTexts).forEach(([lang, data]) => {
    const p = path.join(localesDir, `${lang}.json`);
    if (fs.existsSync(p)) {
        const existing = JSON.parse(fs.readFileSync(p, 'utf8'));
        existing.products = data.products;
        existing.downloads = data.downloads;
        existing.contact = data.contact;
        fs.writeFileSync(p, JSON.stringify(existing, null, 2));
    }
});
console.log("Locales updated successfully!");
