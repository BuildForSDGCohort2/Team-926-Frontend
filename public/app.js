// Justify burger
const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");
  
  burger.addEventListener("click", () => {
    //Toggle Nav
    nav.classList.toggle("nav-active");

    //Animate Links
    navLinks.forEach((link, room) => {
      if(link.style.animation) {
        link.style.animation = "";
      }else {
        link.style.animation = `navLinkFade 0.5s easeforwards ${room/7 + 1.5}`;
    }
  });
  //Burger Animation
  burger.classList.toggle("toggle");
  });
}
navSlide();
/*const app = () => {
  navSlide();
  navSlide();
  navSlide();
  navSlide();
}*/