const daynight = document.getElementById("checkbox");
let elemento_temas = document.getElementsByClassName("tema");

daynight.addEventListener("click", () => {
    for (elemento of elemento_temas){
        elemento.classList.toggle("darktheme");
        elemento.style.transition = "0.5s ease color, 0.5s ease background-color";
        if (elemento.classList.contains("darktheme")){
            localStorage.setItem("tema", "escuro");
        } else {
            localStorage.setItem("tema", "claro")
        }
    }
});

if(localStorage.getItem("tema") == "escuro"){
    daynight.click();
}