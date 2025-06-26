let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

function renderAccounts() {
  const list = document.getElementById("account-list");
  const filterRank = document.getElementById("filter-rank").value;

  list.innerHTML = "";

  accounts
    .filter(acc => !filterRank || acc.rank === filterRank)
    .forEach((account, index) => {
      const card = document.createElement("div");
      card.className = "account-card";
      card.innerHTML = `
        <img src="${account.image}" alt="Hesap Görseli">
        <h2>${account.title}</h2>
        <p><strong>Fiyat:</strong> ${account.price} TL</p>
        <p><strong>Bölge:</strong> ${account.region}</p>
        <p><strong>Lig:</strong> ${account.rank}</p>
        <p><strong>Şampiyon:</strong> ${account.champions}</p>
        <p><strong>Skin:</strong> ${account.skins}</p>
        <p><strong>E-Posta:</strong> ${account.email_verified ? "Doğrulandı" : "Yok"}</p>
        <button onclick="deleteAccount(${index})">Sil</button>
      `;
      list.appendChild(card);
    });
}

function deleteAccount(index) {
  if (confirm("Bu hesabı silmek istediğine emin misin?")) {
    accounts.splice(index, 1);
    localStorage.setItem("accounts", JSON.stringify(accounts));
    renderAccounts();
  }
}

document.getElementById("account-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const newAccount = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    region: document.getElementById("region").value,
    rank: document.getElementById("rank").value,
    champions: +document.getElementById("champions").value,
    skins: +document.getElementById("skins").value,
    image: document.getElementById("image").value,
    email_verified: document.getElementById("email_verified").checked,
  };
  accounts.push(newAccount);
  localStorage.setItem("accounts", JSON.stringify(accounts));
  this.reset();
  renderAccounts();
});

renderAccounts();
