(function(){
function init() {
    parallax();
    buttonActive();
    toggleNav();
    imgModal();
    form();
    map();
    fetchJSON();
}
window.addEventListener("load", init);
//#region Functions
let navToggle;
function buttonActive() {
    let current = document.documentElement;
    document.querySelectorAll("#navs a")
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

// js->css
function parallax() {
    const banner = document.getElementById("banner");
    const scrollEv = () => {
        banner.style.backgroundPositionY = `${window.scrollY / 2 - 45}px`;
    };
    scrollEv(); // setup
    window.addEventListener("scroll", scrollEv);
}
function imgModal() {
    let modal = document.getElementById("slides");
    document.getElementById("close").addEventListener("click", ()=> {
        modal.classList.add("hide");
    });
    let galleryPics = document.querySelectorAll(".gallery-grid div"); 
    let state = 0;
    let setState = (newState) => {
        if(newState < 1 || newState > galleryPics.length) return;
        state = newState;
        modal.firstElementChild.style.backgroundImage = `url(./images/shanghai_park_${state > 9 ? state : `0${state}`}.jpg)`
    }
    
    galleryPics.forEach((pic, k) => pic.addEventListener("click", ()=> {
        setState(k+1);
        modal.classList.remove("hide");
    }));
    document.getElementById("prev").addEventListener("click", ()=> {
        setState(state-1);
    });
    document.getElementById("next").addEventListener("click", ()=> {
        setState(state+1);
    });
    
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
    let images = ["./images/shanghai_park_map-.png", "./images/shanghai_park_map.png", "./images/shanghai_park_map+.png"]
    .map((url, i) => {
        let img = new Image();
        img.src = url;
        return img;
    });
    let state = 1;
    let map = document.getElementById("map");
    let changeState = (n) => {
        state += n;
        map.src = images[state].src;
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
//#endregion Functions
async function fetchJSON() {
    let object;
    await fetch("./data/shanghai_park_flats.json")
    .then(res => res.json())
    .then(res => {
        console.log(res);
    })
    .catch(err => console.error(err));
    
    let table = document.getElementById("flats-table");
}

})()