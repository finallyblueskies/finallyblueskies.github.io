import SketchP5 from "../modules/sketch_p5.mjs";

class Oscillation extends SketchP5 {
  setup() {
    SketchP5.prototype.setup.call(this);
    this.angle = this.p5.createVector(0, 0);
    this.velocity = this.p5.createVector(
      this.p5.random(-0.05, 0.05),
      this.p5.random(-0.05, 0.05)
    );
    this.amplitude = this.p5.createVector(
      this.p5.random(this.width / 2),
      this.p5.random(this.height / 2)
    );
  }
  oscillate() {
    this.angle.add(this.velocity);
  }
  draw() {
    this.oscillate();
    const x = this.p5.sin(this.angle.x) * this.amplitude.x;
    const y = this.p5.sin(this.angle.y) * this.amplitude.y;
    console.log(x, y);
    this.p5.clear();
    this.p5.stroke(0);
    this.p5.fill(175);
    this.p5.translate(this.width / 2, this.height / 2);
    this.p5.line(0, 0, x, y);
    this.p5.ellipse(x, y, 20, 20);
  }
}

export default Oscillation;
