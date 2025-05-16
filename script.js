var MenuItems = document.getElementById("MenuItems");
MenuItems.style.maxHeight = "0px";
function menutoggle() {
    if (MenuItems.style.maxHeight == "0px") {
        MenuItems.style.maxHeight = "200px";
    } else {
        MenuItems.style.maxHeight = "0px";
    }
}

var ProductImg = document.getElementById("ProductImg");
var SmallImg = document.getElementsByClassName("small-img");
SmallImg[0].onclick = function () {
ProductImg.src = SmallImg[0].src;
};
SmallImg[1].onclick = function () {
ProductImg.src = SmallImg[1].src;
};
SmallImg[2].onclick = function () {
ProductImg.src = SmallImg[2].src;
};
SmallImg[3].onclick = function () {
ProductImg.src = SmallImg[3].src;
};

const menuIcon = document.querySelector(".menu-icon");
const navLinks = document.querySelector(".nav-links");
menuIcon.addEventListener("click", () => {
    navLinks.style.display =
        navLinks.style.display === "flex" ? "none" : "flex";
});
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        navLinks.style.display = "flex";
    } else {
        navLinks.style.display = "none";
    }
});

var LoginForm = document.getElementById("LoginForm");
var RegForm = document.getElementById("RegForm");
var Indicator = document.getElementById("Indicator");
function register() {
    RegForm.style.transform = "translatex(0px)";
    LoginForm.style.transform = "translatex(0px)";
    Indicator.style.transform = "translateX(100px)";
}
function login() {
    RegForm.style.transform = "translatex(300px)";
    LoginForm.style.transform = "translatex(300px)";
    Indicator.style.transform = "translate(0px)";
}