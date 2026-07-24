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

// 9. Interactive Terminal Logic
const terminalInput = document.getElementById('terminalInput');
const terminalOutput = document.getElementById('terminalOutput');

const commands = {
    help: "Available commands:<br>" +
          "- <span class='highlight'>skills</span>: View IT & programming skills<br>" +
          "- <span class='highlight'>networking</span>: IT Infrastructure capabilities<br>" +
          "- <span class='highlight'>projects</span>: List featured work<br>" +
          "- <span class='highlight'>ipconfig</span>: Simulate network interface info<br>" +
          "- <span class='highlight'>contact</span>: Open WhatsApp link<br>" +
          "- <span class='highlight'>clear</span>: Clear terminal console",
          
    skills: "Technical Skills:<br>" +
            "- Network Administration & Infrastructure Security<br>" +
            "- System Diagnostics & Automation (Python)<br>" +
            "- Responsive Web Development (HTML/CSS/JS)<br>" +
            "- Desktop POS & Management Systems",
            
    networking: "Networking & IT Focus:<br>" +
                "- Router & Switch Configuration<br>" +
                "- Subnetting, VLANs, TCP/IP Suite<br>" +
                "- Active Directory & System Support<br>" +
                "- Network Security & Latency Auditing",
                
    projects: "Featured Projects:<br>" +
              "1. Interactive Birthday Web App<br>" +
              "2. Tahabeesh Restaurant Web App<br>" +
              "3. Gym & POS Management System Logic<br>" +
              "4. Network Diagnostics & Port Scanner<br>" +
              "5. System Monitoring Automation Script",
              
    ipconfig: "eth0: flags=4163&lt;UP,BROADCAST,RUNNING,MULTICAST&gt;  mtu 1500<br>" +
              "inet 192.168.1.100  netmask 255.255.255.0  gateway 192.168.1.1<br>" +
              "status: <span style='color:#27c93f;'>Connected</span>",
              
    contact: "Redirecting to WhatsApp... <a href='https://wa.me/201091822235' target='_blank' style='color:#58a6ff;'>Click here if not redirected automatically.</a>"
};

if (terminalInput) {
    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const inputVal = this.value.trim().toLowerCase();
            this.value = '';

            if (inputVal === '') return;

            const cmdLine = document.createElement('div');
            cmdLine.className = 'term-line';
            cmdLine.innerHTML = `<span style='color:#58a6ff;'>guest@abdelrahman:~$</span> ${inputVal}`;
            terminalOutput.appendChild(cmdLine);

            const resLine = document.createElement('div');
            resLine.className = 'term-line';

            if (inputVal === 'clear') {
                terminalOutput.innerHTML = '';
                return;
            } else if (commands[inputVal]) {
                resLine.innerHTML = commands[inputVal];
                if (inputVal === 'contact') {
                    window.open('https://wa.me/201091822235', '_blank');
                }
            } else {
                resLine.innerHTML = `Command not recognized: '<span style='color:#ff5f56;'>${inputVal}</span>'. Type '<span class='highlight'>help</span>' for options.`;
            }

            terminalOutput.appendChild(resLine);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    });
}