document.addEventListener("DOMContentLoaded", () => {
    const hamburguerBtn = document.getElementById("hamburguer-btn");
    const navMenu = document.getElementById("nav-menu");
  
    hamburguerBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    const inicioButton = document.getElementById("volverInicio");
    if (inicioButton) {
        inicioButton.addEventListener("click", () => {
            window.location.href = '/';
        });
    }
//ocultar formulario search
    const iconSearch = document.querySelector(".icon_search");
    const formSearch = document.querySelector(".form_search");

    iconSearch.addEventListener("click", () => {
        formSearch.classList.toggle("hidden"); // Alterna la visibilidad del formulario
        if (!formSearch.classList.contains("hidden")) {
            formSearch.querySelector(".input_search").focus(); // Coloca el cursor en el input
            iconSearch.style.display = "none";
        }
        if (!formSearch.contains(event.target) && event.target !== iconSearch) {
          iconSearch.style.display = formSearch.classList.contains("hidden") ? "block" : "none";
          
      }
    });
  });