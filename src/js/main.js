
window.addEventListener("load", init);

function init() {
    buttonActive();
    toggleNav();
}

function buttonActive() {
    let elements = document.querySelectorAll("#navs button");
    let current = elements[0];
    elements.forEach(elem => {
        elem.addEventListener("click", () => {
            current.classList.remove("active");
            current = elem;
            current.classList.add("active");
        });
    });
}

function toggleNav() {
    let hidden = true;
    let navs = document.getElementById("navs");
    document.getElementById("hamburger")
    .addEventListener("click", () => {
        hidden = !hidden;
        hidden ?
            navs.classList.add("hide") :
            navs.classList.remove("hide")
        ;
    });
}