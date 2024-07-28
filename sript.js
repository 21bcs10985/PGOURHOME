document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");
  
    hamburger.addEventListener("click", function() {
      navMenu.classList.toggle("active");
    });
  
    document.addEventListener("click", function(event) {
      if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
        navMenu.classList.remove("active");
      }
    });
  
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener("click", function() {
        navMenu.classList.remove("active");
      });
    });
  
    // Typed.js initialization
    var typed = new Typed(".text", {
      strings: ["Boys and Girls"],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true
    });
  
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header nav a');
  
    window.onscroll = () => {
      sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
  
        if (top >= offset && top < offset + height) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
          });
        }
      });
    };
  });
  
