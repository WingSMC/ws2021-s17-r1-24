
window.addEventListener("load", init);

function init() {
    buttonActive();
}

function buttonActive() {    
    let elements = document.querySelectorAll(".navs button");
    let current = elements[0];
    elements.forEach(elem => {
        elem.addEventListener("click", () => {
            current.classList.remove("active");
            current = elem;
            current.classList.add("active");
        });
    });
}