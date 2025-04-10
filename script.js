let transactions = [];

function addTransaction() {
  const text = document.getElementById("text").value;
  const amount = parseFloat(document.getElementById("amount").value);
  if (!text || isNaN(amount)) {
    alert("Please provide valid description and amount");
    return;
  }

  const transaction = {
    id: Date.now(),
    text,
    amount
  };

  transactions.push(transaction);
  updateUI();
  saveToLocalStorage();

  document.getElementById("text").value = "";
  document.getElementById("amount").value = "";
}

function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  updateUI();
  saveToLocalStorage();
}

function updateUI() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  transactions.forEach(t => {
    const sign = t.amount < 0 ? "-" : "+";
    const li = document.createElement("li");
    li.classList.add(t.amount < 0 ? "minus" : "plus");
    li.innerHTML = `
      ${t.text} <span>${sign}$${Math.abs(t.amount)}</span>
      <button onclick="removeTransaction(${t.id})">x</button>
    `;
    list.appendChild(li);
  });

  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((acc, val) => acc + val, 0).toFixed(2);
  const income = amounts.filter(a => a > 0).reduce((a, b) => a + b, 0).toFixed(2);
  const expense = (amounts.filter(a => a < 0).reduce((a, b) => a + b, 0) * -1).toFixed(2);

  document.getElementById("balance").innerText = `$${total}`;
  document.getElementById("income").innerText = `$${income}`;
  document.getElementById("expense").innerText = `$${expense}`;
}

function saveToLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function loadFromLocalStorage() {
  const data = localStorage.getItem("transactions");
  if (data) {
    transactions = JSON.parse(data);
    updateUI();
  }
}

loadFromLocalStorage();