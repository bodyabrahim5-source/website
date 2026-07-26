// 1. Dynamic Price Display & Service Selection Logic
document.addEventListener('DOMContentLoaded', () => {
    const serviceSelect = document.getElementById('serviceType');
    const priceDisplay = document.getElementById('priceDisplay');
    const priceAmount = document.getElementById('priceAmount');

    if (serviceSelect) {
        serviceSelect.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            const price = selectedOption.dataset.price;

            if (price && price !== "0") {
                priceAmount.textContent = `${price} EGP`;
                priceDisplay.style.display = 'block';
            } else if (price === "0") {
                priceAmount.textContent = "حسب الاتفاق / Negotiable";
                priceDisplay.style.display = 'block';
            } else {
                priceDisplay.style.display = 'none';
            }
        });
    }
});

// 2. Updated WhatsApp Form Submission
const whatsappForm = document.getElementById('whatsappForm');
if (whatsappForm) {
    whatsappForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('clientName').value;
        const email = document.getElementById('clientEmail').value;
        const serviceSelect = document.getElementById('serviceType');
        const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
        const serviceName = selectedOption.text;
        const price = selectedOption.dataset.price ? (selectedOption.dataset.price === "0" ? "حسب الاتفاق" : selectedOption.dataset.price + " جنيه") : "غير محدد";
        const details = document.getElementById('projectDetails').value;

        const phoneNumber = "201091822235"; // WhatsApp Receiving Number
        const cashNumber = "01141702187";   // Etisalat Cash Number

        const message = `السلام عليكم يا عبد الرحمن،%0A%0A` +
                        `*اسم العميل:* ${encodeURIComponent(name)}%0A` +
                        `*الإيميل:* ${encodeURIComponent(email)}%0A` +
                        `*الخدمة المطلوبة:* ${encodeURIComponent(serviceName)}%0A` +
                        `*تكلفة الباقة:* ${encodeURIComponent(price)}%0A` +
                        `*رقم تحويل إتصالات كاش للتأكيد:* ${cashNumber}%0A%0A` +
                        `*تفاصيل المشروع:*%0A${encodeURIComponent(details)}`;

        const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappURL, '_blank');
    });
}

// 3. Typing Animation Effect
const typingText = document.getElementById('typing-text');
const roles = [
    "IT & Network Engineer", 
    "Web Developer", 
    "Python & Automation Dev", 
    "POS Systems Creator"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingText) return;
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}

document.addEventListener('DOMContentLoaded', typeEffect);

// 4. Dark / Light Theme Toggle
const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        themeToggleBtn.innerHTML = isLight ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    });
}

// 5. Projects Filtering & Live Search Logic
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const searchInput = document.getElementById('projectSearch');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterProjects();
    });
});

if (searchInput) {
    searchInput.addEventListener('input', filterProjects);
}

function filterProjects() {
    const activeFilterBtn = document.querySelector('.filter-btn.active');
    const activeFilter = activeFilterBtn ? activeFilterBtn.dataset.filter : 'all';
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';

    projectCards.forEach(card => {
        const category = card.dataset.category;
        const title = card.querySelector('h3') ? card.querySelector('h3').textContent.toLowerCase() : '';
        const desc = card.querySelector('p') ? card.querySelector('p').textContent.toLowerCase() : '';

        const matchesFilter = (activeFilter === 'all' || category === activeFilter);
        const matchesSearch = title.includes(searchTerm) || desc.includes(searchTerm);

        if (matchesFilter && matchesSearch) {
            card.classList.remove('hide');
        } else {
            card.classList.add('hide');
        }
    });
}

// 6. Fast Scroll Reveal Animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;

    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 80) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// 7. Details Modal Popup
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const closeModal = document.querySelector('.close-modal');

document.querySelectorAll('.modal-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
        if (modalTitle && modalDesc && modal) {
            modalTitle.textContent = btn.dataset.title;
            modalDesc.textContent = btn.dataset.desc;
            modal.style.display = 'flex';
        }
    });
});

if (closeModal) {
    closeModal.addEventListener('click', () => { modal.style.display = 'none'; });
}

// 8. Code Viewer Modal Logic
const codeModal = document.getElementById('codeModal');
const codeViewerText = document.getElementById('codeViewerText');
const codeFileName = document.getElementById('codeFileName');
const closeCodeModal = document.querySelector('.close-code-modal');
const copyCodeBtn = document.getElementById('copyCodeBtn');

