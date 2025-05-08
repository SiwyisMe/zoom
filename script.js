["audi", "bmw", "mercedes"].forEach((brand, index) => {
  const checkbox = document.getElementById(`option${index + 1}`);
  checkbox.addEventListener("change", () => {
    const carousel = document.querySelector(`.carousel-${brand}`);
    carousel.style.display = checkbox.checked ? "flex" : "none";
    if (checkbox.checked) setupCarousel(`carousel-${brand}`);
  });
});

function setupCarousel(carouselClass) {
  const carousel = document.querySelector(`.${carouselClass}`);
  if (!carousel) return;

  const focusImage = carousel.querySelector(".image-focus img");
  const zoomSquare = carousel.querySelector(".zoom-square");
  const images = Array.from(carousel.querySelectorAll(".image-nofocus img"));
  const prevButton = carousel.querySelector(".prev-button");
  const nextButton = carousel.querySelector(".next-button");
  const imageFocus = carousel.querySelector(".image-focus");

  let currentIndex = 0;
  let zoomActive = false;

  const updateFocusImage = (index) => {
    [focusImage.src, images[index].src] = [images[index].src, focusImage.src];
    currentIndex = index;
  };

  const toggleZoom = () => (zoomActive = !zoomActive);

  const handleZoom = (e) => {
    if (!zoomActive) return;
    const rect = imageFocus.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    zoomSquare.style.display = "block";
    zoomSquare.style.left = `${x - zoomSquare.offsetWidth / 2}px`;
    zoomSquare.style.top = `${y - zoomSquare.offsetHeight / 2}px`;
    zoomSquare.style.backgroundImage = `url('${focusImage.src}')`;
    zoomSquare.style.backgroundPosition = `${(x / rect.width) * 100}% ${
      (y / rect.height) * 100
    }%`;
  };

  imageFocus.addEventListener("click", toggleZoom);
  imageFocus.addEventListener("mousemove", handleZoom);
  imageFocus.addEventListener(
    "mouseleave",
    () => (zoomSquare.style.display = "none")
  );

  prevButton.addEventListener("click", () =>
    updateFocusImage((currentIndex - 1 + images.length) % images.length)
  );
  nextButton.addEventListener("click", () =>
    updateFocusImage((currentIndex + 1) % images.length)
  );
  images.forEach((thumb, index) =>
    thumb.addEventListener("click", () => updateFocusImage(index))
  );
}
