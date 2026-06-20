const fileInput =
document.getElementById("fileInput");

const quality =
document.getElementById("quality");

const qualityValue =
document.getElementById("qualityValue");

const compressBtn =
document.getElementById("compressBtn");

const beforeSize =
document.getElementById("beforeSize");

const afterSize =
document.getElementById("afterSize");

const downloadBtn =
document.getElementById("downloadBtn");

let selectedFile = null;

quality.addEventListener("input",()=>{

qualityValue.textContent =
quality.value + "%";

});

fileInput.addEventListener("change",(e)=>{

selectedFile =
e.target.files[0];

if(!selectedFile) return;

beforeSize.textContent =
"Original Size: " +
(selectedFile.size / 1024).toFixed(2)

+ " KB";

});

compressBtn.addEventListener("click",()=>{

if(!selectedFile){

alert("Please select an image.");

return;

}

const reader =
new FileReader();

reader.onload = function(event){

const img =
new Image();

img.onload = function(){

const canvas =
document.createElement("canvas");

const ctx =
canvas.getContext("2d");

canvas.width =
img.width;

canvas.height =
img.height;

ctx.drawImage(
img,
0,
0
);

canvas.toBlob(

(blob)=>{

const url =
URL.createObjectURL(
blob
);

afterSize.textContent =
"Compressed Size: " +
(blob.size / 1024)
.toFixed(2)

+ " KB";

downloadBtn.href =
url;

downloadBtn.download =
"compressed-image.jpg";

downloadBtn.style.display =
"inline-block";

},

"image/jpeg",

quality.value / 100

);

};

img.src =
event.target.result;

};

reader.readAsDataURL(
selectedFile
);

});
