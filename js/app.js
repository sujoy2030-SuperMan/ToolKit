// Theme Toggle

const themeBtn =
document.getElementById("themeBtn");

const savedTheme =
localStorage.getItem("theme");

if(savedTheme === "light"){
document.body.classList.add("light");
if(themeBtn){
themeBtn.textContent = "☀️";
}
}

if(themeBtn){

themeBtn.addEventListener("click",()=>{

document.body.classList.toggle("light");

if(document.body.classList.contains("light")){

localStorage.setItem(
"theme",
"light"
);

themeBtn.textContent = "☀️";

}else{

localStorage.setItem(
"theme",
"dark"
);

themeBtn.textContent = "🌙";

}

});

}

// Smooth Scroll

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor=>{

anchor.addEventListener(
"click",
function(e){

e.preventDefault();

const target =
document.querySelector(
this.getAttribute("href")
);

if(target){

target.scrollIntoView({
behavior:"smooth"
});

}

});

});

// Future Ready Tool Loader

function showToast(message){

const toast =
document.createElement("div");

toast.innerText = message;

toast.style.position = "fixed";
toast.style.bottom = "20px";
toast.style.right = "20px";
toast.style.padding = "12px 18px";
toast.style.borderRadius = "12px";
toast.style.background = "#2563eb";
toast.style.color = "#fff";
toast.style.zIndex = "9999";

document.body.appendChild(toast);

setTimeout(()=>{
toast.remove();
},2500);

}

// Example

console.log(
"Image Tools Studio Loaded"
);
