const pontuacao = document.getElementById("pontuacao");
const select_estados = document.querySelector("select");
const estadoCpf = document.getElementById("estado-cpf");
const txt_gerado = document.getElementById("input-gerado");

const locais = {
    '1': 'DF, GO, MS, MT e TO', 
    '2': 'AC, AM, AP, PA, RO e RR', 
    '3': 'CE, MA e PI', 
    '4': 'AL, PB, PE, RN',
    '5': 'BA e SE',
    '6': 'MG',
    '7': 'ES e RJ',
    '8': 'SP',
    '9': 'PR e SC',
    '0': 'RS'
}

select_estados.addEventListener("input", ()=>{
    gerar();
});

function formatarCPF() {
    reseta_cores();
    let cpf = txt_gerado.value;
    if (pontuacao.checked) {
        if (!cpf.includes('.')) {
            cpf = cpf.split('');
            cpf.splice(3, 0, '.');
            cpf.splice(7, 0, '.');
            cpf.splice(11, 0, '-');
            txt_gerado.value = cpf.join('');
        }
    } else {
        if (cpf.includes('.')) {
            txt_gerado.value = cpf.replaceAll('.', '').replace('-', '');
        }
    }
}

function aleatorio() {
    let aleat = 0;
    do {
        aleat = Math.floor(Math.random() * 999999999);
    } while (aleat.toString().length != 9);
    if (select_estados.value != '-'){
        aleat = aleat.toString().slice(0, 8) + select_estados.value;
    }
    return "" + aleat
}

function gerarCPF(cpf) {
    let soma = 0;
    let n1 = 0;
    let n2 = 0;

    for (i = 1; i <= 9; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    };
    n1 = (soma * 10) % 11;
    
    if ((n1 == 10) || (n1 == 11)) n1 = 0;
    cpf += n1;
    
    soma = 0;
    for (i = 1; i <= 10; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    n2 = (soma * 10) % 11;
    
    if ((n2 == 10) || (n2 == 11)) n2 = 0;
    cpf += n2;

    return cpf;
}

function gerar() {
    txt_gerado.value = gerarCPF(aleatorio());
    formatarCPF();
}

gerar();