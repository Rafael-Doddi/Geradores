const btn_gerar = document.getElementsByClassName("btn-gerar")[0];
const btn_copiar = document.getElementsByClassName("btn-copiar")[0];

function reseta_cores() {
    ocultar_feedback();
    btn_gerar.style.background = "blueviolet";
    btn_gerar.style.transition = "0.5s ease background";
    btn_copiar.style.background = "blueviolet";
    btn_copiar.style.transition = "0.5s ease background";
    document.querySelector("div.input-group").style.borderColor = "blueviolet";
    document.getElementsByClassName("input-group")[0].style.transition = "0.5s ease border-color";
}

function ocultar_feedback() {
    copiado.classList.remove("show");
}

function mostrar_feedback() {
    copiado.classList.add("show");
}

function feedback_ok() {
    mostrar_feedback();
    btn_gerar.style.background = "#05c800";
    btn_gerar.style.transition = "0.5s ease background";
    btn_copiar.style.background = "#05c800";
    btn_copiar.style.transition = "0.5s ease background";
    document.getElementsByClassName("input-group")[0].style.borderColor = "#05c800";
    document.getElementsByClassName("input-group")[0].style.transition = "0.5s ease border-color";
}

function copyToClipboard(txtCopiado) {
    reseta_cores();
    txt_gerado.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    copiado.classList.remove("alert-danger");
    copiado.classList.add("alert-success");
    copiado.textContent = txtCopiado;
    feedback_ok();
}