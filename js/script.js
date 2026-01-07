// ================================
// ===== CARRINHO COMPLETO =======
// ================================

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// ELEMENTOS
const contador = document.querySelector(".contador");
const botoesAdicionar = document.querySelectorAll(".produto button");
const carrinhoBtn = document.querySelector(".carrinho-flutuante");
const modal = document.getElementById("modalCarrinho");
const fecharModal = document.querySelector(".fechar");
const listaCarrinho = document.querySelector(".lista-carrinho");
const btnLimpar = document.querySelector(".btn-limpar");
const btnFinalizar = document.querySelector(".btn-finalizar");
const valorTotal = document.getElementById("valorTotal");

// ===== CONTADOR =====
function atualizarContador() {
    contador.textContent = carrinho.length;
}

// ===== TOTAL =====
function calcularTotal() {
    let total = 0;

    carrinho.forEach(item => {
        const preco = parseFloat(
            item.preco.replace("R$", "").replace(".", "").replace(",", ".")
        );
        total += preco;
    });

    valorTotal.textContent = total.toFixed(2).replace(".", ",");
}

// ===== RENDERIZA CARRINHO =====
function renderizarCarrinho() {
    listaCarrinho.innerHTML = "";

    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = "<li>Carrinho vazio</li>";
        valorTotal.textContent = "0,00";
        return;
    }

    carrinho.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.nome} - ${item.preco}
            <button onclick="removerItem(${index})">X</button>
        `;
        listaCarrinho.appendChild(li);
    });

    calcularTotal();
}

// ===== ADICIONAR =====
botoesAdicionar.forEach(botao => {
    botao.addEventListener("click", () => {
        const produto = botao.parentElement;
        const nome = produto.querySelector("h4").innerText;
        const preco = produto.querySelector(".preco-novo").innerText;

        carrinho.push({ nome, preco });
        salvarCarrinho();
    });
});

// ===== REMOVER =====
function removerItem(index) {
    carrinho.splice(index, 1);
    salvarCarrinho();
    renderizarCarrinho();
}

// ===== LIMPAR =====
btnLimpar.addEventListener("click", () => {
    carrinho = [];
    salvarCarrinho();
    renderizarCarrinho();
});

// ===== FINALIZAR =====
btnFinalizar.addEventListener("click", () => {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    alert("Compra finalizada com sucesso!");
    carrinho = [];
    salvarCarrinho();
    renderizarCarrinho();
    modal.style.display = "none";
});

// ===== SALVAR =====
function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarContador();
}

// ===== MODAL =====
carrinhoBtn.addEventListener("click", () => {
    modal.style.display = "flex";
    renderizarCarrinho();
});

fecharModal.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
});

// ===== FILTROS =====
const botoesFiltro = document.querySelectorAll("[data-filtro]");
const botaoReset = document.querySelector(".btn-reset");
const produtos = document.querySelectorAll(".produto");

botoesFiltro.forEach(botao => {
    botao.addEventListener("click", () => {
        const filtro = botao.dataset.filtro;

        produtos.forEach(produto => {
            produto.style.display =
                produto.dataset.categoria === filtro ? "block" : "none";
        });
    });
});

botaoReset.addEventListener("click", () => {
    produtos.forEach(produto => produto.style.display = "block");
});

// ===== INICIALIZA =====
atualizarContador();
