const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const fillscreenBtn = document.getElementById("fillscreen-btn");
const textfillBtn = document.getElementById("textfill-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const fileInput = document.getElementById("file");
const textinput = document.getElementById("text");
const saveBtn = document.getElementById("save");

const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

let isPainting = false;
let isFilling = false;
let isDrawFilling = false;
let previousMode = "draw";

const drawBtn = document.getElementById("draw-btn");
const fillBtn = document.getElementById("fill-btn");

const thicknessValue = document.getElementById("thickness-value");

const UNSPLASH_API_KEY = "pkiLsYAdsUgqArRrVVnGcNj9A0nOJsDtjHQTcZONXp8";
const backgroundBtn = document.getElementById("background-btn");

let currentPage = 1;
let currentSearchQuery = '';
const imagesPerPage = 12;

const modal = document.getElementById("image-search-modal");
const closeBtn = document.querySelector(".close");
const searchInput = document.getElementById("image-search");
const searchBtn = document.getElementById("search-btn");
const imagesGrid = document.querySelector(".images-grid");
const loadMoreBtn = document.getElementById("load-more");

async function searchImages(query, page = 1) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=${imagesPerPage}`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
        },
      }
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}

function displayImages(images) {
  images.forEach(image => {
    const imageItem = document.createElement("div");
    imageItem.className = "image-item";

    const img = document.createElement("img");
    img.src = image.urls.small;
    img.alt = image.alt_description || "Unsplash Image";

    imageItem.appendChild(img);
    imagesGrid.appendChild(imageItem);

    imageItem.addEventListener("click", () => {
      setBackgroundImage(image.urls.regular);
      modal.style.display = "none";
    });
  });
}

async function setBackgroundImage(imageUrl) {
  const image = new Image();
  image.crossOrigin = "anonymous";
  image.src = imageUrl;

  image.onload = function () {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  };
}

function onMove(event) {
  if (isPainting && !isDrawFilling) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  if (isPainting && isDrawFilling) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.fill();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
  isPainting = true;
}

function cancelPainting() {
  isPainting = false;
  ctx.beginPath();
}

function onLineWidthChange(event) {
  const newWidth = event.target.value;
  ctx.lineWidth = newWidth;
  thicknessValue.innerText = Number(newWidth).toFixed(1);
}

function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
  setDrawMode(previousMode);
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
  setDrawMode(previousMode);
}

function setDrawMode(mode) {
  if (mode === "draw") {
    isDrawFilling = false;
    isFilling = false;
    drawBtn.classList.add("active");
    fillBtn.classList.remove("active");
    fillscreenBtn.classList.remove("active");
  } else if (mode === "fill") {
    isDrawFilling = true;
    isFilling = false;
    drawBtn.classList.remove("active");
    fillBtn.classList.add("active");
    fillscreenBtn.classList.remove("active");
  }
  previousMode = mode;
}

function onDrawClick() {
  setDrawMode("draw");
  ctx.strokeStyle = color.value;
  ctx.fillStyle = color.value;
}

function onFillClick() {
  setDrawMode("fill");
}

function onFillScreenClick() {
  isFilling = !isFilling;
  fillscreenBtn.classList.toggle("active");

  if (!isFilling) {
    setDrawMode(previousMode);
  } else {
    drawBtn.classList.remove("active");
    fillBtn.classList.remove("active");
  }
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    isFilling = false;
    fillscreenBtn.classList.remove("active");
    setDrawMode(previousMode);
  }
}

function onTextAdd() {
  const text = textinput.value;
  if (text === "") return;

  const x = CANVAS_WIDTH / 2;
  const y = CANVAS_HEIGHT / 2;

  ctx.save();
  ctx.lineWidth = 1;
  ctx.font = "100px serif";
  ctx.textAlign = "center";
  ctx.fillText(text, x, y);
  ctx.restore();
  textinput.value = "";
}

function onDestroyClick() {
  const currentColor = color.value;

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.strokeStyle = currentColor;
  ctx.fillStyle = currentColor;

  setDrawMode(previousMode);
}

function onEraserClick() {
  ctx.strokeStyle = "white";
  isDrawFilling = false;
  isFilling = false;
}

function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
}

function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

drawBtn.addEventListener("click", onDrawClick);
fillBtn.addEventListener("click", onFillClick);
fillscreenBtn.addEventListener("click", onFillScreenClick);
textfillBtn.addEventListener("click", onTextAdd);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);
backgroundBtn.addEventListener("click", () => {
  modal.style.display = "block";
  imagesGrid.innerHTML = "";
  currentPage = 1;
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

searchBtn.addEventListener("click", async () => {
  currentSearchQuery = searchInput.value;
  imagesGrid.innerHTML = "";
  currentPage = 1;
  const images = await searchImages(currentSearchQuery);
  displayImages(images);
});

loadMoreBtn.addEventListener("click", async () => {
  currentPage++;
  const images = await searchImages(currentSearchQuery, currentPage);
  displayImages(images);
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

searchInput.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    currentSearchQuery = searchInput.value;
    imagesGrid.innerHTML = "";
    currentPage = 1;
    const images = await searchImages(currentSearchQuery);
    displayImages(images);
  }
});
