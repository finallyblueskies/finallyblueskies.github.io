import Sketch from "./sketch.mjs";
import "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js";

class SketchP5 extends Sketch {
  constructor(el) {
    super(el);

    // Create sketch container
    this.container = document.createElement("div");
    this.container.style.position = "absolute";
    this.container.style.top = 0;
    this.container.style.left = 0;
    this.container.style.width = "100%";
    this.container.style.height = "100%";

    // Insert sketch container
    this.el.append(this.container);

    this.mousePressed = false;
  }
  init(instance) {
    this.p5 = instance;
    instance.setup = () => this.setup();
    instance.draw = () => this.draw();
    instance.mousePressed = () => this.onMousePressed();
    instance.mouseDragged = () => this.onMouseDragged();
    instance.mouseReleased = () => this.onMouseReleased();
  }
  setup() {
    this.p5.resizeCanvas(this.width, this.height);
    console.debug("P5 sketch setup", this.p5);
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
      
      // eslint-disable-next-line
      new p5((p5) => this.init(p5), this.container);
    } else {
      this.p5.resizeCanvas(width, height);
    }
  }
  destroy() {
    Sketch.prototype.destroy.call(this);
    this.p5.remove();
    this.container.remove();
  }
}

export default SketchP5;
