
document.addEventListener("DOMContentLoaded", function () {

    const gallery = document.getElementById("gallery");
    const imageFolder = "./Images/";

    const images = [
        "image1.jpg",
        "image2.jpg",
        "image3.png",
        "image4.png",
        "image5.png",
        "image6.jpg",
        "image7.jpg",
        // Add the names of your images here
    ];

    images.forEach(image => {
        const img = document.createElement("img");
        img.src = imageFolder + image;
        img.alt = image;
        img.addEventListener("click", () => openFullscreen(imageFolder + image));
        gallery.appendChild(img);
    });
});

function openFullscreen(src) {
    const fullscreenDiv = document.createElement("div");
    fullscreenDiv.classList.add("fullscreen");

    const img = document.createElement("img");
    img.src = src;
    img.alt = "Fullscreen Image";

    fullscreenDiv.appendChild(img);
    document.body.appendChild(fullscreenDiv);

    fullscreenDiv.addEventListener("click", () => {
        document.body.removeChild(fullscreenDiv);
    });
}
