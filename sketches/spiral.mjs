import SketchP5 from "../modules/sketch_p5.mjs";

class SpiralSketch extends SketchP5 {
  setup() {
    SketchP5.prototype.setup.call(this);

    this.rChange = .3;
    this.tChange = 1.501;

    this.generateSpiral();
  }
  updateR(e) {
    this.rChange = parseFloat(e.target.value);
    this.generateSpiral();
  }
  updateTheta(e) {
    this.tChange = parseFloat(e.target.value);
    this.generateSpiral();
  }
  onResize(width, height) {
    //call resize on the parent class
    SketchP5.prototype.onResize.call(this, width, height);
    this.generateSpiral();
  }
  generateSpiral() {
    let points = [];
    let r = 1;
    let t = 0.5;
    for (let i = 0; i < 2000; i++) {
      const x = r * this.p5.cos(t);
      const y = r * this.p5.sin(t);
      points.push({ x, y });
      r += this.rChange;
      t += this.tChange;
    }
    this.points = points;
  }
  draw() {
    this.p5.noStroke();
    this.p5.clear();
    this.p5.fill(0);

    this.points.forEach((point) => {
      this.p5.ellipse(
        this.width / 2 + point.x,
        this.height / 2 + point.y,
        5,
        5
      );
    });

		// change rChange and tChange by a random number between -1 and 1
		this.rChange += .00001;
		this.tChange += .000001;
		this.generateSpiral();
  }
}

export default SpiralSketch;
