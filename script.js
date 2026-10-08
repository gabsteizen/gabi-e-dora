let saldo = 1000;

// Notas disponíveis no caixa
const notas = [100, 50, 20, 10, 5, 2];

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function realizarSaque() {

    const campoValor = document.getElementById("valor");
    const mensagem = document.getElementById("mensagem");

    const valor = Number(campoValor.value);

    // Limpa mensagem anterior
    mensagem.innerHTML = "";
    mensagem.className = "";

    // Verifica se o valor é válido
    if (valor <= 0 || !Number.isInteger(valor)) {

        mensagem.className = "erro";

        mensagem.innerHTML =
            "Digite um valor inteiro maior que zero.";

        return;
    }

    // Verifica se existe saldo suficiente
    if (valor > saldo) {

        mensagem.className = "erro";

        mensagem.innerHTML =
            "Saldo insuficiente! Seu saldo é " +
            formatarMoeda(saldo) + ".";

        return;
    }

    let restante = valor;

    let quantidadeNotas = {};

    // Calcula as notas
    for (let nota of notas) {

        quantidadeNotas[nota] = Math.floor(restante / nota);

        restante = restante % nota;
    }

    // Verifica se é possível formar o valor
    // com as notas disponíveis
    if (restante !== 0) {

        mensagem.className = "erro";

        mensagem.innerHTML =
            "Não é possível realizar esse saque " +
            "com as notas disponíveis.";

        return;
    }

    // Retira o valor do saldo
    saldo -= valor;

    // Atualiza o saldo na tela
    document.getElementById("saldo").innerText =
        formatarMoeda(saldo);

    // Monta o resultado
    let resultado =
        "<strong>Saque realizado com sucesso!</strong>" +
        "<br><br>" +
        "Valor sacado: " +
        formatarMoeda(valor) +
        "<div class='resultado'>";

    // Mostra somente as notas utilizadas
    for (let nota of notas) {

        const quantidade = quantidadeNotas[nota];

        if (quantidade > 0) {

            resultado += `
                <div class="nota">
                    <span>${quantidade} nota(s)</span>
                    <strong>${formatarMoeda(nota)}</strong>
                </div>
            `;
        }
    }

    resultado += "</div>";

    mensagem.className = "sucesso";
    mensagem.innerHTML = resultado;

    // Limpa o campo
    campoValor.value = "";
}