const sampleCodes = {
    scanner: `# Network Diagnostic & Port Scanner Tool
import socket
import sys

def scan_target(host, ports=[80, 443, 22, 21, 8080]):
    print(f"[*] Starting diagnostic scan on: {host}")
    try:
        ip = socket.gethostbyname(host)
        print(f"[+] Resolved IP: {ip}\\n" + "-"*30)
        
        for port in ports:
            sock = socket.socket(socket.AF_INET, socket.STREAM_STREAM)
            sock.settimeout(1.0)
            result = sock.connect_ex((ip, port))
            if result == 0:
                print(f"[OPEN] Port {port}: Active Service")
            else:
                print(f"[CLOSED] Port {port}")
            sock.close()
    except socket.gaierror:
        print("[!] Hostname could not be resolved.")

if __name__ == "__main__":
    scan_target("127.0.0.1")`,

    gym: `# Gym & POS Management System Logic (Read Only Showcase)
import datetime

class GymSystem:
    def __init__(self):
        self.members = {}
        self.sales = []

    def register_member(self, member_id, name, plan_days):
        expiry = datetime.date.today() + datetime.timedelta(days=plan_days)
        self.members[member_id] = {"name": name, "expiry": expiry}
        print(f"[+] Member '{name}' registered until {expiry}")

    def record_sale(self, item, price):
        self.sales.append({"item": item, "price": price, "date": datetime.datetime.now()})
        print(f"[+] Sale recorded: {item} - \${price}")

# System Initialization Demo
gym = GymSystem()
gym.register_member(101, "Member Example", 30)
gym.record_sale("Protein Shake", 15.0)`,

    automation: `# Automation & Network Monitor Tool
import os
import platform
import subprocess

def check_system_latency(host="8.8.8.8"):
    param = "-n" if platform.system().lower() == "windows" else "-c"
    command = ["ping", param, "1", host]
    
    res = subprocess.run(command, capture_output=True, text=True)
    if res.returncode == 0:
        print(f"[SUCCESS] Host {host} is reachable.")
    else:
        print(f"[ALERT] Host {host} is down!")

if __name__ == "__main__":
    print("[*] Starting System Diagnostic Script...")
    check_system_latency()`
};

document.querySelectorAll('.view-code-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const projectKey = btn.dataset.project;
        if (sampleCodes[projectKey]) {
            codeViewerText.textContent = sampleCodes[projectKey];
            
            if (projectKey === 'scanner') {
                codeFileName.innerHTML = '<i class="fa-brands fa-python"></i> network_scanner.py';
            } else if (projectKey === 'gym') {
                codeFileName.innerHTML = '<i class="fa-brands fa-python"></i> gym_pos_system.py';
            } else {
                codeFileName.innerHTML = '<i class="fa-brands fa-python"></i> network_monitor.py';
            }
            
            codeModal.style.display = 'flex';
        }
    });
});

if (closeCodeModal) {
    closeCodeModal.addEventListener('click', () => { codeModal.style.display = 'none'; });
}

if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(codeViewerText.textContent);
        copyCodeBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        setTimeout(() => {
            copyCodeBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy Code';
        }, 2000);
    });
}

// Close Modals on background click
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
    if (e.target === codeModal) codeModal.style.display = 'none';
});

// ==========================================
// 9. Advanced Interactive CLI Terminal Logic
// ==========================================
const terminalInput = document.getElementById('terminalInput');
const terminalOutput = document.getElementById('terminalOutput');

let commandHistory = [];
let historyIndex = -1;

