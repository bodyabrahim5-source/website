// 1. Firebase Config الخاص بمشروعك
const firebaseConfig = {
    apiKey: "AIzaSyD7DKgpTUBrZLeGRIC77vqZEDcl7QeAeOo",
    authDomain: "wesite-a7adf.firebaseapp.com",
    databaseURL: "https://wesite-a7adf-default-rtdb.firebaseio.com",
    projectId: "wesite-a7adf",
    storageBucket: "wesite-a7adf.firebasestorage.app",
    messagingSenderId: "667675927373",
    appId: "1:667675927373:web:8b53859c0bf32083ac4d04"
};

// 2. Initialize Firebase (Compat Mode)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();

// 3. 🔑 كلمة السر للوحة التحكم
const ADMIN_PASSWORD = "##22/8/2005##";

// 4. دالة تسجيل الدخول
function login() {
    const passInput = document.getElementById('passInput');
    const loginSection = document.getElementById('loginSection');
    const adminPanel = document.getElementById('adminPanel');

    if (passInput && passInput.value === ADMIN_PASSWORD) {
        loginSection.style.display = 'none';
        adminPanel.style.display = 'block';
        loadComments();
    } else {
        alert("❌ كلمة المرور غير صحيحة يا هندسة!");
    }
}

// ربط الأحداث بعد تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const passInput = document.getElementById('passInput');

    if (loginBtn) {
        loginBtn.addEventListener('click', login);
    }

    if (passInput) {
        passInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') login();
        });
    }
});

// 5. جلب التقييمات المباشرة من Firebase
function loadComments() {
    const commentsList = document.getElementById('commentsList');

    db.ref('testimonials').on('value', (snapshot) => {
        commentsList.innerHTML = '';
        const data = snapshot.val();

        if (data) {
            Object.keys(data).forEach((id) => {
                const item = data[id];
                const card = document.createElement('div');
                card.className = 'comment-item';
                card.innerHTML = `
                    <div class="comment-info">
                        <h4><i class="fa-solid fa-circle-user"></i> ${item.name || 'زائر'}</h4>
                        <p>"${item.text || ''}"</p>
                    </div>
                    <button class="btn-delete" onclick="deleteComment('${id}')">
                        <i class="fa-solid fa-trash-can"></i> حذف
                    </button>
                `;
                commentsList.appendChild(card);
            });
        } else {
            commentsList.innerHTML = '<p class="empty-msg">لا توجد أي تقييمات حالياً في قاعدة البيانات.</p>';
        }
    });
}

// 6. دالة حذف التعليق
function deleteComment(id) {
    if (confirm("هل أنت متأكد من حذف هذا التعليق نهائياً؟")) {
        db.ref('testimonials/' + id).remove()
            .then(() => {
                // الحذف سينعكس فورياً
            })
            .catch((error) => {
                alert("حدث خطأ أثناء الحذف: " + error.message);
            });
    }
}