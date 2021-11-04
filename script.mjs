import AttractorSketch from "./sketches/attractor.mjs";
import SnakeSketch from "./sketches/snake.mjs";
import SpiralSketch from "./sketches/spiral.mjs";

const sketchContainer = document.querySelector(".container.sketch");
const sketches = [SnakeSketch, AttractorSketch, SpiralSketch];
let currSketch;

const newSketchIndex = () => {
  if (!currSketch) {
    return Math.floor(Math.random() * sketches.length);
  } else {
    const currIndex = sketches.indexOf(currSketch.constructor);
    return currIndex === sketches.length - 1 ? 0 : currIndex + 1;
  }
};

const initNewSketch = () => {
  const newSketch = sketches[newSketchIndex()];
  currSketch = new newSketch(sketchContainer);
};

sketchContainer.addEventListener("click", () => {
  currSketch.destroy();
  initNewSketch();
});

initNewSketch();
