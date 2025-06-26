const auth = firebase.auth();
const db = firebase.firestore();

const loginForm = document.getElementById("login-form");
const adminPanel = document.getElementById("admin-panel");
const addForm = document.getElementById("add-form");
const accountsList = document.getElementById("accounts-list");
const logoutBtn = document.getElementById("logout-btn");

// Sayfa yüklendiğinde admin oturumu açık mı kontrol et
auth.onAuthStateChanged(user => {
  if (user && user.email === "meloboost1@gmail.com") {
    loginForm.style.display = "none";
    adminPanel.style.display = "block";
    loadAccounts();
  } else {
    loginForm.style.display = "block";
    adminPanel.style.display = "none";
  }
});

// Giriş formu gönderildiğinde
loginForm.addEventListener("submit", e => {
  e.preventDefault();

  const email = document.getElementById("admin-email").value;
  const password = document.getElementById("admin-password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      loginForm.style.display = "none";
      adminPanel.style.display = "block";
      loadAccounts();
    })
    .catch(error => {
      alert("Giriş başarısız: " + error.message);
    });
});

// Çıkış butonu
logoutBtn.addEventListener("click", () => {
  auth.signOut().then(() => {
    loginForm.style.display = "block";
    adminPanel.style.display = "none";
  });
});

// Hesapları yükle
function loadAccounts() {
  accountsList.innerHTML = "Yükleniyor...";
  db.collection("accounts").get()
    .then(snapshot => {
      accountsList.innerHTML = "";
      if (snapshot.empty) {
        accountsList.innerHTML = "<p>Henüz hesap eklenmemiş.</p>";
      } else {
        snapshot.forEach(doc => {
          const data = doc.data();
          const div = document.createElement("div");
          div.style.border = "1px solid #333";
          div.style.margin = "10px 0";
          div.style.padding = "10px";
          div.style.background = "#222";
          div.innerHTML = `
            <strong>${data.title}</strong> - ${data.rank} - ${data.price} TL
            <button onclick="deleteAccount('${doc.id}')">Sil</button>
          `;
          accountsList.appendChild(div);
        });
      }
    })
    .catch(err => {
      accountsList.innerHTML = "<p>Hesaplar yüklenirken hata oluştu.</p>";
      console.error(err);
    });
}

// Hesap silme fonksiyonu
function deleteAccount(id) {
  if (confirm("Bu hesabı silmek istediğine emin misin?")) {
    db.collection("accounts").doc(id).delete()
      .then(() => loadAccounts())
      .catch(err => alert("Silme hatası: " + err.message));
  }
}

// Hesap ekleme formu
addForm.addEventListener("submit", e => {
  e.preventDefault();
  const account = {
    title: document.getElementById("title").value.trim(),
    price: Number(document.getElementById("price").value),
    region: document.getElementById("region").value.trim(),
    rank: document.getElementById("rank").value,
    champions: Number(document.getElementById("champions").value),
    skins: Number(document.getElementById("skins").value),
    image: document.getElementById("image").value.trim(),
    email_verified: document.getElementById("email_verified").checked
  };

  db.collection("accounts").add(account)
    .then(() => {
      alert("Hesap kaydedildi.");
      addForm.reset();
      loadAccounts();
    })
    .catch(err => {
      alert("Hata: " + err.message);
    });
});