const commands = {
    help: `
<span style="color:#58a6ff; font-weight:bold;">Available Commands:</span><br>
- <span class="highlight">whoami</span>       : Display current user role<br>
- <span class="highlight">skills</span>       : List technical skills & tools<br>
- <span class="highlight">cat about.txt</span>: Display quick biography<br>
- <span class="highlight">projects</span>     : Show top projects list<br>
- <span class="highlight">ipconfig</span>     : Display simulated network interfaces<br>
- <span class="highlight">contact</span>      : Quick link to WhatsApp<br>
- <span class="highlight">date</span>         : Show current system date & time<br>
- <span class="highlight">clear</span>        : Clear the console screen
    `,
    
    whoami: `<span style="color:#27c93f;">guest@portfolio</span> (Guest User - Viewing Abdelrahman's Portfolio)`,
    
    "cat about.txt": `<span style="color:#ffbd2e;">[BIO]</span> Abdelrahman is an IT & Network Engineer specializing in network security, system automation with Python, and web/POS applications.`,
    
    skills: `
<span style="color:#58a6ff;">[+] IT Infrastructure:</span> Networking, Subnetting, CLI, Router Configuration<br>
<span style="color:#58a6ff;">[+] Web Development:</span> HTML5, CSS3, JavaScript (DOM, Dynamic Systems)<br>
<span style="color:#58a6ff;">[+] Python Solutions:</span> Desktop POS Systems, Automation Tools, Network Utilities
    `,
    
    projects: `
1. <span style="color:#58a6ff;">Interactive Birthday Web App</span> - [Live Demo Available]<br>
2. <span style="color:#58a6ff;">Tahabeesh Restaurant Web App</span> - [Live Demo Available]<br>
3. <span style="color:#58a6ff;">Gym & POS Management Logic</span> - [Read Only Showcase]<br>
4. <span style="color:#58a6ff;">The Grand Lounge POS</span> - [Desktop System Showcase]<br>
5. <span style="color:#58a6ff;">Network Diagnostics & Port Scanner</span> - [Python Script]
    `,
    
    ipconfig: `
eth0: flags=4163&lt;UP,BROADCAST,RUNNING,MULTICAST&gt;  mtu 1500<br>
inet <span style="color:#58a6ff;">192.168.1.105</span>  netmask 255.255.255.0  broadcast 192.168.1.255<br>
gateway <span style="color:#ffbd2e;">192.168.1.1</span><br>
Status: <span style="color:#27c93f; font-weight:bold;">Active / Connected</span>
    `,
    
    sudo: `<span style="color:#ff5f56;">[Permission Denied]</span> Guest users do not have root access!`,
    
    date: () => new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'medium' }),
    
    contact: `Redirecting to WhatsApp... <a href="https://wa.me/201091822235" target="_blank" style="color:#58a6ff; text-decoration:underline;">Click Here to Chat</a>`
};

if (terminalInput) {
    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex--;
                this.value = commandHistory[historyIndex];
            }
            return;
        } else if (e.key === 'ArrowDown') {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                this.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                this.value = '';
            }
            return;
        }

        if (e.key === 'Enter') {
            const inputVal = this.value.trim();
            const lowerInput = inputVal.toLowerCase();
            this.value = '';

            if (inputVal === '') return;

            commandHistory.push(inputVal);
            historyIndex = commandHistory.length;

            const cmdLine = document.createElement('div');
            cmdLine.className = 'term-line';
            cmdLine.innerHTML = `<span style="color:#58a6ff; font-weight:bold;">guest@abdelrahman:~$</span> ${inputVal}`;
            terminalOutput.appendChild(cmdLine);

            const resLine = document.createElement('div');
            resLine.className = 'term-line';

            if (lowerInput === 'clear') {
                terminalOutput.innerHTML = '';
                return;
            } else if (commands[lowerInput]) {
                const response = commands[lowerInput];
                resLine.innerHTML = typeof response === 'function' ? response() : response;
                
                if (lowerInput === 'contact') {
                    window.open('https://wa.me/201091822235', '_blank');
                }
            } else {
                resLine.innerHTML = `<span style="color:#ff5f56;">Command not found: '${inputVal}'.</span> Type '<span class="highlight">help</span>' to see valid commands.`;
            }

            terminalOutput.appendChild(resLine);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    });
}

// ==========================================
// 10. Copy Etisalat Cash Number & Toast Logic
// ==========================================

