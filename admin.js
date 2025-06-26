const auth = firebase.auth();
const db = firebase.firestore();

document.getElementById("login-form").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("admin-email").value;
  const password = document.getElementById("admin-password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById("login-form").style.display = "none";
      document.getElementById("admin-panel").style.display = "block";
    })
    .catch(error => {
      alert("Giriş Başarısız: " + error.message);
    });
});

document.getElementById("add-form").addEventListener("submit", e => {
  e.preventDefault();
  const account = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    region: document.getElementById("region").value,
    rank: document.getElementById("rank").value,
    champions: +document.getElementById("champions").value,
    skins: +document.getElementById("skins").value,
    image: document.getElementById("image").value,
    email_verified: document.getElementById("email_verified").checked
  };

  db.collection("accounts").add(account)
    .then(() => {
      alert("Hesap kaydedildi.");
      e.target.reset();
    })
    .catch(err => {
      alert("Hata: " + err.message);
    });
});
