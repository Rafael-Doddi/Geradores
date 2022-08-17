const copiado = document.getElementById("copiado");
const txt_gerado = document.getElementById("input-gerado");
const range_input = document.getElementById("range-caracteres");
const numero_caracteres = document.getElementById("numero-caracteres");
let elementsArray = document.querySelectorAll(".opcoes-content input[type='checkbox']");

txt_gerado.value = gerar_txt(numero_caracteres.value);

elementsArray.forEach(function (elem) {
    elem.addEventListener("input", function () {
        txt_gerado.value = gerar_txt(numero_caracteres.value);
    });
});

function gerar() {
    txt_gerado.value = gerar_txt(numero_caracteres.value);
}

function copiar(txtCopiado) {
    if(txt_gerado.type == "password"){
        txt_gerado.type = "text";
        copyToClipboard(txtCopiado);
        txt_gerado.type = "password";
        return;
    }
    copyToClipboard(txtCopiado);
}

numero_caracteres.addEventListener("input", (e) => {
    let num = numero_caracteres.value;
    range_input.value = num;
    txt_gerado.value = gerar_txt(num);
});

range_input.addEventListener("input", (e) => {
    let num = range_input.value;
    numero_caracteres.value = range_input.value;
    txt_gerado.value = gerar_txt(num);
});

function range(start, end) {
    var ans = [];
    for (let i = start; i <= end; i++) {
        ans.push(i);
    }
    return ans;
}

function gerar_txt(num) {
    if (window.location.href.includes("/gerar_senha") && (numero_caracteres.value < 14 || numero_caracteres.value > 70)) return txt_gerado.value;
    else if (window.location.href.includes("/gerar_usuario") && (numero_caracteres.value < 1 || numero_caracteres.value > 50)) return txt_gerado.value;
    reseta_cores();
    let opcoes = document.querySelectorAll(".opcoes-content input[type='checkbox']:checked");
    let dicionario = '';
    let senhaGerada = '';
    let minusculas = 'abcdefghijklmnopqrstuvwxyz';
    let maiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let numeros = '0123456789';
    let pontuacao = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
    if (opcoes.length == 0) {
        return txt_gerado.value;
    }
    for (opcao of opcoes) {
        if (opcao.value == '0') {
            dicionario += minusculas;
        }
        if (opcao.value == '1') {
            dicionario += maiusculas;
        }
        if (opcao.value == '2') {
            dicionario += numeros;
        }
        if (opcao.value == '3') {
            dicionario += pontuacao;
        }
    }

    let caracteres = [];
    for (i in dicionario) {
        caracteres.push(dicionario[i]);
    }
    for (n in range(0, num - 1)) {
        senhaGerada += caracteres[Math.floor(Math.random() * caracteres.length)];
    }
    return senhaGerada;
}