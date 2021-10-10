import Sketch from "./sketch.mjs";
import "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js";

class SketchP5 extends Sketch {
  constructor(el) {
    super(el);
    this.container = document.createElement("div");
    this.container.style.position = "absolute";
    this.container.style.top = 0;
    this.container.style.left = 0;
    this.container.style.width = "100%";
    this.container.style.height = "100%";
    this.el.append(this.container);
    this.mousePressed = false;
  }
  init(instance) {
    instance.setup = () => this.setup(instance);
    instance.draw = () => this.draw(instance);
    instance.mousePressed = () => this.onMousePressed(instance);
    instance.mouseDragged = () => this.onMouseDragged(instance);
    instance.mouseReleased = () => this.onMouseReleased(instance);
  }
  setup(p5) {
    p5.resizeCanvas(this.width, this.height);
    console.debug("P5 sketch setup", p5);
  }
  draw() {}
  onMousePressed() {
    this.mousePressed = true;
  }
  onMouseDragged() {}
  onMouseReleased() {
    this.mousePressed = false;
  }
  onResize(width, height) {
    // init in first resize
    if (!this.p5) {
      this.width = width;
      this.height = height;
      this.p5 = new p5(this.init.bind(this), this.container);
    } else {
      this.p5.resizeCanvas(width, height);
    }
  }
}

export default SketchP5;
