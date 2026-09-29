// Your code here.
const items = document.querySelector(".items");
const cubes = document.querySelectorAll(".item");

let isDown = false;
let currentCube = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach((cube) => {

  cube.addEventListener("mousedown", (e) => {
    isDown = true;
    currentCube = cube;

    items.classList.add("active");

    const cubeRect = cube.getBoundingClientRect();

    // Remember where inside the cube we clicked
    offsetX = e.clientX - cubeRect.left;
    offsetY = e.clientY - cubeRect.top;

    // Make the cube position controllable
    cube.style.position = "absolute";

    // Prevent text selection while dragging
    e.preventDefault();
  });

  cube.addEventListener("mousemove", (e) => {
    if (!isDown || currentCube !== cube) return;

    const containerRect = items.getBoundingClientRect();
    const cubeRect = cube.getBoundingClientRect();

    let left = e.clientX - containerRect.left - offsetX;
    let top = e.clientY - containerRect.top - offsetY;

    // Keep cube inside the container
    const maxLeft = containerRect.width - cubeRect.width;
    const maxTop = containerRect.height - cubeRect.height;

    left = Math.max(0, Math.min(left, maxLeft));
    top = Math.max(0, Math.min(top, maxTop));

    cube.style.left = `${left}px`;
    cube.style.top = `${top}px`;
  });

  cube.addEventListener("mouseup", () => {
    isDown = false;
    currentCube = null;

    items.classList.remove("active");
  });
});

// If mouse is released outside the cube
document.addEventListener("mouseup", () => {
  isDown = false;
  currentCube = null;

  items.classList.remove("active");
});