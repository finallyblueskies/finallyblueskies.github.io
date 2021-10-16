import AttractorSketch from "./sketches/attractor.mjs";
import SnakeSketch from "./sketches/snake.mjs";

const sketchContainer = document.querySelector(".container.sketch");
const sketches = [SnakeSketch, AttractorSketch];
let currSketch;


const getRandomSketchIndex = () => Math.floor(Math.random() * sketches.length);
const initNewSketch = () => {
	const newSketch = sketches[getRandomSketchIndex()];
	if (currSketch instanceof newSketch) {
		initNewSketch();
		return;
	} else {
		currSketch = new newSketch(sketchContainer)
	}
};

sketchContainer.addEventListener("click", () => {
  currSketch.destroy();
  initNewSketch();
});

initNewSketch();
