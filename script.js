//Navbar

function openSidebar(){
    document.getElementById("sidebar").style.left = "0";
    document.getElementById("overlay").style.display = "block";
}

function closeSidebar(){
    document.getElementById("sidebar").style.left = "-100%";
    document.getElementById("overlay").style.display = "none";
}

//slider

document.addEventListener("DOMContentLoaded", () => {

    const slider = document.querySelector(".slider");
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const dotscontainer = document.querySelector(".dots-container");

    let currentSlide = 0;
    const slideCount = slides.length; //3 slides

    slides.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide (index));
        dotscontainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentSlide);
        });
    }
    function goToSlide(index) {
        currentSlide = index;
        slider.style.transform = `translateX(-${currentSlide * 33.333}%)`;
        updateDots();
    }
    function nextSlide(){
        currentSlide = (currentSlide + 1) % slideCount;
        goToSlide(currentSlide);
    }
    function prevSlide(){
        currentSlide = (currentSlide  - 1 + slideCount) % slideCount;
        goToSlide(currentSlide);
    }

    //Event Listeners
    nextBtn.addEventListener("click", nextSlide)
    prevBtn.addEventListener("click", prevSlide)

    //autoslides every 5 second
    setInterval(nextSlide, 5000);

});


//Most Wanted

 function toggleHeart(el){
        el.classList.toggle("active");
        el.textContent = el.classList.contains("active") ? "❤" : "♡";
    }

    //colllection page

    // JS filtering system
const searchInput = document.getElementById("searchInput");
const products = document.querySelectorAll(".product");
const checkboxes = document.querySelectorAll(".filter");

// search
searchInput.addEventListener("keyup", () => {
    filterProducts();
});

// checkbox filter
checkboxes.forEach(box => {
    box.addEventListener("change", () => {
        filterProducts();
    });
});

// logic
function filterProducts(){
    let searchValue = searchInput.value.toLowerCase();
    let activeFilters = [...checkboxes]
        .filter(cb => cb.checked)
        .map(cb => cb.value);

    products.forEach(product => {
        let name = product.dataset.name.toLowerCase();
        let tags = product.dataset.tags.toLowerCase();

        let matchesSearch = name.includes(searchValue);
        let matchesFilter = activeFilters.length === 0 || activeFilters.some(f => tags.includes(f));

        product.style.display = (matchesSearch && matchesFilter) ? "block" : "none";
    });
}