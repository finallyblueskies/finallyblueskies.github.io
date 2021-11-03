import SketchP5 from "../modules/sketch_p5.mjs";

class SpiralSketch extends SketchP5 {
  setup() {
    SketchP5.prototype.setup.call(this);
    this.r = 1;
    this.theta = 0;

    this.rChange = 0.1;
    this.tChange = 0.1;

    this.p5.frameRate(120);

    this.rInput = this.p5.createSlider(0.1, 10, this.rChange, 0.1);
    this.thetaInput = this.p5.createSlider(0.1, 10, this.tChange, 0.1);

    this.reset = this.p5.createButton("Reset");

    this.rInput.position(10, this.height - 30);
    this.thetaInput.position(10, this.height - 60);
    this.reset.position(10, this.height - 90);

    this.rInput.input((e) => this.updateR(e));
    this.thetaInput.input((e) => this.updateTheta(e));

    this.rInput.elt.addEventListener("click", (e) => e.stopPropagation());
    this.thetaInput.elt.addEventListener("click", (e) => e.stopPropagation());
    this.reset.elt.addEventListener("click", (e) => {
      e.stopPropagation();
      this.p5.clear();
      this.r = 1;
      this.theta = 0;
			this.setCoords();
    });
  }
  updateR(e) {
    this.rChange = parseFloat(e.target.value);
  }
  updateTheta(e) {
    this.tChange = parseFloat(e.target.value);
  }
  setCoords() {
    this.x = this.r * this.p5.cos(this.theta);
    this.y = this.r * this.p5.sin(this.theta);
  }
  draw() {
		this.setCoords();
    this.p5.noStroke();
    this.p5.fill(0);
    this.p5.ellipse(this.x + this.width / 2, this.y + this.height / 2, 5, 5);
    this.theta += this.tChange;
    this.r += this.rChange;
    this.p5.fill(255);
    this.p5.rect(10, this.height - 130, 250, 30);
    this.p5.fill(0);
    this.p5.text(
      `Distance change: ${this.rChange}, Theta change: ${this.tChange}`,
      20,
      this.height - 110
    );
  }
}

export default SpiralSketch;
