// ================================
// ===== CARRINHO GLOBAL =========
// ================================

let carrinho = [];

// ================================
// ===== FUNÇÕES =================
// ================================

function atualizarContador() {
    const contador = document.querySelector(".contador");
    if (contador) {
        contador.textContent = carrinho.length;
    }
}

function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarContador();
}

function calcularTotal() {
    const totalSpan = document.getElementById("valorTotal");
    if (!totalSpan) return;

    let total = 0;
    carrinho.forEach(item => total += item.preco);

    totalSpan.textContent = total.toFixed(2).replace(".", ",");
}

function renderizarCarrinho() {
    const lista = document.querySelector(".lista-carrinho");
    if (!lista) return;

    lista.innerHTML = "";

    if (carrinho.length === 0) {
        lista.innerHTML = "<li>Carrinho vazio</li>";
        calcularTotal();
        return;
    }

    carrinho.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.nome} - R$ ${item.preco.toFixed(2).replace(".", ",")}
            <button class="remover-item" data-index="${index}">X</button>
        `;
        lista.appendChild(li);
    });

    calcularTotal();

    document.querySelectorAll(".remover-item").forEach(botao => {
        botao.addEventListener("click", () => {
            const index = botao.dataset.index;
            carrinho.splice(index, 1);
            salvarCarrinho();
            renderizarCarrinho();
        });
    });
}

// ================================
// ===== INIT GLOBAL =============
// ================================
document.addEventListener("DOMContentLoaded", () => {

    // Recupera carrinho salvo
    carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    atualizarContador();

    // ================================
    // ===== BOTÕES COMPRAR ==========
    // ================================
    document.querySelectorAll(".btn-comprar, .produto button").forEach(botao => {
        botao.addEventListener("click", () => {

            // Produto.html (usa data-*)
            if (botao.dataset.nome) {
                carrinho.push({
                    nome: botao.dataset.nome,
                    preco: Number(botao.dataset.preco)
                });
            }
            // Loja.html
            else {
                const produto = botao.closest(".produto");
                const nome = produto.querySelector("h4").innerText;
                const precoTexto = produto.querySelector(".preco-novo").innerText;
                const preco = Number(
                    precoTexto.replace("R$", "").replace(".", "").replace(",", ".")
                );

                carrinho.push({ nome, preco });
            }

            salvarCarrinho();
            alert("Produto adicionado ao carrinho!");
        });
    });

    // ================================
    // ===== MODAL DO CARRINHO =======
    // ================================
    const carrinhoBtn = document.querySelector(".carrinho-flutuante");
    const modal = document.getElementById("modalCarrinho");
    const fechar = document.querySelector(".fechar");

    carrinhoBtn?.addEventListener("click", () => {
        modal.style.display = "flex";
        renderizarCarrinho();
    });

    fechar?.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", e => {
        if (e.target === modal) modal.style.display = "none";
    });

    // ================================
    // ===== LIMPAR / FINALIZAR ======
    // ================================
    document.querySelector(".btn-limpar")?.addEventListener("click", () => {
        carrinho = [];
        salvarCarrinho();
        renderizarCarrinho();
    });

    document.querySelector(".btn-finalizar")?.addEventListener("click", () => {
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

    // ================================
    // ===== FILTROS =====
    // ================================
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

});
