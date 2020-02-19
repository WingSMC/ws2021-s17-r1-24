function init() {
    parallax();
    buttonActive();
    toggleNav();
    modal();
    form();
    map();
    fetchJSON();
}
window.addEventListener("load", init);

let navToggle;
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

function map() {
    let images = [
        "./images/shanghai_park_map-.png",
        "./images/shanghai_park_map.png",
        "./images/shanghai_park_map+.png"
    ];
    let state = 1;
    let map = document.getElementById("map");
    let changeState = (n) => {
        state += n;
        map.src = images[state];
    }
    let zin = document.getElementById("zoom-in");
    let zout = document.getElementById("zoom-out");
    zin.addEventListener("click", () => {
        if(state < 2) changeState(1);
        if(state === 2) {
            zin.disabled = true;
        }
        zout.disabled = false;
    });
    zout.addEventListener("click", () => {
        if(state > 0) changeState(-1);
        if(state === 0) {
            zout.disabled = true;
        }
        zin.disabled = false;        
    });
}

async function fetchJSON() {
    let object;
    await fetch("./data/shanghai_park_flats.json")
    .then(res => res.json())
    .then(res => object = res)
    .catch(err => console.error(err));
    console.log(object);
    
    let table = document.getElementById("flats-table");
}

function modal() {
    let modal = document.getElementById("slides");
    document.getElementById("close").addEventListener("click", ()=> {
        modal.classList.add("hide");
    });
    let galleryPics = document.querySelectorAll(".gallery-grid div"); 
    let state = 0;
    
    galleryPics.forEach((pic, k) => pic.addEventListener("click", ()=> {
        let i = k + 1;
        modal.firstElementChild.style.backgroundImage = `url(./images/shanghai_park_${i > 9 ? i : `0${i}`}.jpg)`
        modal.classList.remove("hide");
        state = k;
    }));
    
}