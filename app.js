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

const drawBtn = document.getElementById("draw-btn");
const fillBtn = document.getElementById("fill-btn");

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
  ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}

function onDrawClick() {
  isDrawFilling = false;
  isFilling = false;
  drawBtn.classList.add("active");
  fillBtn.classList.remove("active");
}

function onFillClick() {
  isDrawFilling = true;
  isFilling = false;
  drawBtn.classList.remove("active");
  fillBtn.classList.add("active");
}

function onFillScreenClick() {
  isFilling = true;
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
  isFilling = false;
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
  ctx.strokeStyle = ctx.fillStyle;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = ctx.strokeStyle;
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
