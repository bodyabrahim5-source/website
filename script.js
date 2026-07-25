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
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';

    projectCards.forEach(card => {
        const category = card.dataset.category;
        const title = card.querySelector('h3').textContent.toLowerCase();
        const desc = card.querySelector('p').textContent.toLowerCase();

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
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
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
        print(f"[+] Sale recorded: {item} - ${price}")

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

// الأوامر المتاحة واستجاباتها بتنسيقات HTML
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
        // التنقل بالأوامر السابقة عند الضغط على الأسهم
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

        // عند الضغط على Enter لإرسال الأمر
        if (e.key === 'Enter') {
            const inputVal = this.value.trim();
            const lowerInput = inputVal.toLowerCase();
            this.value = '';

            if (inputVal === '') return;

            // حفظ الأمر في السجل
            commandHistory.push(inputVal);
            historyIndex = commandHistory.length;

            // عرض الأمر المكتوب في الـ Terminal
            const cmdLine = document.createElement('div');
            cmdLine.className = 'term-line';
            cmdLine.innerHTML = `<span style="color:#58a6ff; font-weight:bold;">guest@abdelrahman:~$</span> ${inputVal}`;
            terminalOutput.appendChild(cmdLine);

            // معالجة الاستجابة
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

// وظيفة إظهار إشعار Toast المودرن
function showToast(message) {
    let toast = document.getElementById('toastNotification');
    
    // إنشاء عنصر Toast لو مش موجود في الصفحة
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

// وظيفة نسخ رقم إتصالات كاش
function copyCashNumber() {
    const cashNum = "01141702187";
    navigator.clipboard.writeText(cashNum).then(() => {
        showToast("تم نسخ رقم إتصالات كاش بنجاح!");
    }).catch(() => {
        showToast("حدث خطأ أثناء نسخ الرقم.");
    });
}