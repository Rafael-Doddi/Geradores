const btn_senhas = document.querySelectorAll(".btn-mostrar");
const senha_visivel = document.getElementsByClassName("btn-mostrar")[0];
const senha_invisivel = document.getElementsByClassName("btn-mostrar")[1];

btn_senhas.forEach((elem) => {
    elem.addEventListener("click", () => {
        senha_visivel.classList.toggle("escondido");
        senha_visivel.classList.toggle("show");
        senha_invisivel.classList.toggle("show");
        senha_invisivel.classList.toggle("escondido");
        if (txt_gerado.type == "password") {
            txt_gerado.type = "text";
        } else {
            txt_gerado.type = "password";
        }
    });
});