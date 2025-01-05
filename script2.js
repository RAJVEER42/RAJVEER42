let filterA = document.getElementById("blur");
let filterB = document.getElementById("contrast");
let filterC = document.getElementById("hue-rotate");
let filterD = document.getElementById("sepia");

let noFlipBtn = document.getElementById("no-flip");
let flipXBtn = document.getElementById("flip-x");
let flipYBtn = document.getElementById("flip-y");

let uploadButton = document.getElementById("upload-button");
let image = document.getElementById("chosen-image");


function resetFilter(){
    filterA.value = "0";
    filterB.value = "100";
    filterC.value = "0";
    filterD.value = "0";
    noFlipBtn.checked = true;
    addFilter();
    flipImage();
}

uploadButton.onchange = () => {
    resetFilter();
    document.querySelector(".image-container").style.display = "block";
    let reader = new FileReader();
    reader.readAsDataURL(uploadButton.files[0]);
    reader.onload = () => {
        image.setAttribute("src", reader.result);
    }
}

let sliders = document.querySelectorAll(".filter input[type='range']");
sliders.forEach( slider => {
    slider.addEventListener("input", addFilter);
});

function addFilter(){
    image.style.filter = `blur(${filterA.value}px) contrast(${filterB.value}%) hue-rotate(${filterC.value}deg) sepia(${filterD.value}%)`;
}

let radioBtns = document.querySelectorAll(".flip-option input[type='radio']");
radioBtns.forEach( radioBtn => {
    radioBtn.addEventListener("click", flipImage);
});

function flipImage(){
    if(flipXBtn.checked){
        image.style.transform = "scaleX(-1)";
    }
    else if(flipYBtn.checked){
        image.style.transform = "scaleY(-1)";
    }
    else{
        image.style.transform = "scale(1,1)";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const chosenImage = document.getElementById('chosen-image');
    const uploadButton = document.getElementById('upload-button');
    const downloadButton = document.getElementById('download-button');

    uploadButton.addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            chosenImage.src = e.target.result;
            downloadButton.style.display = 'inline-block'; 
        };

        reader.readAsDataURL(file);
    });

    const filters = ['blur', 'contrast', 'hue-rotate', 'sepia'];
    filters.forEach(filter => {
        const filterElement = document.getElementById(filter);
        filterElement.addEventListener('input', function() {
            applyFilters();
        });
    });

    const flipOptions = document.querySelectorAll('input[name="flip"]');
    flipOptions.forEach(option => {
        option.addEventListener('change', function() {
            applyFlip();
        });
    });

    function applyFilters() {
        let filterString = '';

        filters.forEach(filter => {
            const value = document.getElementById(filter).value;
            filterString += `${filter}(${value}) `;
        });

        chosenImage.style.filter = filterString.trim();
    }

    function applyFlip() {
        const flipX = document.getElementById('flip-x').checked;
        const flipY = document.getElementById('flip-y').checked;

        if (flipX) {
            chosenImage.style.transform = 'scaleX(-1)';
        } else if (flipY) {
            chosenImage.style.transform = 'scaleY(-1)';
        } else {
            chosenImage.style.transform = 'none';
        }
    }

    downloadButton.addEventListener('click', function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = chosenImage.naturalWidth;
        canvas.height = chosenImage.naturalHeight;

        ctx.filter = chosenImage.style.filter;
        ctx.transform(chosenImage.style.transform);
        ctx.drawImage(chosenImage, 0, 0);

        const dataURL = canvas.toDataURL();

        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'edited-image.png';
        link.click();
    });
});