function showToast(message) {
    let toast = document.getElementById('toastNotification');
    
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toastNotification';
        toast.className = 'toast-notification';
        toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span id="toastMessage"></span>`;
        document.body.appendChild(toast);
    }

    const toastMessage = document.getElementById('toastMessage') || toast.querySelector('span');
    toastMessage.textContent = message;

    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function copyCashNumber() {
    const cashNum = "01141702187";
    navigator.clipboard.writeText(cashNum).then(() => {
        showToast("تم نسخ رقم إتصالات كاش بنجاح!");
    }).catch(() => {
        showToast("حدث خطأ أثناء نسخ الرقم.");
    });
}

// ==========================================
// 11. Multi-language Translation Engine (i18n)
// ==========================================
const translations = {
    en: {
        nav_services: "Services",
        nav_about: "About",
        nav_projects: "Projects",
        nav_terminal: "Terminal",
        nav_contact: "Contact",
        hero_hello: "Hello, I'm Abdelrahman",
        hero_sub: "Building secure networks, custom systems & responsive websites",
        hero_btn: "View My Work",
        services_title: "My Expertise",
        srv1_title: "IT & Networking Infrastructure",
        srv1_desc: "Managing network configurations, system diagnostics, troubleshooting, and infrastructure security.",
        srv2_title: "Web Development",
        srv2_desc: "Designing and building modern, responsive websites using HTML5, CSS3, and JavaScript.",
        srv3_title: "Python & POS Systems",
        srv3_desc: "Developing powerful Python automation tools, custom scripts, and desktop POS cashier systems (Read Only / Showcase).",
        about_title: "About Me & Skills",
        about_heading: "Engineering reliable IT networks & intelligent software solutions",
        about_text: "I am a computer engineer specializing in IT support, network administration, Python scripting, and full-featured desktop & web applications.",
        skill_net: "IT Infrastructure & Networking",
        skill_python: "Python & System Automation",
        projects_title: "My Featured Projects",
        search_ph: "Search projects by title or keyword...",
        filter_all: "All",
        filter_net: "IT & Networking",
        filter_web: "Web Development",
        filter_python: "Python & Systems",
        p1_title: "Interactive Birthday Website",
        p1_desc: "Custom digital birthday celebration web app with interactive visuals, multimedia, and personalized gift presentation.",
        p2_title: "Tahabeesh Restaurant",
        p2_desc: "Interactive web application for Tahabeesh Restaurant featuring digital menus and modern responsive user interface.",
        p3_title: "Gym & POS Management System",
        p3_desc: "Comprehensive offline-capable gym membership, subscriber tracking, and sales cashier system logic showcase.",
        p4_title: "The Grand Lounge POS",
        p4_desc: "Full desktop management system designed for cafes and lounge cashier management, order tracking, and sales reporting.",
        p5_title: "Network Diagnostics & Port Scanner",
        p5_desc: "Multi-threaded network utility tool written in Python for port scanning, latency monitoring, and subnet discovery.",
        p6_title: "System Monitoring & Automation",
        p6_desc: "Custom Python script built for automated system monitoring, data processing, and local network management tasks.",
        btn_demo: "Live Demo",
        btn_details: "Details",
        btn_logic: "View Logic",
        btn_code: "View Code",
        term_title: "Interactive CLI Console",
        contact_title: "Get In Touch & Order Service",
        ph_name: "Your Name",
        ph_email: "Your Email",
        opt_select: "Select Needed Service / الخدمة المطلوبة",
        opt_bday: "Interactive Birthday Website (موقع عيد ميلاد تفاعلي)",
        opt_web: "Custom Web Development (تصميم موقع ويب مخصص)",
        opt_pos: "Gym & POS System (سيستم كاشير وإدارة الجيم)",
        opt_auto: "Python Automation & Networking (حلول أتمتة وشبكات)",
        opt_custom: "Custom Project / Other (مشروع آخر - حسب الاتفاق)",
        cost_label: "Selected Package Cost:",
        cash_title: "Payment Method (Etisalat Cash):",
        cash_desc: "To confirm your package, send the deposit or full amount to:",
        cash_note: "* After transferring, click below to confirm your order via WhatsApp.",
        ph_desc: "Describe the project or work you need...",
        btn_submit: "Confirm Order via WhatsApp",
        toast_success: "Operation Completed Successfully!"
    },
    ar: {
        nav_services: "الخدمات",
        nav_about: "من أنا",
        nav_projects: "المشاريع",
        nav_terminal: "الترمنال",
        nav_contact: "تواصل معي",
        hero_hello: "أهلاً، أنا عبدالرحمن",
        hero_sub: "بناء شبكات آمنة، أنظمة مخصصة ومواقع ويب متجاوبة",
        hero_btn: "استعرض أعمالي",
        services_title: "مجالات خبرتي",
        srv1_title: "البنية التحتية والشبكات (IT)",
        srv1_desc: "إدارة إعدادات الشبكات، تشخيص الأعطال، والحفاظ على أمان البنية التحتية.",
        srv2_title: "تطوير الويب (Web Dev)",
        srv2_desc: "تصميم وبناء مواقع عصرية ومتجاوبة بأحدث تقنيات HTML5, CSS3, JavaScript.",
        srv3_title: "أنظمة بايثون والكاشير (POS)",
        srv3_desc: "تطوير أدوات أتمتة ببايثون، سكربتات خاصة، وأنظمة إدارة الكاشير والمبيعات.",
        about_title: "نبذة عني والمهارات",
        about_heading: "هندسة شبكات موثوقة وحلول برمجية ذكية",
        about_text: "مهندس حاسبات متخصص في الدعم الفني، إدارة الشبكات، أتمتة السكربتات ببايثون، وبناء تطبيقات الويب والسطح المكتب.",
        skill_net: "البنية التحتية والشبكات",
        skill_python: "بايثون وأتمتة الأنظمة",
        projects_title: "أبرز المشاريع",
        search_ph: "ابحث عن مشروع باسمه أو بكلمة مفتاحية...",
        filter_all: "الكل",
        filter_net: "الشبكات والـ IT",
        filter_web: "تطوير الويب",
        filter_python: "بايثون والأنظمة",
        p1_title: "موقع عيد ميلاد تفاعلي",
        p1_desc: "تطبيق ويب تفاعلي لإهداء المعايدات الرقمية مع مؤثرات وصوتيات وعرض الهدايا.",
        p2_title: "موقع مطعم طحابيش",
        p2_desc: "تطبيق ويب تفاعلي لمطعم طحابيش يعرض قائمة المأكولات الرقمية بجهة حديثة.",
        p3_title: "سيستم إدارة الجيم والكاشير",
        p3_desc: "عرض لمنطق سيستم إدارة الاشتراكات والمبيعات للجيم ويعمل بدون إنترنت.",
        p4_title: "سيستم كاشير The Grand Lounge",
        p4_desc: "نظام إدارة سطح مكتب مخصص للجميع والكافيهات لمتابعة الطاولات والمبيعات.",
        p5_title: "أداة فحص الشبكات والأبواب",
        p5_desc: "أداة متقدمة ببايثون لفحص IP الأجهزة المفتوحة والـ Ports واختبار الاستجابة.",
        p6_title: "سكربت أتمتة ومراقبة النظام",
        p6_desc: "سكربت بايثون مخصص لمراقبة أداء الجهاز والشبكة ومعالجة المهام اليومية.",
        btn_demo: "معاينة مباشرة",
        btn_details: "التفاصيل",
        btn_logic: "عرض المنطق",
        btn_code: "عرض الكود",
        term_title: "الترمنال التفاعلي (CLI)",
        contact_title: "تواصل معي واطلب خدمتك",
        ph_name: "اسمك الكريم",
        ph_email: "بريدك الإلكتروني",
        opt_select: "اختر الخدمة المطلوبة",
        opt_bday: "موقع عيد ميلاد تفاعلي (Interactive Birthday)",
        opt_web: "تصميم موقع ويب مخصص (Custom Web Dev)",
        opt_pos: "سيستم كاشير وإدارة الجيم (Gym POS)",
        opt_auto: "حلول أتمتة وشبكات (Python & Networks)",
        opt_custom: "مشروع آخر - حسب الاتفاق",
        cost_label: "تكلفة الباقة المختارة:",
        cash_title: "طريقة الدفع والتأكيد (إتصالات كاش):",
        cash_desc: "لتأكيد طلب الباقة، يتم تحويل المبلغ أو العربون المفضل على الرقم التالي:",
        cash_note: "* بعد التحويل، اضغط على الأزرار بالأسفل للانتقال لتأكيد الطلب مباشرة عبر الواتساب.",
        ph_desc: "اكتب تفاصيل المشروع أو الخدمة المطلوبة...",
        btn_submit: "تأكيد الطلب والتواصل عبر الواتساب",
        toast_success: "تمت العملية بنجاح!"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const langToggleBtn = document.getElementById('lang-toggle');
    const langText = document.getElementById('lang-text');

    let currentLang = localStorage.getItem('app_lang') || 'en';

    function applyLanguage(lang) {
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', lang);
        if (langText) {
            langText.textContent = lang === 'ar' ? 'EN' : 'AR';
        }

        // Update Text Contents
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // Update Placeholders
        document.querySelectorAll('[data-i18n-ph]').forEach(el => {
            const key = el.getAttribute('data-i18n-ph');
            if (translations[lang] && translations[lang][key]) {
                el.setAttribute('placeholder', translations[lang][key]);
            }
        });
    }

    // Apply language on load
    applyLanguage(currentLang);

    // Add Event Listener safely
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'ar' : 'en';
            localStorage.setItem('app_lang', currentLang);
            applyLanguage(currentLang);
        });
    }
});

// ==========================================
// Helper Function for Testimonial Cards
// ==========================================
function appendTestimonialCard(name, text) {
    const testimonialsGrid = document.getElementById('testimonialsGrid');
    if (!testimonialsGrid) return;
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.innerHTML = `
        <div class="stars">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
        </div>
        <p>"${text}"</p>
        <h4>${name}</h4>
        <span class="client-title">زائر / عميل للموقع</span>
    `;
    testimonialsGrid.appendChild(card);
}
// فتح صفحة الأدمن باختصار سري من الكيبورد (Ctrl + Shift + A)
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a' || e.key === 'ش')) {
        e.preventDefault();
        window.location.href = 'admin.html';
    }
});