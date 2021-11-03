import SketchP5 from "../modules/sketch_p5.mjs";

class Attractor {
  constructor(p5) {
    this.p5 = p5;
    this.position = p5.createVector(p5.random(p5.width), p5.random(p5.height));
    this.velocity = p5.createVector(0, 0);
    this.acceleration = p5.createVector(0, 0);
    this.direction = p5.createVector(0, 0);
    this.mass = p5.random(100);
    let picked = false;
    let mass;
    while (!picked) {
      mass = p5.constrain(p5.randomGaussian(500, 350), 20, 500);
      const b = p5.random(300);
      if (mass < b) {
        picked = true;
      }
    }
    this.mass = mass;
    this.color = ["#144610", "#DB3069", "#F5D547", "#EBEBD3", "#4C4C4B"][
      Math.floor(Math.random() * 5)
    ];
  }
  attract(walker, G) {
    const force = this.position.copy().sub(walker.position);
    const distance = this.p5.constrain(force.mag(), 25, 1000);
    const strength = (G * this.mass * walker.mass) / (distance * distance);
    force.normalize();
    if (distance <= this.mass / 2 + walker.mass / 2 && !walker.isMouse) {
      force.mult(strength * 3);
      this.acceleration.add(force.copy().div(this.mass));
    } else {
      force.mult(strength);
      this.acceleration.sub(force.copy().div(this.mass));
    }
  }
  draw() {
    this.frictionMag = 0.005 * 1;
    this.friction = this.velocity.copy();
    this.friction.mult(-1);
    this.friction.normalize();
    this.friction.mult(this.frictionMag);
    this.acceleration.add(this.friction.copy().div(this.mass));
    this.velocity.add(this.acceleration);
    this.acceleration.mult(0);
    this.position.add(this.velocity);
    this.p5.fill(this.color);
    this.p5.ellipse(this.position.x, this.position.y, this.mass, this.mass);
  }
}

class AttractorSketch extends SketchP5 {
  setup() {
    SketchP5.prototype.setup.call(this);
    this.attractors = [
      ...Array(Math.round((window.innerWidth + window.innerHeight) / 70)),
    ].map(() => new Attractor(this.p5));
  }
  draw() {
    this.p5.clear();
    this.p5.background(255, 204, 0);
    this.p5.blendMode(this.p5.DIFFERENCE);
    this.p5.noStroke();

    this.attractors.forEach((e) => {
      this.attractors.forEach((f) => {
        if (e !== f) {
          e.attract(f, 0.3);
        }
      });
      const mouse = new this.p5.createVector(this.p5.mouseX, this.p5.mouseY);
      if (mouse.copy().sub(e.position).mag() < e.mass / 2) {
        e.attract(
          {
            isMouse: true,
            position: mouse,
            mass: 100,
          },
          5
        );
      }
    });

    this.attractors.forEach((e) => e.draw());
  }
}

export default AttractorSketch;
