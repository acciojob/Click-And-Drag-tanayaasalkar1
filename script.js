const container = document.querySelector(".items");
const cubes = document.querySelectorAll(".item");

let selectedCube = null;
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

// Arrange cubes in a grid
function createGrid() {
  const gap = 20;
  const columns = 5;

  cubes.forEach((cube, index) => {
    cube.style.position = "absolute";
    cube.style.transform = "none";
    cube.style.width = "100px";
    cube.style.height = "100px";

    const row = Math.floor(index / columns);
    const column = index % columns;

    cube.style.left = `${column * (100 + gap) + 20}px`;
    cube.style.top = `${row * (100 + gap) + 20}px`;
  });
}

createGrid();

cubes.forEach((cube) => {

  cube.addEventListener("mousedown", (e) => {
    isDragging = true;
    selectedCube = cube;

    const cubeRect = cube.getBoundingClientRect();

    // Where exactly did we click inside the cube?
    offsetX = e.clientX - cubeRect.left;
    offsetY = e.clientY - cubeRect.top;

    cube.style.zIndex = "1000";

    e.preventDefault();
  });

  cube.addEventListener("mousemove", (e) => {
    if (!isDragging || selectedCube !== cube) return;

    const containerRect = container.getBoundingClientRect();
    const cubeRect = cube.getBoundingClientRect();

    // Mouse position relative to container
    let left =
      e.clientX - containerRect.left - offsetX;

    let top =
      e.clientY - containerRect.top - offsetY;

    // Account for container padding
    const minLeft = container.clientLeft;
    const minTop = container.clientTop;

    const maxLeft =
      container.clientWidth - cube.offsetWidth;

    const maxTop =
      container.clientHeight - cube.offsetHeight;

    // Keep cube completely inside
    left = Math.max(minLeft, Math.min(left, maxLeft));
    top = Math.max(minTop, Math.min(top, maxTop));

    cube.style.left = `${left}px`;
    cube.style.top = `${top}px`;
  });
});

document.addEventListener("mouseup", () => {
  if (selectedCube) {
    selectedCube.style.zIndex = "";
  }

  isDragging = false;
  selectedCube = null;
});