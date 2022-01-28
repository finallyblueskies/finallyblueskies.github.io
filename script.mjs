import AttractorSketch from "./sketches/attractor.mjs";
import SnakeSketch from "./sketches/snake.mjs";
import SpiralSketch from "./sketches/spiral.mjs";
import ProjectYearaheadSketch from "./sketches/yearahead.mjs";

// import OscillationSketch from "./sketches/oscillation.mjs";

const sketchContainer = document.querySelector(".sketch-container");
const sketches = [
  {
    class: ProjectYearaheadSketch,
    metadata: {
      title: "YearAhead",
      tags: ["React", "NextJS", "Firebase", "Mobx State Tree"],
    },
  },
  {
    class: SnakeSketch,
    metadata: {
      title: "Snake",
      tags: ["P5.js", "Sketch", "Minigame"],
    },
  },
  {
    class: AttractorSketch,
    metadata: {
      title: "Attractor",
      tags: ["P5.js", "Sketch"],
    },
  },
  {
    class: SpiralSketch,
    metadata: {
      title: "Spiral",
      tags: ["P5.js", "Sketch"],
    },
  },
];
let currSketch;
const getIndex = () => {
  return sketches.findIndex((s) => s.class === currSketch.constructor);
};

const navigateTo = (index) => {
  if (currSketch) {
    currSketch.destroy();
  }

  if (index > sketches.length - 1) {
    index = 0;
  } else if (index < 0) {
    index = sketches.length - 1;
  }

  const newRef = sketches[index];
  currSketch = new newRef.class(sketchContainer);

  document.querySelector(".current-sketch-tags").innerHTML = "";
  newRef.metadata.tags.forEach((tag) => {
    const tagEl = document.createElement("span");
    tagEl.classList.add("tag");
    tagEl.innerText = tag;
    document.querySelector(".tags").appendChild(tagEl);
  });

  document.querySelector(".current-sketch-title").innerText =
    newRef.metadata.title;
};

sketchContainer.addEventListener("click", () => {
  navigateTo(getIndex() + 1);
});

document.querySelector(".next-sketch").addEventListener("click", () => {
  navigateTo(getIndex() + 1);
});

document.querySelector(".prev-sketch").addEventListener("click", () => {
  navigateTo(getIndex() - 1);
});

navigateTo(0);
