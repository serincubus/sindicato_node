document.addEventListener("DOMContentLoaded", () => {
    const hamburguerBtn = document.getElementById("hamburguer-btn");
    const navMenu = document.getElementById("nav-menu");
  
    hamburguerBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  });