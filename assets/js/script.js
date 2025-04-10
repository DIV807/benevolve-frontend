'use strict';

/**
 *  *navbar toggle in mobile
 */

const /** {NodeElement} */ $navbar = document.querySelector("[data-navbar]");
const /** {NodeElement} */ $navToggler = document.querySelector("[data-nav-toggler]");

$navToggler.addEventListener("click", () => $navbar.classList.toggle("active"));



/**
 *  *Header scroll state
 */

const /** {NodeElemnt} */ $header = document.querySelector("[data-header]");

window.addEventListener("scroll", e => {
    $header.classList[window.scrollY >50 ? "add" : "remove"]("active");
});



/**
 * Add to favourite button toggle
 */

const /** {NodeList} */ $toggleBtns = document.querySelectorAll("[data-toggle-btn]");

$toggleBtns.forEach($toggleBtns => {
    $toggleBtns.addEventListener("click", () => {
        $toggleBtns.classList.toggle("active");
    });
});






document.addEventListener("DOMContentLoaded", function () {
    const videoCard = document.querySelector(".video-card");
    let hoverTimer;

    videoCard.addEventListener("mouseenter", function () {
        hoverTimer = setTimeout(() => {
            const iframe = document.createElement("iframe");
            iframe.src = "https://www.youtube.com/embed/2szQhR4oZtA?autoplay=1&mute=1";
            iframe.frameBorder = "0";
            iframe.allowFullscreen = true;
            iframe.allow = "autoplay; encrypted-media";

            videoCard.innerHTML = ""; // Remove existing content
            videoCard.appendChild(iframe);
        }, 3000); // 3-second delay before autoplay
    });

    videoCard.addEventListener("mouseleave", function () {
        clearTimeout(hoverTimer);
    });

    videoCard.addEventListener("click", function () {
        window.open("https://www.youtube.com/watch?v=2szQhR4oZtA", "_blank");
    });
});








  
  



