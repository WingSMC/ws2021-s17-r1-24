function init() {
    parallax();
    buttonActive();
    toggleNav();
    form();
    fetchJSON();
}
window.addEventListener("load", init);

function buttonActive() {
    let current = document.documentElement;
    document.querySelectorAll("#navs button")
    .forEach(elem => {
        elem.addEventListener("click", () => {
            current.classList.remove("active");
            current = elem;
            current.classList.add("active");
            navToggle(); // hide mobile menu
        });
    });
}
let navToggle;
function toggleNav() {
    let hidden = true;
    const navs = document.getElementById("navs");
    navToggle = () => {
        hidden = !hidden;
        hidden ?
            navs.classList.add("hide") :
            navs.classList.remove("hide")
        ;
    };
    document.getElementById("hamburger")
    .addEventListener("click", navToggle);
}

function parallax() {
    const banner = document.getElementById("banner");
    const scrollEv = () => {
        banner.style.backgroundPositionY = `${window.scrollY / 2 - 45}px`;
    };
    scrollEv(); // setup
    window.addEventListener("scroll", scrollEv);
}

function form() {
    let fnspan = document.getElementById("firstname-reply");
    let feedback = document.getElementById("feedback");
    let form = document.getElementById("msg-form");
    form.addEventListener("submit", e => {
        e.preventDefault();
        fnspan.innerText = document.getElementById("first-name").value;
        feedback.classList.remove("hide");
        form.classList.add("hide");
    });
}

function fetchJSON() {
    fetch("./data/shanghai_park_flats.json")
    .then(res => res.json())
    .then(res => {
                
    })
    .catch((err)=> {
        console.error(err);
    });
}