const menuHamburger = document.querySelector(".imageBurger");
const menu = document.querySelector(".burger");
const header = document.querySelector("header");

menuHamburger.addEventListener("click", () => {

 
// transform: translateX(-100%)
// if(menu.classList.contains("mobile-menu")){
//     menu.style.transform= "translateX(-100%)";
//}

  menu.classList.toggle("mobile-menu");
  header.classList.toggle("header-mobile-menu");
  
  if (document.body.style.overflow === "hidden") {
    document.body.style.overflow = "auto";
    document.body.dataset.class === "pc-menu";
  } else {
    document.body.style.overflow = "hidden";
    document.body.dataset.class === "mobile-menu";
  }
  console.log(document.body);
});


