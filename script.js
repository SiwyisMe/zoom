const data = {
  audi: [
    "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg",
    "https://images.pexels.com/photos/21014/pexels-photo.jpg",
    "https://images.pexels.com/photos/45170/kittens-cat-cat-puppy-rush-45170.jpeg",
    "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg",
    "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg",
  ],
  bmw: [
    "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
    "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
    "https://images.pexels.com/photos/91224/pexels-photo-91224.jpeg",
    "https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg",
    "https://images.pexels.com/photos/134392/pexels-photo-134392.jpeg",
  ],
  porsche: [
    "https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg",
    "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg",
    "https://images.pexels.com/photos/248280/pexels-photo-248280.jpeg",
    "https://images.pexels.com/photos/139829/pexels-photo-139829.jpeg",
    "https://images.pexels.com/photos/34950/pexels-photo.jpg",
  ],
};

document.querySelectorAll("section").forEach((section) => {
  const mark = section.id;
  const imgs = data[mark];
  let idx = 0,
    rot = 0;
  const focus = section.querySelector(".focus img");
  const mini = section.querySelector(".mini");
  const zoom = section.querySelector(".zoom");
  let zoomActive = false;

  function show(i) {
    idx = (i + imgs.length) % imgs.length;
    focus.src = imgs[idx];
    rot = 0;
    focus.style.transform = "";
    updateMini();
  }

  function updateMini() {
    mini.innerHTML = "";
    let start = Math.max(0, Math.min(idx, imgs.length - 3));
    for (let i = start; i < start + 3 && i < imgs.length; i++) {
      const im = document.createElement("img");
      im.src = imgs[i];
      if (i === idx) im.classList.add("active");
      im.onclick = () => show(i);
      mini.appendChild(im);
    }
  }

  section.querySelector(".prev").onclick = () => show(idx - 1);
  section.querySelector(".next").onclick = () => show(idx + 1);
  section.querySelector(".rotl").onclick = () => {
    rot -= 90;
    focus.style.transform = `rotate(${rot}deg)`;
  };
  section.querySelector(".rotr").onclick = () => {
    rot += 90;
    focus.style.transform = `rotate(${rot}deg)`;
  };

  const handleZoom = (e) => {
    if (!zoomActive) return;
    const rect = focus.parentElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    zoom.style.display = "block";
    zoom.style.left = `${x - 30}px`;
    zoom.style.top = `${y - 30}px`;
    zoom.style.backgroundImage = `url('${focus.src}')`;
    zoom.style.backgroundPosition = `${(x / rect.width) * 100}% ${
      (y / rect.height) * 100
    }%`;
  };

  focus.onmouseover = () => {
    zoomActive = !zoomActive;
    if (!zoomActive) zoom.style.display = "none";
  };
  focus.parentElement.onmousemove = handleZoom;
  focus.parentElement.onmouseleave = () => {
    zoom.style.display = "none";
  };

  show(0);
});
